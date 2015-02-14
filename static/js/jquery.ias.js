/**
 * IASCallbacks
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASCallbacks = function () {
  this.list = [];
  this.fireStack = [];
  this.isFiring = false;
  this.isDisabled = false;

  /**
   * Calls all added callbacks
   *
   * @private
   * @param args
   */
  this.fire = function (args) {
    var context = args[0],
        deferred = args[1],
        callbackArguments = args[2];

    this.isFiring = true;

    for (var i = 0, l = this.list.length; i < l; i++) {
      if (this.list[i] != undefined) {
        if (false === this.list[i].fn.apply(context, callbackArguments)) {
          deferred.reject();

          break;
        }
      }
    }

    this.isFiring = false;

    deferred.resolve();

    if (this.fireStack.length) {
      this.fire(this.fireStack.shift());
    }
  };

  /**
   * Returns index of the callback in the list in a similar way as
   * the indexOf function.
   *
   * @param callback
   * @param {number} index index to start the search from
   * @returns {number}
   */
  this.inList = function (callback, index) {
    index = index || 0;

    for (var i = index, length = this.list.length; i < length; i++) {
      if (this.list[i].fn === callback || (callback.guid && this.list[i].fn.guid && callback.guid === this.list[i].fn.guid)) {
        return i;
      }
    }

    return -1;
  };

  return this;
};

IASCallbacks.prototype = {
  /**
   * Adds a callback
   *
   * @param callback
   * @returns {IASCallbacks}
   * @param priority
   */
  add: function (callback, priority) {
    var callbackObject = {fn: callback, priority: priority};

    priority = priority || 0;

    for (var i = 0, length = this.list.length; i < length; i++) {
      if (priority > this.list[i].priority) {
        this.list.splice(i, 0, callbackObject);

        return this;
      }
    }

    this.list.push(callbackObject);

    return this;
  },

  /**
   * Removes a callback
   *
   * @param callback
   * @returns {IASCallbacks}
   */
  remove: function (callback) {
    var index = 0;

    while (( index = this.inList(callback, index) ) > -1) {
      this.list.splice(index, 1);
    }

    return this;
  },

  /**
   * Checks if callback is added
   *
   * @param callback
   * @returns {*}
   */
  has: function (callback) {
    return (this.inList(callback) > -1);
  },


  /**
   * Calls callbacks with a context
   *
   * @param context
   * @param args
   * @returns {object|void}
   */
  fireWith: function (context, args) {
    var deferred = jQuery.Deferred();

    if (this.isDisabled) {
      return deferred.reject();
    }

    args = args || [];
    args = [ context, deferred, args.slice ? args.slice() : args ];

    if (this.isFiring) {
      this.fireStack.push(args);
    } else {
      this.fire(args);
    }

    return deferred;
  },

  /**
   * Disable firing of new events
   */
  disable: function () {
    this.isDisabled = true;
  },

  /**
   * Enable firing of new events
   */
  enable: function () {
    this.isDisabled = false;
  }
};

