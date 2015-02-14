<?php

//require "connect.php";
//require "functions.php";

// We don't want web bots accessing this page:
if(is_bot()) die();

// Selecting the top 15 countries with the most visitors:
$sql="SELECT countryCode,country, COUNT(*) AS total FROM online GROUP BY countryCode ORDER BY total DESC LIMIT 15";
$result = $database->get_results($sql);

foreach($result as $row)
{
	echo '
	<div class="geoRow">
		<div class="flag"><img src="/static/img/famfamfam-countryflags/'.strtolower($row['countryCode']).'.gif" width="20" height="13" /></div>
		<div class="country text-left" title="'.htmlspecialchars($row['country']).'">'.$row['country'].'</div>
		<div class="people pull-right">'.$row['total'].'</div>
	</div>
	';
}

?>