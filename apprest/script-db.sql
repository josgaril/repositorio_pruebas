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
INSERT INTO `curso` VALUES (1,'Programación con JAVA','Java.png',2750.00),(2,'Programación páginas web JavaScript','JavaScript.png',2399.99),(3,'MicrosoftMicrosoft Excel 2010 (Completo) Office 2016','Default.png',334.50),(4,'Excel 2016 Avanzado','Default.png',153.50),(5,'Google Drive','Default.png',79.99),(6,'Outlook 2013','Default.png',49.99),(7,'Photoshop CC','Default.png',150.00),(8,'Windows Phone 8','Default.png',99.99),(9,'Introducción a la informática','Default.png',95.00),(10,'Linux Ubuntu 6.06 Básico','Default.png',180.00),(11,'HTML5','Html5.png',300.00),(12,'Office 365: Word Profesional (2019)','Default.png',100.00),(13,'Seguridad informática','Default.png',150.00),(14,'Windows 10','Windows 10.png',315.00),(16,'AutoCAD 2009','Default.png',300.99);
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
INSERT INTO `cursos_contratados` VALUES (17,2),(17,4),(17,5),(35,7),(40,8),(2,11),(2,12),(17,13),(35,13),(39,13),(2,14),(17,14),(2,16),(17,16),(24,16),(35,16),(39,16);
/*!40000 ALTER TABLE `cursos_contratados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticia`
--

DROP TABLE IF EXISTS `noticia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenido` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `noticia_UN` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticia`
--

LOCK TABLES `noticia` WRITE;
/*!40000 ALTER TABLE `noticia` DISABLE KEYS */;
INSERT INTO `noticia` VALUES (1,'Se reanudan las clases','2020-04-23 14:00:00','Las clases se reanudarán el prómimo 11 de mayo.'),(2,'Vuelve el futbol','2020-04-24 00:00:00','Se prevee que los equipos puedan volver a los entrenamientos el próximo 1 de Mayo'),(3,'Los Rolling en España','2020-04-24 00:05:00','Se dice se comenta que los Rolling Stones podrían reunirse en España cuando acabe el confinamiento para decidir qsi harán su última función'),(4,'Bilbao sin contagiados','2020-04-24 00:08:00','El gobierno indica que Bilbao es la primera ciudad en la que no hay contagiados por el virus');
/*!40000 ALTER TABLE `noticia` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (2,'Lorena','avatar2.png','m'),(17,'Alba','avatar5.png','m'),(24,'Manolo','avatar6.png','h'),(35,'Pedro','avatar7.png','h'),(39,'Marisa','avatar5.png','m'),(40,'Rebeca','avatar2.png','m');
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

-- Dump completed on 2020-04-24  9:33:53
