<?php

$library = array
(

        'class.db.php',                           //MYSQLi Database Wrapper
        'class.library.php',                      //Custom PHP Functions
        'class.parsedown.php',                    //Markdown Parsing
        'phpMailer/PHPMailerAutoload.php',        //phpMailer Mail Transport Class
        'class.login.php',
        'class.registration.php',
        'class.turncate.php',
        'class.rsslib.php',
        'class.S3.php'
);

foreach ($library AS $class)
{

    require($class);                              // Load dependencies

}
