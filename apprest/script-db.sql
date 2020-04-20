-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: alumnos
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

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
-- Current Database: `alumnos`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `alumnos` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `alumnos`;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(250) NOT NULL DEFAULT 'curso.png',
  `precio` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `curso_UN` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Programación con JAVA','curso1.png',2750.00),(2,'Programación páginas web JavaScript y PHP','curso.png',2399.99),(3,'MicrosoftMicrosoft Excel 2010 (Completo) Office 2016','curso.png',334.50),(4,'Excel 2016 Avanzado','curso.png',153.50),(5,'Google Drive','curso.png',79.99),(6,'Outlook 2013','curso.png',49.99),(7,'Photoshop CC','curso.png',150.00),(8,'Windows Phone 8','curso.png',99.99),(9,'Introducción a la informática','curso.png',95.00),(10,'Linux Ubuntu 6.06 Básico','curso.png',180.00),(11,'Macromedia Flash 8','curso.png',300.00),(12,'Office 365: Word Profesional (2019)','curso.png',100.00),(13,'Seguridad informática','curso.png',150.00),(14,'Windows 10','curso.png',315.00),(16,'AutoCAD 2009','curso.png',300.99);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos_contratados`
--

DROP TABLE IF EXISTS `cursos_contratados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos_contratados` (
  `id_persona` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  PRIMARY KEY (`id_persona`,`id_curso`),
  KEY `cursos_contratados-curso_FK` (`id_curso`),
  CONSTRAINT `cursos_contratados-curso_FK` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`),
  CONSTRAINT `cursos_contratados-persona_FK` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos_contratados`
--

LOCK TABLES `cursos_contratados` WRITE;
/*!40000 ALTER TABLE `cursos_contratados` DISABLE KEYS */;
INSERT INTO `cursos_contratados` VALUES (2,1),(17,1),(35,1),(2,2),(40,2),(17,4),(39,5),(40,5),(35,6),(39,7),(35,8);
/*!40000 ALTER TABLE `cursos_contratados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `avatar` varchar(250) NOT NULL DEFAULT 'avatar7.png',
  `sexo` varchar(1) NOT NULL DEFAULT 'h',
  PRIMARY KEY (`id`),
  UNIQUE KEY `persona_UN` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (2,'Lorena','avatar2.png','m'),(17,'Alba','avatar5.png','m'),(24,'Manolo','avatar6.png','h'),(35,'Pedro','avatar7.png','h'),(39,'Marisa','avatar5.png','m'),(40,'Rebeca','avatar2.png','m'),(44,'Mario','avatar4.png','h');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-20 11:35:29

/*  CUSTOM SQL */

/*
SELECT 
	p.id as persona_id, 
	p.nombre as persona_nombre, 
	p.avatar as persona_avatar, 
	p.sexo as persona_sexo, 
	c.id as curso_id, 
	c.nombre as curso_nombre, 
	c.imagen as curso_imagen, 
	c.precio as curso_precio
FROM (persona p 
LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona)
LEFT JOIN curso c ON cc.id_curso = c.id
LIMIT 500;
*/