/**
 * Infinite Ajax Scroll v2.1.3
 * A jQuery plugin for infinite scrolling
 * http://infiniteajaxscroll.com
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://infiniteajaxscroll.com/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

(function($) {

  'use strict';

  var UNDETERMINED_SCROLLOFFSET = -1;

  var IAS = function($element, options) {
    this.itemsContainerSelector = options.container;
    this.itemSelector = options.item;
    this.nextSelector = options.next;
    this.paginationSelector = options.pagination;
    this.$scrollContainer = $element;
    this.$container = (window === $element.get(0) ? $(document) : $element);
    this.defaultDelay = options.delay;
    this.negativeMargin = options.negativeMargin;
    this.nextUrl = null;
    this.isBound = false;
    this.isPaused = false;
    this.listeners = {
      next:     new IASCallbacks(),
      load:     new IASCallbacks(),
      loaded:   new IASCallbacks(),
      render:   new IASCallbacks(),
      rendered: new IASCallbacks(),
      scroll:   new IASCallbacks(),
      noneLeft: new IASCallbacks(),
      ready:    new IASCallbacks()
    };
    this.extensions = [];

    /**
     * Scroll event handler
     *
     * Note: calls to this functions should be throttled
     *
     * @private
     */
    this.scrollHandler = function() {
      // the throttle method can call the scrollHandler even thought we have called unbind()
      if (!this.isBound || this.isPaused) {
        return;
      }

      var currentScrollOffset = this.getCurrentScrollOffset(this.$scrollContainer),
          scrollThreshold = this.getScrollThreshold()
      ;

      // invalid scrollThreshold. The DOM might not have loaded yet...
      if (UNDETERMINED_SCROLLOFFSET == scrollThreshold) {
        return;
      }

      this.fire('scroll', [currentScrollOffset, scrollThreshold]);

      if (currentScrollOffset >= scrollThreshold) {
        this.next();
      }
    };

    /**
     * Returns the items container currently in the DOM
     *
     * @private
     * @returns {object}
     */
    this.getItemsContainer = function() {
      return $(this.itemsContainerSelector);
    };

    /**
     * Returns the last item currently in the DOM
     *
     * @private
     * @returns {object}
     */
    this.getLastItem = function() {
      return $(this.itemSelector, this.getItemsContainer().get(0)).last();
    };

    /**
     * Returns the first item currently in the DOM
     *
     * @private
     * @returns {object}
     */
    this.getFirstItem = function() {
      return $(this.itemSelector, this.getItemsContainer().get(0)).first();
    };

    /**
     * Returns scroll threshold. This threshold marks the line from where
     * IAS should start loading the next page.
     *
     * @private
     * @param negativeMargin defaults to {this.negativeMargin}
     * @return {number}
     */
    this.getScrollThreshold = function(negativeMargin) {
      var $lastElement;

      negativeMargin = negativeMargin || this.negativeMargin;
      negativeMargin = (negativeMargin >= 0 ? negativeMargin * -1 : negativeMargin);

      $lastElement = this.getLastItem();

      // if the don't have a last element, the DOM might not have been loaded,
      // or the selector is invalid
      if (0 === $lastElement.length) {
        return UNDETERMINED_SCROLLOFFSET;
      }

      return ($lastElement.offset().top + $lastElement.height() + negativeMargin);
    };

    /**
     * Returns current scroll offset for the given scroll container
     *
     * @private
     * @param $container
     * @returns {number}
     */
    this.getCurrentScrollOffset = function($container) {
      var scrollTop = 0,
          containerHeight = $container.height();

      if (window === $container.get(0))  {
        scrollTop = $container.scrollTop();
      } else {
        scrollTop = $container.offset().top;
      }

      // compensate for iPhone
      if (navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1) {
        containerHeight += 80;
      }

      return (scrollTop + containerHeight);
    };

    /**
     * Returns the url for the next page
     *
     * @private
     */
    this.getNextUrl = function(container) {
      container = container || this.$container;

      // always take the last matching item
      return $(this.nextSelector, container).last().attr('href');
    };

    /**
     * Loads a page url
     *
     * @param url
     * @param callback
     * @param delay
     * @returns {object}        jsXhr object
     */
    this.load = function(url, callback, delay) {
      var self = this,
          $itemContainer,
          items = [],
          timeStart = +new Date(),
          timeDiff;

      delay = delay || this.defaultDelay;

      var loadEvent = {
        url: url
      };

      self.fire('load', [loadEvent]);

      return $.get(loadEvent.url, null, $.proxy(function(data) {
        $itemContainer = $(this.itemsContainerSelector, data).eq(0);
        if (0 === $itemContainer.length) {
          $itemContainer = $(data).filter(this.itemsContainerSelector).eq(0);
        }

        if ($itemContainer) {
          $itemContainer.find(this.itemSelector).each(function() {
            items.push(this);
          });
        }

        self.fire('loaded', [data, items]);

        if (callback) {
          timeDiff = +new Date() - timeStart;
          if (timeDiff < delay) {
            setTimeout(function() {
              callback.call(self, data, items);
            }, delay - timeDiff);
          } else {
            callback.call(self, data, items);
          }
        }
      }, self), 'html');
    };

    /**
     * Renders items
     *
     * @param callback
     * @param items
     */
    this.render = function(items, callback) {
      var self = this,
          $lastItem = this.getLastItem(),
          count = 0;

      var promise = this.fire('render', [items]);

      promise.done(function() {
        $(items).hide(); // at first, hide it so we can fade it in later

        $lastItem.after(items);

        $(items).fadeIn(400, function() {
          // complete callback get fired for each item,
          // only act on the last item
          if (++count < items.length) {
            return;
          }

          self.fire('rendered', [items]);

          if (callback) {
            callback();
          }
        });
      });
    };

    /**
     * Hides the pagination
     */
    this.hidePagination = function() {
      if (this.paginationSelector) {
        $(this.paginationSelector, this.$container).hide();
      }
    };

    /**
     * Restores the pagination
     */
    this.restorePagination = function() {
      if (this.paginationSelector) {
        $(this.paginationSelector, this.$container).show();
      }
    };

    /**
     * Throttles a method
     *
     * Adopted from Ben Alman's jQuery throttle / debounce plugin
     *
     * @param callback
     * @param delay
     * @return {object}
     */
    this.throttle = function(callback, delay) {
      var lastExecutionTime = 0,
          wrapper,
          timerId
      ;

      wrapper = function() {
        var that = this,
            args = arguments,
            diff = +new Date() - lastExecutionTime;

        function execute() {
          lastExecutionTime = +new Date();
          callback.apply(that, args);
        }

        if (!timerId) {
          execute();
        } else {
          clearTimeout(timerId);
        }

        if (diff > delay) {
          execute();
        } else {
          timerId = setTimeout(execute, delay);
        }
      };

      if ($.guid) {
        wrapper.guid = callback.guid = callback.guid || $.guid++;
      }

      return wrapper;
    };

    /**
     * Fires an event with the ability to cancel further processing. This
     * can be achieved by returning false in a listener.
     *
     * @param event
     * @param args
     * @returns {*}
     */
    this.fire = function(event, args) {
      return this.listeners[event].fireWith(this, args);
    };

    /**
     * Pauses the scroll handler
     *
     * Note: internal use only, if you need to pause IAS use `unbind` method.
     *
     * @private
     */
    this.pause = function() {
      this.isPaused = true;
    };

    /**
     * Resumes the scroll handler
     *
     * Note: internal use only, if you need to resume IAS use `bind` method.
     *
     * @private
     */
    this.resume = function() {
      this.isPaused = false;
    };

    return this;
  };

  /**
   * Initialize IAS
   *
   * Note: Should be called when the document is ready
   *
   * @public
   */
  IAS.prototype.initialize = function() {
    var currentScrollOffset = this.getCurrentScrollOffset(this.$scrollContainer),
        scrollThreshold = this.getScrollThreshold();

    this.hidePagination();
    this.bind();

    this.fire('ready');

    this.nextUrl = this.getNextUrl();

    // start loading next page if content is shorter than page fold
    if (currentScrollOffset >= scrollThreshold) {
      this.next();
    }

    return this;
  };

  /**
   * Reinitializes IAS, for example after an ajax page update
   *
   * @public
   */
  IAS.prototype.reinitialize = function () {
    this.unbind();
    this.initialize();
  };

  /**
   * Binds IAS to DOM events
   *
   * @public
   */
  IAS.prototype.bind = function() {
    if (this.isBound) {
      return;
    }

    this.$scrollContainer.on('scroll', $.proxy(this.throttle(this.scrollHandler, 150), this));

    for (var i = 0, l = this.extensions.length; i < l; i++) {
      this.extensions[i].bind(this);
    }

    this.isBound = true;
    this.resume();
  };

  /**
   * Unbinds IAS to events
   *
   * @public
   */
  IAS.prototype.unbind = function() {
    if (!this.isBound) {
      return;
    }

    this.$scrollContainer.off('scroll', this.scrollHandler);

    // notify extensions about unbinding
    for (var i = 0, l = this.extensions.length; i < l; i++) {
      if (typeof this.extensions[i]['unbind'] != 'undefined') {
        this.extensions[i].unbind(this);
      }
    }

    this.isBound = false;
  };

  /**
   * Destroys IAS instance
   *
   * @public
   */
  IAS.prototype.destroy = function() {
    this.unbind();

    this.$scrollContainer.data('ias', null);
  };

  /**
   * Registers an eventListener
   *
   * Note: chainable
   *
   * @public
   * @returns IAS
   */
  IAS.prototype.on = function(event, callback, priority) {
    if (typeof this.listeners[event] == 'undefined') {
      throw new Error('There is no event called "' + event + '"');
    }

    priority = priority || 0;

    this.listeners[event].add($.proxy(callback, this), priority);

    return this;
  };

  /**
   * Registers an eventListener which only gets
   * fired once.
   *
   * Note: chainable
   *
   * @public
   * @returns IAS
   */
  IAS.prototype.one = function(event, callback) {
    var self = this;

    var remover = function() {
      self.off(event, callback);
      self.off(event, remover);
    };

    this.on(event, callback);
    this.on(event, remover);

    return this;
  };

  /**
   * Removes an eventListener
   *
   * Note: chainable
   *
   * @public
   * @returns IAS
   */
  IAS.prototype.off = function(event, callback) {
    if (typeof this.listeners[event] == 'undefined') {
      throw new Error('There is no event called "' + event + '"');
    }

    this.listeners[event].remove(callback);

    return this;
  };

  /**
   * Load the next page
   *
   * @public
   */
  IAS.prototype.next = function() {
    var url = this.nextUrl,
        self = this;

    this.pause();

    if (!url) {
      this.fire('noneLeft', [this.getLastItem()]);
      this.listeners['noneLeft'].disable(); // disable it so it only fires once

      self.resume();

      return false;
    }

    var promise = this.fire('next', [url]);

    promise.done(function() {
      self.load(url, function(data, items) {
        self.render(items, function() {
          self.nextUrl = self.getNextUrl(data);

          self.resume();
        });
      });
    });

    promise.fail(function() {
      self.resume();
    });

    return true;
  };

  /**
   * Adds an extension
   *
   * @public
   */
  IAS.prototype.extension = function(extension) {
    if (typeof extension['bind'] == 'undefined') {
      throw new Error('Extension doesn\'t have required method "bind"');
    }

    if (typeof extension['initialize'] != 'undefined') {
      extension.initialize(this);
    }

    this.extensions.push(extension);

    this.reinitialize();

    return this;
  };

  /**
   * Shortcut. Sets the window as scroll container.
   *
   * @public
   * @param option
   * @returns {*}
   */
  $.ias = function(option) {
    var $window = $(window);

    return $window.ias.apply($window, arguments);
  };

  /**
   * jQuery plugin initialization
   *
   * @public
   * @param option
   * @returns {*} the last IAS instance will be returned
   */
  $.fn.ias = function(option) {
    var args = Array.prototype.slice.call(arguments);
    var retval = this;

    this.each(function() {
      var $this = $(this),
          instance = $this.data('ias'),
          options = $.extend({}, $.fn.ias.defaults, $this.data(), typeof option == 'object' && option)
          ;

      // set a new instance as data
      if (!instance) {
        $this.data('ias', (instance = new IAS($this, options)));

        $(document).ready($.proxy(instance.initialize, instance));
      }

      // when the plugin is called with a method
      if (typeof option === 'string') {
        if (typeof instance[option] !== 'function') {
          throw new Error('There is no method called "' + option + '"');
        }

        args.shift(); // remove first argument ('option')
        instance[option].apply(instance, args);
      }

      retval = instance;
    });

    return retval;
  };

  /**
   * Plugin defaults
   *
   * @public
   * @type {object}
   */
  $.fn.ias.defaults = {
    item: '.item',
    container: '.listing',
    next: '.next',
    pagination: false,
    delay: 600,
    negativeMargin: 10
  };
})(jQuery);

