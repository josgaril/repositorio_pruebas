CREATE DATABASE  IF NOT EXISTS `alumnos3_0` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `alumnos3_0`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: alumnos3_0
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(250) NOT NULL DEFAULT 'curso.png',
  `precio` decimal(6,2) NOT NULL,
  `profesor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `curso_UN` (`nombre`),
  KEY `curso-profesor_FK_idx` (`profesor`),
  CONSTRAINT `curso-profesor_FK` FOREIGN KEY (`profesor`) REFERENCES `persona` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Programación con JAVA','Java.png',999.00,35),(2,'Programación páginas web JavaScript','JavaScript.png',999.00,35),(3,'Microsoft Excel 2010 (Completo)','Excel 2010.png',335.00,51),(4,'Microsoft Excel 2016 (Básico)','Excel 2016.png',155.00,51),(5,'Google Drive','Google Drive.png',80.00,51),(6,'Outlook 2013','Outlook 2013.png',50.00,35),(7,'Photoshop CC','Photoshop CC.png',150.00,35),(8,'Windows Phone 8','Windows Phone 8.png',100.00,35),(9,'Introducción a la informática','Introducción a la informática.png',95.00,51),(10,'Linux Ubuntu 6.06 Básico','Linux Ubuntu 6.06 Básico.png',180.00,35),(11,'HTML5','Html5.png',300.00,NULL),(12,'Word Profesional (2019)','Word Profesional (2019).png',100.00,2),(13,'Seguridad informática','Seguridad informática.png',150.00,NULL),(14,'Windows 10','Windows 10.png',315.00,2),(16,'AutoCAD 2009','AutoCAD 2009.png',300.00,54);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos_contratados`
--

