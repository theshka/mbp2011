//gaTrack
function trackAction(action){
	switch(action)
	{
		case 0:
		  ga('send', 'event', 'action', 'clicked', 'take-action');
		  break;  
		case 1:
		  ga('send', 'event', 'action', 'clicked', 'petition');
		  break;
		case 2:
		  ga('send', 'event', 'action', 'clicked', 'email-tim');
		  break;
		case 3:
		  ga('send', 'event', 'action', 'clicked', 'tweet-tim');
		  break;
		case 4:
		  ga('send', 'event', 'action', 'clicked', 'apple-feedback');
		  break;
		case 5:
		  ga('send', 'event', 'action', 'clicked', 'facebook-group');
		  break;
		case 6:
		  ga('send', 'event', 'action', 'clicked', 'survey-link');
		  break;
		case 7: 
		  ga('send', 'event', 'action', 'clicked', 'tweet-mbp2011-feed');
		  break;
		case 8: 
		  ga('send', 'event', 'action', 'clicked', 'tweet-mbp2011-timeline');
		  break;
		case 9:
		  ga('send', 'event', 'action', 'clicked', 'article-appleinsider');
		  break;
		case 10: 
		  ga('send', 'event', 'action', 'clicked', 'article-macrumors');
		  break;
		case 11: 
		  ga('send', 'event', 'action', 'clicked', 'article-cultofmac');
		  break;
		case 12: 
		  ga('send', 'event', 'action', 'clicked', 'article-arstechnica');
		  break;
		case 13: 
		  ga('send', 'event', 'action', 'clicked', 'article-techrepublic');
		  break;
		case 14: 
		  ga('send', 'event', 'action', 'clicked', 'article-macworld');
		  break;
		case 15:
		  ga('send', 'event', 'action', 'clicked', 'link-total-server-solutions');
		  break;
		case 16:
		  ga('send', 'event', 'action', 'clicked', 'subscribed');
		  break;
		case 17:
		  ga('send', 'event', 'action', 'clicked', 'tweet-carousel');
		  break;
		case 18:
		  ga('send', 'event', 'action', 'clicked', 'analytics');
		  break;
		case 19:
		  ga('send', 'event', 'action', 'clicked', 'article-appleinsider2');
		break;
		case 20:
		  ga('send', 'event', 'action', 'clicked', 'forum');
		break;
		case 21:
		  ga('send', 'event', 'action', 'clicked', 'article-BGR');
		break;
		case 22:
		  ga('send', 'event', 'action', 'clicked', 'article-CNNMoney');
		break;
		case 30:
		  ga('send', 'event', 'action', 'clicked', 'clawson');
		break;
		case 31:
		  ga('send', 'event', 'modal', 'shown', 'donate');
		break;
		case 32:
		  ga('send', 'event', 'modal', 'shown', 'survey');
		break;
	};
};