/**
 * IAS Spinner Extension
 * An IAS extension to show a spinner when loading
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASSpinnerExtension = function(options) {
  options = jQuery.extend({}, this.defaults, options);

  this.ias = null;
  this.uid = new Date().getTime();
  this.src = options.src;
  this.html = (options.html).replace('{src}', this.src);

  /**
   * Shows spinner
   */
  this.showSpinner = function() {
    var $spinner = this.getSpinner() || this.createSpinner(),
        $lastItem = this.ias.getLastItem();

    $lastItem.after($spinner);
    $spinner.fadeIn();
  };

  /**
   * Shows spinner
   */
  this.showSpinnerBefore = function() {
    var $spinner = this.getSpinner() || this.createSpinner(),
        $firstItem = this.ias.getFirstItem();

    $firstItem.before($spinner);
    $spinner.fadeIn();
  };

  /**
   * Removes spinner
   */
  this.removeSpinner = function() {
    if (this.hasSpinner()) {
      this.getSpinner().remove();
    }
  };

  /**
   * @returns {jQuery|boolean}
   */
  this.getSpinner = function() {
    var $spinner = jQuery('#ias_spinner_' + this.uid);

    if ($spinner.length > 0) {
      return $spinner;
    }

    return false;
  };

  /**
   * @returns {boolean}
   */
  this.hasSpinner = function() {
    var $spinner = jQuery('#ias_spinner_' + this.uid);

    return ($spinner.length > 0);
  };

  /**
   * @returns {jQuery}
   */
  this.createSpinner = function() {
    var $spinner = jQuery(this.html).attr('id', 'ias_spinner_' + this.uid);

    $spinner.hide();

    return $spinner;
  };

  return this;
};

