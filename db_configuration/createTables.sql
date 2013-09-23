-- MySQL dump 10.13  Distrib 5.5.15, for osx10.6 (i386)
--
-- Host: localhost    Database: cellar
-- ------------------------------------------------------
-- Server version	5.5.15

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE IF NOT EXISTS `user`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`gender` VARCHAR(100) NOT NULL,
	`birthday` DATE NOT NULL,
	`passWord` VARCHAR(100) NOT NULL,
	`profilePicture` VARCHAR(255) NULL,
	`userType` INT NULL,
	PRIMARY KEY (`id`)
)ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `posts`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`author` INT NOT NULL,
	`title` VARCHAR(100) NOT NULL,
	`text` VARCHAR(10000) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`author`) REFERENCES `user`(`id`)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `comments`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`author` INT NOT NULL,
	`post` INT NOT NULL,
	`text` VARCHAR(1000) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`author`) REFERENCES `user`(`id`),
	FOREIGN KEY (`post`) REFERENCES `posts` (`id`)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `friend_requests`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`requestingUser` INT NOT NULL,
	`targetUser` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`requestingUser`) REFERENCES `user`(`id`),
	FOREIGN KEY (`targetUser`) REFERENCES `user` (`id`)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `message`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`sender` INT NOT NULL,
	`receiver` INT NOT NULL,
	`title` VARCHAR(100) NOT NULL,
	`text` VARCHAR(1000) NOT NULL,	
	`wasRead` BOOL NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`sender`) REFERENCES `user`(`id`),
	FOREIGN KEY (`receiver`) REFERENCES `user`(`id`)
)ENGINE = InnoDB;


/*!40101 SET character_set_client = @saved_cs_client */;
