window.onload = function(){
				    			
				oo.setAPIKey("62852bb87678a5727e5467413aa2a65b2b3fdffa");

				oo.load(function(){
						
				// METRICS
					//VISITS
					var visits = new oo.Metric("82979828", "365d");

                    visits.setMetric("ga:visits");

                    visits.draw('metric-visits');
                    
					//ACTIONS
					var events = new oo.Metric("82979828", "365d");

                    events.setMetric("ga:totalEvents");
                    
                    //events.query.setFilter('ga:eventLabel!=take-action');
                    
                    //events.query.setFilter('ga:eventLabel!=tweet-carousel');
                    
                    events.query.setFilter('ga:eventLabel!=take-action;ga:eventLabel!=tweet-carousel');

                    events.draw('metric-events');
                    
                    //AVERAGE TIME ON SITE
                    var query = new oo.Query("82979828", "365d");
					
					query.addMetric("ga:percentNewVisits");
					
					query.execute(function(data){
						var rounded = Math.round(data.rows[0][0]);
						document.getElementById("metric-nvisit").innerHTML = rounded;
						$("#metric-nvisit").append("%");
					});
                    
				// TIMELINE
					//TIMELINE - VISITS AND NEW VISITS - 30 DAYS
					var timeline = new oo.Timeline("82979828", "30d");

					timeline.addMetric("ga:visits", "Visits");
					
					timeline.addMetric("ga:totalEvents", "Actions");

					timeline.addMetric("ga:newVisits", "New Visits");

					timeline.draw('timeline-visits-newvisits');
					
				//
					var table = new oo.Table("82979828", "365d");
					
					table.setOptions({sort: 'enable', sortAscending: false, sortColumn: 2,});
				
                    table.addDimension("ga:networkLocation", "Apple Store / Corporate Network");
                   
                    table.addDimension("ga:city", "City");
                    
                    table.addMetric("ga:visits", "Visits");
                    
                    table.query.setFilter("ga:networkLocation=@apple"); 
                    
                    table.draw("table");
                    
					
				//BAR - PIE
					//VISITS BY CONTINENT
				//	var bar = new oo.Bar("82979828", "30d");

                //    bar.addMetric("ga:visits", "Visits");

                //    bar.setDimension("ga:continent");

                //    bar.draw('bar-visits-continent');
                    
                    //TRAFFIC TYPE
                //    var pie = new oo.Pie("82979828", "30d");

                //    pie.setMetric("ga:visits", "Visits");
                    
                //    pie.setDimension("ga:sourceMedium");

                //    pie.draw('pie-visits-source');
					
				});
			};
			
$(document).ready(function(){
  $(document).mousemove(function(e){
     TweenLite.to($('body'), 
        .5, 
        { css: 
            {
                'background-position':parseInt(event.pageX/8) + "px "+parseInt(event.pageY/12)+"px, "+parseInt(event.pageX/15)+"px "+parseInt(event.pageY/15)+"px, "+parseInt(event.pageX/30)+"px "+parseInt(event.pageY/30)+"px"
            }
        });
  });
});