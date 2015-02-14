-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: main
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alert`
--

DROP TABLE IF EXISTS `alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(64) NOT NULL,
  `message` varchar(512) NOT NULL,
  `active` tinyint(2) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
INSERT INTO `alert` VALUES (1,'success','<b>Please note:</b> The site & server have undergone a complete back-end upgrade. You may notice the site is no longer \"one-page\", but instead, spread out over multiple pages. This will alllow for better SEO, and flexibility for more frequent updates to the page, this includes the addition of this alert feature to reach our ~500/day visitors. If you are a returning visitor, you may need to empty your cache to see the most current version of this page...',1,'2015-02-06 09:21:38'),(4,'info','For the most up-to-date information regarding the <b>Whitfield Bryson & Mason LLP</b> Class Action lawsuit, please visit archive.org\'s case docket for <b><a href=\"http://ia802205.us.archive.org/19/items/gov.uscourts.cand.281728/gov.uscourts.cand.281728.docket.html\" target=\"_BLANK\">Book et al v. Apple Inc.</a></b>',0,'2015-02-06 15:20:59');
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `source` varchar(512) DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `downloads`
--

DROP TABLE IF EXISTS `downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `downloads` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `filename` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `size` int(32) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `md5checksum` binary(16) DEFAULT NULL,
  `downloaded` int(10) NOT NULL,
  `url` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downloads`
--

