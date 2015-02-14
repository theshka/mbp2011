<?php
/*
	RSS Extractor and Displayer
	(c) 2007-2010  Scriptol.com - Licence Mozilla 1.1.
	rsslib.php
	
	Requirements:
	- PHP 5.
	- A RSS feed.
	
	Using the library:
	Insert this code into the page that displays the RSS feed:
	
	<?php
	require_once("rsslib.php");
	echo RSS_Display("http://www.xul.fr/rss.xml", 15);
	? >
	
*/

$RSS_Content = array();

function RSS_Tags($item, $type)
{
		$y = array();
		$tnl = $item->getElementsByTagName("title");
		$tnl = $tnl->item(0);
		$title = $tnl->firstChild->textContent;

		$tnl = $item->getElementsByTagName("link");
		$tnl = $tnl->item(0);
		$link = $tnl->firstChild->textContent;
		
		$tnl = $item->getElementsByTagName("pubDate");
		$tnl = $tnl->item(0);
		$date = $tnl->firstChild->textContent;		

		$tnl = $item->getElementsByTagName("description");
		$tnl = $tnl->item(0);
		$description = $tnl->firstChild->textContent;

		$y["title"] = $title;
		$y["link"] = $link;
		$y["date"] = $date;		
		$y["description"] = $description;
		$y["type"] = $type;
		
		return $y;
}


function RSS_Channel($channel)
{
	global $RSS_Content;

	$items = $channel->getElementsByTagName("item");
	
	// Processing channel
	
	$y = RSS_Tags($channel, 0);		// get description of channel, type 0
	array_push($RSS_Content, $y);
	
	// Processing articles
	
	foreach($items as $item)
	{
		$y = RSS_Tags($item, 1);	// get description of article, type 1
		array_push($RSS_Content, $y);
	}
}


function RSS_Retrieve($url)
{
	global $RSS_Content;

	$doc  = new DOMDocument();
	$doc->load($url);

	$channels = $doc->getElementsByTagName("channel");
	
	$RSS_Content = array();
	
	foreach($channels as $channel)
	{
		 RSS_Channel($channel);
	}
	
}


function RSS_RetrieveLinks($url)
{
	global $RSS_Content;

	$doc  = new DOMDocument();
	$doc->load($url);

	$channels = $doc->getElementsByTagName("channel");
	
	$RSS_Content = array();
	
	foreach($channels as $channel)
	{
		$items = $channel->getElementsByTagName("item");
		foreach($items as $item)
		{
			$y = RSS_Tags($item, 1);	// get description of article, type 1
			array_push($RSS_Content, $y);
		}
		 
	}

}


function RSS_Links($url, $size = 15)
{
	global $RSS_Content;

	//$page = "<ul>";

	RSS_RetrieveLinks($url);
	if($size > 0)
		$recents = array_slice($RSS_Content, 0, $size + 1);

	foreach($recents as $article)
	{
		$type = $article["type"];
		if($type == 0) continue;
		$title = $article["title"];
		$link = $article["link"];
		$page .= "<a href=\"$link\" target=\"_BLANK\">$title</a>\n";			
	}

	//$page .="</ul>\n";

	return $page;
	
}



function RSS_Display($url, $size = 15, $site = 0, $withdate = 0)
{
	global $RSS_Content;

	$opened = false;
	$page = "";
	$site = (intval($site) == 0) ? 1 : 0;

	RSS_Retrieve($url);
	if($size > 0) {
		$recents = array_slice($RSS_Content, $site, $size + 1 - $site);
	}
	
	$i = 1;
	foreach($recents as $article)
	{
		$type = $article["type"];
		
		if($type == 0)
		{
			if($opened == true)
			{
				//$page .="</ul>\n";
				$opened = false;
			}
			//$page .="<b>";
		}
		else
		{
			if($opened == false) 
			{
				//$page .= "<ul>\n";
				$opened = true;
			}
		}
		
		$title = $article["title"];
		$link = $article["link"];
		$page .= "<div id='div" . $i . "' class='display'> <!--<a href=\"$link\" target=\"_BLANK\">$title</a>-->";
		
		if($withdate)
		{
		  $date = date('Y-m-d H:i:s', strtotime($article["date"]));
		  $page .=' - <span class="rssdate text-muted">' . timeAgo(strtotime($date)) . '</span>';
		}
		
		$description = $article["description"];
		
		if($description != false)
		{
			$page .= "<span class='rssdesc'>$description</span>";
		}
		//$page .= "</li>\n";			
		
		if($type==0)
		{
			//$page .="</b>";
		}
		$page .= '</div>';
		$i++;
	}

	if($opened == true)
	{	
		//$page .="</ul>\n";
	}
	
	$page.="<script>jQuery('.lh a').attr('target','_blank');</script>";
	
	return $page."\n";
	
}


?>
