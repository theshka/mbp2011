<?php

//TIMEZONE
date_default_timezone_set('EST');                   // set default timezone

//BASE URL
define( "BASE_URL", baseUrl() );                    // set database host

//DOMAIN
define( "BASE_DOMAIN", getDomain() );               // set database domain

//DATABASE
define( "DB_HOST", "localhost" );                   // set database host
define( "DB_USER", "root" );                        // set database user
define( "DB_PASS", "" );                            // set database password
define( "DB_NAME", "main" );                        // set database name
define( "SEND_ERRORS_TO", "" );                     // set email notification address

//DEBUGGING
define( "DISPLAY_DEBUG", false );                    // display errors?

//CUSTOMIZE
define ('SITE_NAME', '#MBP2011');                  								  // set the name of the site
define ('SITE_SLOGAN', '2011 MacBook Pro, GPU Failure, Image Distortion');                  // set the name of the site
define ('SITE_EMAIL', 'webmaster@' . BASE_DOMAIN ); 								  // set the site email address
define ('SITE_ADDRESS1', '');       											  // set site address
define ('SITE_ADDRESS2', '');                       								  // set site address
define ('SITE_CITY', '');                       									  // set site address
define ('SITE_STATE', '');                     									  // set site address
define ('SITE_COUNTRY', '');                 							   	   	  // set site address
define ('SITE_ZIP', '');                       									  // site zip
define ('SITE_PHONE', '');              										  // site phone number

define('RSS_URL', 'http://feeds.feedburner.com/2011MacbookPro-GoogleNews');			  //RSS Url

//AWS access info
define( "AWS_BUCKET", 'mbp2011' );                 // Upload to this bucket
define( "AWS_ACCESS_KEY", '' );                    // AWS S3 Access Key
define( "AWS_SECRET_KEY", '' );                    // AWS S3 Secret Key