DROP TABLE IF EXISTS `cursos_contratados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos_contratados` (
  `id_persona` int NOT NULL,
  `id_curso` int NOT NULL,
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
INSERT INTO `cursos_contratados` VALUES (17,2),(39,2),(43,3),(39,6),(24,9),(39,9),(43,9),(53,9),(24,10),(39,10),(43,10),(17,14),(39,14),(53,14),(55,14),(17,16),(24,16),(39,16),(43,16),(48,16);
/*!40000 ALTER TABLE `cursos_contratados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticia`
--

DROP TABLE IF EXISTS `noticia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenido` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `noticia_UN` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticia`
--

LOCK TABLES `noticia` WRITE;
/*!40000 ALTER TABLE `noticia` DISABLE KEYS */;
INSERT INTO `noticia` VALUES (1,'Se reanudan las clases','2020-04-23 14:00:00','Las clases se reanudarán el prómimo 11 de mayo.'),(2,'Vuelve el futbol','2020-04-24 00:00:00','Se prevee que los equipos puedan volver a los entrenamientos el próximo 1 de Mayo'),(3,'Los Rolling en España','2020-04-24 00:05:00','Se dice se comenta que los Rolling Stones podrían reunirse en España cuando acabe el confinamiento para decidir qsi harán su última función'),(4,'Bilbao sin contagiados','2020-04-24 00:08:00','El gobierno indica que Bilbao es la primera ciudad en la que no hay contagiados por el virus'),(6,'Oficial: el Gobierno de Francia confirma la suspensión definitiva de la Ligue 1','2020-04-28 17:30:00','<div class=\"row content cols-30-70\"><figure class=\"multimedia-item image\"><img src=\"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/04/28/15880811359102.jpg\" class=\"full-image img-fluid\" alt=\"Futbol Francia Suspendida Ligue 1 Liga Francesa\"><figcaption class=\"caption\"><i class=\"icon-caption-photo\"></i>Panorámica del Parque de los Príncipes. <br></figcaption></figure><div class=\"secondary-column\"><aside class=\"aside-tools byline-tools\"><div class=\"aside-block content-ad--sticky\"> <a class=\"language-tools\" href=\"https://www.marca.com/en/football/international-football/2020/04/28/5ea84135ca4741781f8b458e.html\" lang=\"en\"><i class=\"icon-english\"></i> In English </a><a href=\"#\" class=\"comments-btn js-comentar-5ea8329a22601d59028b45b0\"><span class=\"left\"><i class=\"icon-comments_24x20_a\"></i><strong>343</strong></span><span class=\"hidden-content\"> comentarios</span><span class=\"right\"><strong>Comentar</strong><i class=\"icon-forward_8x16_a\"></i></span></a><div class=\"content-ad\"><div class=\"ad-item-300 ue-c-ad--label\"><div id=\"div-gpt-ad-futbol_liga-francesa_n_r_5ea8329a22601d59028b45b0\" class=\"ad-item\"><script type=\"text/javascript\">googletag.cmd.push(function(){googletag.display(\'div-gpt-ad-futbol_liga-francesa_n_r_5ea8329a22601d59028b45b0\');});</script></div></div></div></div></aside><aside class=\"publicidad mod-multipurpose end-fixed\"><h3 class=\"list-header\"><span>TE PUEDE INTERESAR</span></h3><div id=\"div-gpt-ad-futbol_liga-francesa_n_nata_5ea8329a22601d59028b45b0\" class=\"ad-item\"><script type=\"text/javascript\">googletag.cmd.push(function(){googletag.display(\'div-gpt-ad-futbol_liga-francesa_n_nata_5ea8329a22601d59028b45b0\');});</script></div><div class=\"dotted-divider\"></div><div id=\"div-gpt-ad-futbol_liga-francesa_n_natb_5ea8329a22601d59028b45b0\" class=\"ad-item\"><script type=\"text/javascript\">googletag.cmd.push(function(){googletag.display(\'div-gpt-ad-futbol_liga-francesa_n_natb_5ea8329a22601d59028b45b0\');});</script></div></aside></div><aside class=\"content-ad\"><div class=\"ad-item-660 ue-c-ad--label\"><div id=\"div-gpt-ad-futbol_liga-francesa_n_660x50_5ea8329a22601d59028b45b0\" class=\"ad-item\"><script type=\"text/javascript\">googletag.cmd.push(function(){googletag.display(\'div-gpt-ad-futbol_liga-francesa_n_660x50_5ea8329a22601d59028b45b0\');});</script></div></div></aside><p><strong>La temporada de la Ligue 1 está terminada</strong>. El primer ministro Edouard Philippe anunció en su discurso ante la Asamblea Nacional de este martes por la tarde que no habrá fútbol en Francia hasta septiembre. \"Los eventos que reúnen a más de 5000 participantes (...) no pueden realizarse antes de septiembre\", aseguró Philippe.</p><p>\"Será posible, en días soleados, practicar una actividad deportiva individual al aire libre, respetando las reglas de distanciamiento social.<strong> No será posible ni practicar deporte en lugares cubiertos, ni los deportes de equipo o de contacto\"</strong>, afirmó el primer ministro \'cancelando\' de facto las Ligas de fútbol y de otros deportes colectivos como el rugby.</p><aside class=\"summary-item\"><aside class=\"citas\"><blockquote class=\"summary-cite\">No será posible ni practicar deporte en lugares cubiertos, ni los deportes de equipo o de contacto hasta septiembre\"</blockquote><p class=\"cite-author\">Edouard Philippe, primer ministro de Francia</p></aside></aside><p><strong>El Gobierno anunció el plan de desconfinamiento de Francia (se iniciará a partir del 11 de mayo) y en él el fútbol no podrá reanudarse hasta septiembre al no cumplirse las condiciones sanitarias mínimas para su retorno.</strong> Un plan que choca con la propuesta de la Ligue 1, que esperaba retomar los entrenamientos en mayo y poder jugar a puerta cerrada más adelante, completando sus competiciones en junio y julio. </p><p>Ahora, la Liga y la Federación francesa deberán reunirse para ver qué hacen con los ascensos, descensos, el campeón... y cómo afecta esto a la próxima campaña. <strong>Esta decisión va en la línea de la adoptada por el gobierno holandés</strong>, que prohibió cualquier evento deportivo hasta septiembre, lo que provocó la cancelación de la temporada de la Eredivisie dejando el título desierto, suprimiendo los ascensos y los descensos y confirmando los equipos clasificados para la Champions y la Europa League por su clasificación.</p><script>(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src=\'https://embed.ex.co/sdk.js\';fjs.parentNode.insertBefore(js,fjs);}(document,\'script\',\'playbuzz-sdk\'));</script><div class=\"playbuzz\" data-id=\"d84180db-e82f-4d42-829c-bc7d21c53523\" data-show-share=\"false\" data-show-info=\"false\" data-rendered=\"true\"><iframe allowfullscreen=\"true\" scrolling=\"no\" data-id=\"d84180db-e82f-4d42-829c-bc7d21c53523\" data-show-share=\"false\" data-show-info=\"false\" data-sdk-load-id=\"3625cd55-caa8-4c9d-9833-9657adb6b3dd\" style=\"width: 1px; min-width: 100%; height: 425px; border: 0px;\"></iframe></div><aside class=\"related-tags\"><h3 class=\"list-header\"><span>Temas relacionados</span></h3><ul class=\"item-tags\"><li><a href=\"https://www.marca.com/futbol/liga-francesa.html\" rel=\"tag\">Ligue 1</a></li><li><a href=\"https://www.marca.com/polideportivo/coronavirus.html\" rel=\"tag\">Coronavirus</a></li></ul></aside></div>');
/*!40000 ALTER TABLE `noticia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `avatar` varchar(250) NOT NULL DEFAULT 'avatar7.png',
  `sexo` varchar(1) NOT NULL DEFAULT 'h',
  `rol` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `persona_UN` (`nombre`,`rol`),
  KEY `persona-rol_FK_idx` (`rol`),
  CONSTRAINT `persona-rol_FK` FOREIGN KEY (`rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (2,'Lorena','avatar2.png','m',2),(17,'Alba','avatar5.png','m',1),(24,'Manolo','avatar6.png','h',1),(35,'Pedro','avatar7.png','h',2),(39,'Marisa','avatar1.png','m',1),(40,'Rebeca','avatar5.png','m',2),(43,'Andres','avatar7.png','h',1),(48,'Ramón','avatar6.png','h',1),(51,'Ignacio','avatar3.png','h',2),(53,'Lorena','avatar2.png','m',1),(54,'Andres','avatar4.png','h',2),(55,'Leticia','avatar5.png','m',1),(57,'Monica','avatar1.png','m',2);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'alumno'),(2,'profesor');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'alumnos3_0'
--

--
-- Dumping routines for database 'alumnos3_0'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06 18:53:28
