<?php    
	if( isset($_GET['file']) && $_GET['file'] != '' )
	{
	    $file = $database->escape($_GET['file']);
	    
	    //query database for download url
	    $query = 'SELECT * FROM `downloads` WHERE `filename` LIKE "%' . $file . '%" ';
	    
	    // FOUND
	    if ($database->num_rows($query) > 0)
	    {
		   
		   list( $id, $filename, $description, $size, $date, $md5checksum, $downloaded, $url) = $database->get_row( $query );
		   
		   $count = ($downloaded + 1);
		   
		   if (remoteFilesize($url) < 5000000 ) //5000000 B = 5 MB
		   {
			   $filedata = @file_get_contents($url);
		
			   // SUCCESS
			   if ($filedata)
			   {
					// GET A NAME FOR THE FILE
					$basename = basename($filename);
					
					// THESE HEADERS ARE USED ON ALL BROWSERS
					header("Content-Type: application-x/force-download");
					header("Content-Disposition: attachment; filename=$basename");
					header("Content-length: " . (string)(strlen($filedata)));
					header("Expires: ".gmdate("D, d M Y H:i:s", mktime(date("H")+2, date("i"), date("s"), date("m"), date("d"), date("Y")))." GMT");
					header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
					
					// THIS HEADER MUST BE OMITTED FOR IE 6+
					if (FALSE === strpos($_SERVER["HTTP_USER_AGENT"], 'MSIE '))
					{
					  header("Cache-Control: no-cache, must-revalidate");
					}
					
					// THIS IS THE LAST HEADER
					header("Pragma: no-cache");
					
					// FLUSH THE HEADERS TO THE BROWSER
					flush();
					
					// CAPTURE THE FILE IN THE OUTPUT BUFFERS - WILL BE FLUSHED AT SCRIPT END
					//ob_get_level();
					ob_start();
					echo $filedata;
					ob_end_flush();
				}
			   // FAILURE
			   else
			   {
				die("ERROR: UNABLE TO OPEN $filename");
			   }
		   }
	    	   else 
	    	   {
	    	   	header('Location: ' . $url );
	    	   }
	    	   
	    	   //Update download count
			$update = array(
				'downloaded' => $count
			);
			//Add the WHERE clauses
			$where_clause = array(
				'id' => $id
			);
			$updated = $database->update( 'downloads', $update, $where_clause, 1 );
	    }
	    // NOT FOUND
	    else
	    {
		   die("ERROR: NO FILE FOUND");
	    }
	}
	else 
	{
		header('Location: /?page=downloads');
	}
?>