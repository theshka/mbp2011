<?php
/*
* APP RUNTIME
*/
include('lib/autoload.php'); //Load Dependencies
include('config.php'); //Site Configuration

/**
* Force non-www SSL
*/
if ($_SERVER['HTTP_HOST'] == 'www.' . BASE_DOMAIN || $_SERVER['SERVER_PORT'] != '443') {
	header("Location: https://" . BASE_DOMAIN . $_SERVER['REQUEST_URI']);
}

// show errors?
setEnvironment(DISPLAY_DEBUG);

//Connect MYSQLi DB
$database = new DB();

//Instance login
$login = new Login();

/*
* PAGE LOGIC
*/
//start output buffer
ob_start();

//If no function is set
if (!isset($_GET['func']))
{
	//Check is page is set
	if (isset($_GET['page']))
	{
		//Get the page variable
		$page = $_GET['page'];

		switch ($page) {
			case 'action':
				$page_title = 'Take Action!';
				break;

			case 'info':
				$page_title = 'Zach Clawson\'s Page';
				break;

			case 'breakfree':
				$page_title = 'BREAKFREE.CC | Photo Stream';
				break;

			case 'error':
				$page_title = 'Oops!!';
				break;

			case '':
				break;

			default:
				if (preg_match('/admin/', $page)) {
					$title      = explode('/', $page);
					$page_title = ucfirst($title[0]) . ' - ' . ucfirst($title[1]);

				} else {
					$page_title = ucfirst($page);
				}
				break;
		}

		//no page set, go home...
		if (empty($page))
		{
			$page = "home";
			//$page_title = "Home";
			include('view/common/header.phtml');
			include('view/home.phtml');
		}
		elseif ($page === 'login' || preg_match('/^admin/', $page))
		{
			//$page_title = explode('/', $page);
			include('view/common/header.phtml');
			include('view/' . $page . '.phtml');
		}
		else
		{
			//no file exists, error...
			if (!file_exists("view/" . $page . ".phtml")) {
				//$page_title = "Error";
				$n = "404";
				include('view/common/header.phtml');
				include('view/common/error.phtml');
			}
			//show requested page
			else {
				//$page_title = ucfirst($page);
				include('view/common/header.phtml');
				include('view/' . $page . '.phtml');
			}
		}

	}
	//No function, and no page, go home...
	else
	{

		$page       = "home";
		$page_title = ucfirst($page);
		include('view/common/header.phtml');
		include('view/home.phtml');

	}

	//Include the footer in every page
	include('view/common/footer.phtml');

	//Include online visitors
	include('func/online.php');
}

//Function is set
if (isset($_GET['func']))
{
	//get the fucntion
	$func = $_GET['func'];
	$func = strip_tags($func);

	//if no function exists, error page...
	if (!file_exists("func/" . $func . ".php"))
	{
		header('location: index.php?page=error');
	}
	//load the fucntion...
	else
	{
		include('func/' . $func . '.php');
	}
}

//flush output buffer
ob_end_flush();