LOCK TABLES `downloads` WRITE;
/*!40000 ALTER TABLE `downloads` DISABLE KEYS */;
INSERT INTO `downloads` VALUES (5,'mbp2011_logo.png','The #MBP2011 Community Logo',18276,'2015-02-10 11:00:16','8bacc96dc3a27719',8,'http://mbp2011.org/static/img/mbp2011_logo.png'),(6,'022_First_Amended_Complaint.pdf','First Amended Complaint from Whitfield, Bryson, Mason LLP. ',1977225,'2015-02-10 16:52:26','7eb1e4e391bf4312',6,'http://files.www.wbmllp.com/news/class-action-filed-against-apple-for-defective-2011-macbook-pro-laptops/022_First_Amended_Complaint.pdf'),(9,'elementary_OS_0.3_isis_64bit_mbp_8_2.iso','Elementary OS with disabled AMD/ATI drivers. [In German?]',1922537472,'2015-02-11 11:19:52','7d84adf3e90ebab9',4,'http://mbp2011.s3.amazonaws.com/downloads/elementary_OS_0.3-isis-64bit-mbp8.2.iso');
/*!40000 ALTER TABLE `downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_`
--

DROP TABLE IF EXISTS `news_`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_` (
  `item_id` int(5) NOT NULL AUTO_INCREMENT,
  `item_image` varchar(256) NOT NULL,
  `item_url` varchar(512) DEFAULT NULL,
  `item_title` varchar(160) NOT NULL,
  `item_author_url` varchar(512) DEFAULT NULL,
  `item_author` varchar(60) NOT NULL,
  `item_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_snippet` text NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_`
--

LOCK TABLES `news_` WRITE;
/*!40000 ALTER TABLE `news_` DISABLE KEYS */;
INSERT INTO `news_` VALUES (1,'static/img/thumbs/cnnmoney.jpg','http://money.cnn.com/2014/10/27/technology/apple-macbook/index.html','21,000 push Apple to replace \'defective\' MacBook Pros - CNN Money','https://twitter.com/intent/user?screen_name=jtotoole','James O\'Toole','2014-10-27 08:00:00','Apple has a bunch of dissatisfied customers on its hands. More than 20,000 people have signed an online petition calling on the company to replace 2011 MacBook Pros that have allegedly been suffering frequent system crashes and graphics failures...'),(2,'static/img/thumbs/bgr.jpg','http://bgr.com/2014/10/24/2011-macbook-pro-discrete-graphics-card-failure/','Hey Apple, it&#039;s time you acknowledged and solved your MacBook Pro problem - BGR','https://twitter.com/chris_writes','Chris Smith','2014-10-25 05:38:50','My MacBook isn\'t a 2011 model (MBP2011) and it\'s a good thing, because users around the world are plagued by a serious issue that has a dramatic impact on usability...'),(3,'static/img/thumbs/appleinsider2.png','http://appleinsider.com/articles/14/05/13/apple-remains-mum-as-complaints-mount-over-2011-macbook-pro-gpu-failures','Apple remains mum as complaints mount over 2011 MacBook Pro GPU failures - AI','mailto:mikeycampbell@gmail.com','Mikey Campbell','2014-05-14 05:38:50','With an increasing number of 2011 MacBook Pros suffering from what appears to be similar issues relating to built-in discrete AMD video cards, owners are now calling for a replacement program...'),(4,'static/img/thumbs/macrumors.png','http://www.macrumors.com/2014/01/17/2011-macbook-pro-gpu-glitches/','Some 2011 MacBook Pros Experiencing GPU Glitches, System Crashes - MacRumours','https://twitter.com/julipuli','Juli Clover','2014-01-18 07:38:50','It appears that the MacBooks, first released on February 28, 2011, are displaying screen glitches primarily during graphics-intensive work or games. MacBook owners have noted visible striations and image distortion or an entirely blank screen, which can often be temporarily...'),(6,'static/img/thumbs/cultofmac.png','http://www.cultofmac.com/262861/early-2011-macbook-pros-dropping-like-flies-heat-issues-blame/','Early 2011 MacBook Pros Are Dropping Like Flies, Heat Issues To Blame - Cult Of Mac','http://www.cultofmac.com/author/john-brownlee/','John Brownlee','2014-01-08 07:41:48','If you have a 2011 MacBook Pro that is wonking out like it was haunted by a Japanese ghost, you\'re not the only one. It appears that a massive number of early-2011 MacBook Pro owners with AMD graphics are having issues with system crashes and hardware problems, with failure...'),(7,'static/img/thumbs/arstechnica.png','http://arstechnica.com/apple/2014/01/report-some-2011-macbook-pros-with-amd-gpus-experiencing-hardware-failures/','2011 MacBook Pros with AMD GPUs experiencing hardware failures - ArsTechnica','http://arstechnica.com/author/andrew_cunningham/','Andrew Cunningham','2014-01-18 07:38:50','By themselves, these scattered reports of GPU problems wouldn\"t merit much examination. Apple Support Communities and MacRumors threads exist for basically every problem under the sun, and it\"s difficult to isolate cause and effect. However, back in August Apple initiated a...'),(8,'static/img/thumbs/techrepublic.png','http://www.techrepublic.com/blog/apple-in-the-enterprise/internet-reports-suggest-possible-2011-macbook-pro-graphics-issue/','Internet reports suggest possible 2011 MacBook Pro graphics issue - TechRepublic','http://www.techrepublic.com/search/?a=erik+eckel','Erik Eckel','2014-01-28 07:38:50','A long-running Mac complaint recently picked up quite a head of steam. Reddit posts, a Slashdot thread, and even items on Mac sites, such as MacRumors.com, explored the possibility a graphics card issue might exist with 2011-model MacBook Pros. At least one...'),(9,'static/img/thumbs/macworld.png','http://www.macworld.co.uk/news/mac/widespread-2011-macbook-pro-failures-reported-3497935/','MacBook Pro graphics class action lawsuit to be heard by judge &#039;in April&#039; - MacWorld','http://www.macworld.co.uk/author/ashleigh-allsopp/','Ashleigh Allsopp','2015-01-30 07:38:50','Some MacBook Pro models are reportedly subject to regular system crashes, but Apple still hasn\'t addressed the issue. Will Apple start a replacement programme? We bring you the latest information.'),(10,'http://s3-ec.buzzfed.com/static/2015-02/3/11/enhanced/webdr04/enhanced-388-1422981491-8.jpg','http://www.buzzfeed.com/patriciac13/reasons-why-apple-should-resolve-the-macbook-pro-2-bcig','Reasons Why Apple Should Resolve The Macbook Pro 2011 Issue - Buzzfeed','http://www.buzzfeed.com/patriciac13','patriciac13','2015-02-03 05:00:00','Since 2013, reports of Macbook Pro 2011 models experiencing system crashes and hardware problems, due to AMD graphics card failure, have continued to surface. Consumers like me have spent thousands of our money, expecting optimum performance, yet we are met with disappointment. It’s time for Apple to hold accountability. #mbp2011'),(11,'static/img/thumbs/time.jpg','http://time.com/3545723/apple-macbook-lawsuit/','Everything You Need to Know About the Apple MacBook Pro Lawsuit - TIME.COM','http://time.com/author/dan-kedmey/','Dan Kedmey','2014-10-29 04:00:00','Lawyers representing frustrated Apple MacBook owners filed a class action complaint Tuesday, alleging the company failed to address a glaring defect in some 2011-era MacBooks that causes screens to blur, show nothing at all or, in worst case scenarios, short circuit the entire system.'),(12,'http://photos2.appleinsider.com/gallery/10925-3441-Screen-Shot-2014-10-28-at-13251-PM-l.jpg','http://appleinsider.com/articles/15/01/15/2011-macbook-pro-graphics-class-action-suit-expands-accuses-apple-of-concealing-defects','2011 MacBook Pro graphics class-action suit expands, accuses Apple of concealing defects.','mailto:neil@appleinsider.com','Neil Hughes','2015-01-15 05:00:00','Members of the 2011 MacBook Pro graphics failure class-action lawsuit were updated this week on the latest developments in the case, which has expanded to include multiple states and lodges new complaints against Apple, accusing the company of deliberately concealing problems.');
/*!40000 ALTER TABLE `news_` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `online`
--

DROP TABLE IF EXISTS `online`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `online` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip` int(11) NOT NULL DEFAULT '0',
  `country` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `countrycode` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `city` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`),
  KEY `countrycode` (`countrycode`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto incrementing user_id of each user, unique index',
  `user_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s name, unique',
  `user_password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s password in salted and hashed format',
  `user_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s email, unique',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='user data';
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-12 17:23:17