/**
 * @public
 */
IASSpinnerExtension.prototype.bind = function(ias) {
  this.ias = ias;

  ias.on('next', jQuery.proxy(this.showSpinner, this));
  ias.on('render', jQuery.proxy(this.removeSpinner, this));

  try {
    ias.on('prev', jQuery.proxy(this.showSpinnerBefore, this));
  } catch (exception) {}
};

/**
 * @public
 * @param {object} ias
 */
IASSpinnerExtension.prototype.unbind = function(ias) {
  ias.off('next', this.showSpinner);
  ias.off('render', this.removeSpinner);

  try {
    ias.off('prev', this.showSpinnerBefore);
  } catch (exception) {}
};

/**
 * @public
 */
IASSpinnerExtension.prototype.defaults = {
  src: 'data:image/gif;base64,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',
  html: '<div class="ias-spinner" style="text-align: center;"><img src="{src}"/></div>'
};


/**
 * IAS None Left Extension
 * An IAS extension to show a message when there are no more pages te load
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASNoneLeftExtension = function(options) {
  options = jQuery.extend({}, this.defaults, options);

  this.ias = null;
  this.uid = (new Date()).getTime();
  this.html = (options.html).replace('{text}', options.text);

  /**
   * Shows none left message
   */
  this.showNoneLeft = function() {
    var $element = jQuery(this.html).attr('id', 'ias_noneleft_' + this.uid),
        $lastItem = this.ias.getLastItem();

    $lastItem.after($element);
    $element.fadeIn();
  };

  return this;
};

/**
 * @public
 */
IASNoneLeftExtension.prototype.bind = function(ias) {
  this.ias = ias;

  ias.on('noneLeft', jQuery.proxy(this.showNoneLeft, this));
};

/**
 * @public
 * @param {object} ias
 */
IASNoneLeftExtension.prototype.unbind = function(ias) {
  ias.off('noneLeft', this.showNoneLeft);
};

/**
 * @public
 */
IASNoneLeftExtension.prototype.defaults = {
  text: 'You reached the end.',
  html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
};
