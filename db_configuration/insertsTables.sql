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
-- Table structure for tables
--

INSERT INTO `posts`(`author`,`title`,`text`)
VALUES
	('1','Protestos em Brasilia','Protestos em Brasilia'),
	('1','Protestos em Sao Paulo','Protestos em Sao Paulo'),
	('2','Protestos em Minas','Protestos em Minas'),
	('3','Protestos em Alagoas','Protestos em Alagoas'),
	('1','Protestos em Brasilia2','Protestos em Brasilia2'),
	('1','Protestos em Sao Paulo2','Protestos em Sao Paulo2'),
	('2','Protestos em Minas2','Protestos em Minas2'),
	('3','Protestos em Alagoas2','Protestos em Alagoas2'),
	('1','Protestos em Brasilia3','Protestos em Brasilia3'),
	('1','Protestos em Sao Paulo3','Protestos em Sao Paulo3'),
	('2','Protestos em Minas3','Protestos em Minas3'),
	('3','Protestos em Alagoas3','Protestos em Alagoas3'),
	('1','Protestos em Brasilia4','Protestos em Brasilia4'),
	('1','Protestos em Sao Paulo4','Protestos em Sao Paulo4'),
	('2','Protestos em Minas4','Protestos em Minas4'),
	('3','Protestos em Alagoas4','Protestos em Alagoas4');

INSERT INTO `comments`(`author`,`post`,`text`)
VALUES
	('3','1','Protestos em Brasilia'),
	('3','1','Protestos em Sao Paulo'),
	('4','2','Protestos em Minas'),
	('6','3','Protestos em Alagoas');

INSERT INTO `user`(`name`,`email`,`gender`,`birthday`,`passWord`,`profilePicture`,`userType`) 
VALUES 
	('Digenaldo Neto','digenaldo.net@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Raphael Diniz','raphael.diniz@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Joao Helis Bernardo','joaohelis.bernardo@dce.ufpb.br','Masculino', '27-07-1993', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Kelson Victor','kelson.victor@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Pablo Lima','pablo.lima@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Juan Duarte','juan.duarte@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Smith Ascari','smith.ascari@dce.ufpb.br','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Carlos Junior','carlos@gmail.com','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Lucas Andrade','Lucas@hotmail.com','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Joaquim Santos','joaquim@gmail.com','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Jaqueline Silva','jaqueline@uol.com.br','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Giseli Lima','giseli@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Maria Jose','mariajose@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Joana Silva','joana@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Juliana Bernardo','juliana@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Barbara Duarte','barbara@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Isadora Montenegro','isadora@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Fernanda Lima','fernada@gmail.com','Feminino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Joao Maria','joao@gmail.com','Masculino', '24-01-2424', '123', '../img/profilePictures/defaultPicture.jpg', '1'),
	('Yuri Malheiros','yuri@dce.ufpb.br','Masculino', '01-01-1990', '123', '../img/profilePictures/defaultPicture.jpg', '1');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

