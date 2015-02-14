<?php

//require "connect.php";
//require "functions.php";

// We don't want web bots scewing our stats:
if(is_bot()) die();



$stringIp = getIP();
$intIp = ip2long($stringIp);

// Checking wheter the visitor is already marked as being online:
$inDB = "SELECT 1 FROM online WHERE ip=".$intIp;

if(!$database->get_row($inDB))
{
	// This user is not in the database, so we must fetch
	// the geoip data and insert it into the online table:
	
	if(isset($_COOKIE['geoData']))
	{
		// A "geoData" cookie has been previously set by the script, so we will use it
		
		// Always escape any user input, including cookies:
		list($city,$countryName,$countryAbbrev) = explode('|',$database->escape($_COOKIE['geoData']));
	}
	else
	{
		// Making an API call to Hostip:
		
		$xml = file_get_contents('http://api.hostip.info/?ip='.$stringIp);
		
		$city = get_tag('gml:name',$xml);
		$city = $city[1];
		
		$countryName = get_tag('countryName',$xml);
		$countryName = $countryName[0];
		
		$countryAbbrev = get_tag('countryAbbrev',$xml);
		$countryAbbrev = $countryAbbrev[0];
		
		// Setting a cookie with the data, which is set to expire in a month:
		setcookie('geoData',$city.'|'.$countryName.'|'.$countryAbbrev, time()+60*60*24*30,'/');
	}
	
	$countryName = str_replace('(Unknown Country?)','UNKNOWN',$countryName);
	
	// In case the Hostip API fails:
		
	if (!$countryName)
	{
		$countryName='UNKNOWN';
		$countryAbbrev='XX';
		$city='(Unknown City?)';
	}
	
	$database->query("	INSERT INTO online (ip,city,country,countrycode)
					VALUES(".$intIp.",'".$city."','".$countryName."','".$countryAbbrev."')");
}
else
{
	// If the visitor is already online, just update the dt value of the row:
	$database->query("UPDATE online SET dt=NOW() WHERE ip=".$intIp);
}

// Removing entries not updated in the last 10 minutes:
$database->query("DELETE FROM online WHERE dt<SUBTIME(NOW(),'0 0:10:0')");

// Counting all the online visitors:
list($totalOnline) = $database->get_row("SELECT COUNT(*) FROM online");

// Outputting the number as plain text:
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	/* special ajax here */
	echo $totalOnline;

}

?>