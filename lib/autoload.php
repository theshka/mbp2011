<?php

$library = array
(

        'class.db.php',                           //MYSQLi Database Wrapper
        'class.library.php',                      //Custom PHP Functions
        'class.parsedown.php',                    //Markdown Parsing
        'phpMailer/PHPMailerAutoload.php',        //phpMailer Mail Transport Class
        'class.login.php',                        //PHP-LOGIN Project Login Class
        'class.registration.php',                 //PHP-LOGIN Project Regisistration Class
        'class.turncate.php',                     //CAKE-PHP text turncate function
        'class.S3.php'                            //Amazon AWS S3 Class
);

foreach ($library AS $class)
{

    require($class);                              // Load dependencies

}
