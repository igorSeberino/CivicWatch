CREATE DATABASE  IF NOT EXISTS `civic_watch` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `civic_watch`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: civic_watch
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `proposta_id` int DEFAULT NULL,
  `nota` int DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`proposta_id`),
  KEY `proposta_id` (`proposta_id`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`proposta_id`) REFERENCES `propostas` (`id`),
  CONSTRAINT `avaliacoes_chk_1` CHECK ((`nota` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,1,20,3,'2025-07-07 18:50:50'),(2,1,19,5,'2025-07-07 18:51:45'),(3,1,22,1,'2025-07-07 18:54:20'),(4,4,23,3,'2025-07-07 19:34:35'),(5,4,25,3,'2025-07-07 19:34:39'),(6,4,19,5,'2025-07-07 19:34:43'),(7,4,20,1,'2025-07-07 19:34:46'),(8,4,21,5,'2025-07-07 19:34:49'),(9,4,22,3,'2025-07-07 19:34:52'),(10,4,26,3,'2025-07-07 19:34:55'),(11,6,28,4,'2025-07-07 20:10:27'),(12,6,20,5,'2025-07-07 20:10:27'),(13,7,30,3,'2025-07-07 20:10:27'),(14,8,29,2,'2025-07-07 20:10:27'),(15,8,26,5,'2025-07-07 20:10:27'),(16,7,19,4,'2025-07-07 20:10:27'),(17,2,30,5,'2025-07-07 20:10:27'),(18,2,25,3,'2025-07-07 20:10:27');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_politicos`
--

DROP TABLE IF EXISTS `categorias_politicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_politicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_politicos`
--

LOCK TABLES `categorias_politicos` WRITE;
/*!40000 ALTER TABLE `categorias_politicos` DISABLE KEYS */;
INSERT INTO `categorias_politicos` VALUES (1,'Deputado Federal'),(2,'Prefeito'),(4,'Presidente'),(3,'Senador'),(5,'Vice Prefeito');
/*!40000 ALTER TABLE `categorias_politicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `proposta_id` int DEFAULT NULL,
  `texto` text NOT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `proposta_id` (`proposta_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`proposta_id`) REFERENCES `propostas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (6,1,19,'Bacana isso aqui','2025-07-04 21:59:40'),(7,1,22,'teste','2025-07-04 22:08:48'),(10,6,28,'Ótima iniciativa para mais transparência!','2025-07-07 20:10:27'),(11,7,30,'Excelente proposta para o meio ambiente.','2025-07-07 20:10:27'),(12,8,29,'Adorei a ideia, leitura transforma vidas.','2025-07-07 20:10:28'),(13,2,19,'Já passou da hora de algo assim ser feito.','2025-07-07 20:10:28'),(14,8,20,'Precisamos mesmo de mais educação técnica.','2025-07-07 20:10:28'),(15,4,29,'Voluptatum in culpa rerum tempora molestias maiores facilis.','2025-07-07 20:14:16'),(16,7,25,'Quo quo natus nam hic sapiente enim.','2025-07-07 20:14:16'),(17,6,29,'Doloribus praesentium possimus blanditiis id alias officiis facilis neque sequi nam cum.','2025-07-07 20:14:16'),(18,8,27,'Voluptatum consequatur iure mollitia fuga inventore nisi ut.','2025-07-07 20:14:16'),(19,4,21,'Labore nihil consequuntur delectus amet labore numquam deserunt delectus debitis.','2025-07-07 20:14:16'),(20,7,24,'Rerum qui commodi quibusdam in asperiores expedita molestias nam possimus.','2025-07-07 20:14:16'),(21,4,26,'Officia alias error eaque.','2025-07-07 20:14:16'),(22,2,25,'Vitae itaque est ut autem culpa hic porro.','2025-07-07 20:14:16'),(23,2,30,'Doloribus itaque molestiae aperiam vitae maiores facilis.','2025-07-07 20:14:16'),(24,4,25,'Cupiditate at eaque odit.','2025-07-07 20:14:16'),(25,6,20,'Quae veniam sit magnam autem eum libero quod nihil veritatis vero repellat.','2025-07-07 20:14:16'),(26,8,23,'Consequuntur iusto a doloremque eveniet quisquam pariatur.','2025-07-07 20:14:16'),(27,4,20,'Laboriosam nam voluptatem quos dicta explicabo reprehenderit.','2025-07-07 20:14:16'),(28,7,21,'Molestias aliquid nobis sapiente neque.','2025-07-07 20:14:16'),(29,2,23,'Accusamus esse error modi ab sint in.','2025-07-07 20:14:16'),(30,4,25,'Asperiores aperiam ratione officia.','2025-07-07 20:14:16'),(31,4,23,'Ab rerum voluptates eum provident saepe amet tempore.','2025-07-07 20:14:16'),(32,2,23,'Perferendis hic sequi sit dolorum facere odit dignissimos.','2025-07-07 20:14:16'),(33,7,26,'Adipisci velit illum dolorum quaerat deserunt.','2025-07-07 20:14:16'),(34,4,19,'Laboriosam dicta iure iusto nisi ducimus nihil similique velit.','2025-07-07 20:14:16'),(35,2,20,'Odio saepe expedita velit illum unde.','2025-07-07 20:14:16'),(36,8,20,'Quam dolorem fugiat ab expedita tempore porro iusto dolores.','2025-07-07 20:14:16'),(37,7,22,'Nostrum neque soluta mollitia deserunt ipsa unde.','2025-07-07 20:14:16'),(38,2,22,'Atque natus numquam deleniti.','2025-07-07 20:14:16'),(39,2,25,'Laudantium debitis voluptate similique esse ullam consequatur minima a libero.','2025-07-07 20:14:16'),(40,2,30,'Quia dolor inventore soluta sunt inventore excepturi.','2025-07-07 20:14:16'),(41,7,30,'Fuga quisquam earum distinctio cum dignissimos nam eveniet.','2025-07-07 20:14:16'),(42,6,23,'A natus optio quasi expedita quibusdam ullam omnis ratione.','2025-07-07 20:14:16'),(43,6,23,'Minima error animi aliquid eos laudantium modi quo quas laboriosam quis.','2025-07-07 20:14:16'),(44,7,29,'Error ipsam ipsam veniam veniam at voluptate illum.','2025-07-07 20:14:16'),(45,6,28,'Inventore adipisci quae ratione.','2025-07-07 20:14:16'),(46,1,24,'Modi repudiandae provident voluptatum atque dolore temporibus distinctio esse maiores iure nobis pariatur.','2025-07-07 20:14:16'),(47,8,30,'Saepe ut necessitatibus repellendus vel at rem.','2025-07-07 20:14:16'),(48,6,27,'Minus perspiciatis quidem cupiditate ipsa a perferendis.','2025-07-07 20:14:16'),(49,1,26,'Dignissimos vel minus ea soluta nobis ipsam.','2025-07-07 20:14:16'),(50,7,28,'Debitis eligendi laborum in consequuntur.','2025-07-07 20:14:16'),(51,6,22,'Fugiat repellat ullam suscipit provident magni blanditiis esse nesciunt asperiores magni nemo.','2025-07-07 20:14:16'),(52,2,22,'Eaque odit earum voluptatem temporibus quaerat vel delectus repellat iusto dolore laborum facilis.','2025-07-07 20:14:16'),(53,4,28,'Deleniti corrupti aut quisquam facilis laudantium.','2025-07-07 20:14:16'),(54,7,19,'In quo pariatur nihil laborum ipsum necessitatibus asperiores odio beatae aliquam facere labore officia ullam.','2025-07-07 20:14:16'),(55,4,27,'Natus rem voluptas pariatur labore nesciunt provident tenetur sit sit ea quaerat illum accusamus.','2025-07-07 20:14:16'),(56,6,19,'Nostrum commodi nisi repellat repellat esse eos id qui natus porro ipsum animi.','2025-07-07 20:14:16'),(57,2,25,'Atque numquam a placeat quisquam recusandae error quibusdam in voluptate.','2025-07-07 20:14:16'),(58,7,29,'Aut architecto deleniti odio unde minus excepturi recusandae debitis.','2025-07-07 20:14:16'),(59,1,28,'Quibusdam est neque cum debitis repellendus cum ex laborum voluptatem laboriosam.','2025-07-07 20:14:16'),(60,4,30,'Rem quam sequi possimus tenetur.','2025-07-07 20:14:16'),(61,4,30,'Iste a doloribus nostrum officia.','2025-07-07 20:14:16'),(62,2,23,'Eaque error tempore adipisci inventore possimus quod harum cupiditate odio porro.','2025-07-07 20:14:16'),(63,2,28,'Distinctio veniam in.','2025-07-07 20:14:16'),(64,8,30,'Nemo nisi a ducimus nisi in doloremque exercitationem sed.','2025-07-07 20:14:16');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `politico_id` int DEFAULT NULL,
  `proposta_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`politico_id`,`proposta_id`),
  KEY `politico_id` (`politico_id`),
  KEY `proposta_id` (`proposta_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`politico_id`) REFERENCES `politicos` (`id`),
  CONSTRAINT `favoritos_ibfk_3` FOREIGN KEY (`proposta_id`) REFERENCES `propostas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (28,1,NULL,19),(26,1,NULL,21),(9,1,NULL,26),(25,1,1,NULL),(52,1,1,NULL),(29,1,2,NULL),(40,1,2,NULL),(27,1,3,NULL),(45,1,4,NULL),(51,1,4,NULL),(53,1,7,NULL),(41,2,NULL,26),(42,2,8,NULL),(59,4,NULL,22),(30,4,NULL,23),(33,4,2,NULL),(32,4,3,NULL),(46,4,3,NULL),(55,4,3,NULL),(56,4,8,NULL),(44,6,NULL,20),(48,6,NULL,23),(34,6,NULL,28),(57,6,1,NULL),(50,6,3,NULL),(43,6,5,NULL),(35,6,6,NULL),(47,7,NULL,20),(36,7,NULL,30),(54,7,5,NULL),(37,7,8,NULL),(49,8,NULL,26),(38,8,NULL,29),(58,8,NULL,29),(39,8,7,NULL);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `politicos`
--

DROP TABLE IF EXISTS `politicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `politicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `partido` varchar(50) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `politicos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_politicos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `politicos`
--

LOCK TABLES `politicos` WRITE;
/*!40000 ALTER TABLE `politicos` DISABLE KEYS */;
INSERT INTO `politicos` VALUES (1,'Ana Silva','Partido Verde','SP','São Paulo',1),(2,'Carlos Pereira','Partido Trabalhista','RJ','Rio de Janeiro',2),(3,'Maria Fernandes','Partido Democrático','MG','Belo Horizonte',3),(4,'José da Silva Cunha','Partido Verde','SC','Joinville',3),(5,'Carlos Pereira','Partido Democrático','MG','Belo Horizonte',1),(6,'Paulo Nogueira','Partido da Inovação','RS','Porto Alegre',2),(7,'Fernanda Lima','Partido Popular','BA','Salvador',5),(8,'Renato Alves','Partido Social','PE','Recife',1);
/*!40000 ALTER TABLE `politicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propostas`
--

DROP TABLE IF EXISTS `propostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propostas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `politico_id` int DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_politico` (`politico_id`),
  CONSTRAINT `fk_politico` FOREIGN KEY (`politico_id`) REFERENCES `politicos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propostas`
--

LOCK TABLES `propostas` WRITE;
/*!40000 ALTER TABLE `propostas` DISABLE KEYS */;
INSERT INTO `propostas` VALUES (19,'Incentivo à Energia Solar','Implementar um programa nacional de incentivo à instalação de painéis solares residenciais, oferecendo subsídios e linhas de crédito facilitadas para famílias de baixa e média renda, visando reduzir o custo da energia elétrica e incentivar a sustentabilidade.',1,'2025-06-06 14:56:27'),(20,'Educação Técnica','Criar e ampliar leis que promovam o acesso à educação técnica e profissionalizante em escolas públicas, com foco em cursos alinhados às demandas do mercado de trabalho, preparando jovens para empregos qualificados e fomentando o desenvolvimento econômico regional.',1,'2025-06-06 14:56:27'),(21,'Combate à Violência contra a Mulher','Estabelecer políticas públicas mais robustas de combate à violência contra a mulher, destinando mais recursos para delegacias especializadas, além de campanhas educativas e centros de apoio psicológico e social para vítimas, garantindo proteção e acolhimento.',1,'2025-06-06 14:56:27'),(22,'Ciclovias Sustentáveis','Construir e ampliar uma rede de ciclovias seguras em toda a cidade para incentivar o uso da bicicleta como meio de transporte sustentável, promovendo a saúde, reduzindo o trânsito e a poluição urbana.',2,'2025-06-06 14:56:27'),(23,'Coleta Seletiva','Implantar sistemas eficientes de coleta seletiva de lixo em todos os bairros, com campanhas de conscientização para a população e investimento em infraestrutura adequada para aumentar significativamente a reciclagem e diminuir o volume de resíduos enviados a aterros.',2,'2025-06-06 14:56:27'),(24,'Melhoria da Saúde Pública','Ampliar e modernizar a infraestrutura dos postos de saúde, reduzindo filas e tempo de espera, além de investir em capacitação de profissionais para garantir atendimento básico de qualidade à população.',2,'2025-06-06 14:56:27'),(25,'Reforma Tributária','Propor uma reforma tributária que simplifique o sistema e alivie a carga fiscal sobre pequenas empresas, incentivando o empreendedorismo, gerando empregos e fortalecendo a economia local.',3,'2025-06-06 14:56:27'),(26,'Agricultura Familiar','Criar programas de apoio e incentivo à agricultura familiar sustentável, com linhas de crédito, assistência técnica e acesso a mercados, promovendo a segurança alimentar e a preservação ambiental.',3,'2025-06-06 14:56:27'),(27,'Proteção ao Meio Ambiente','Fortalecer as políticas ambientais com fiscalização rigorosa contra o desmatamento ilegal, ampliação de unidades de conservação e incentivo a práticas sustentáveis, visando preservar os recursos naturais para as futuras gerações.',3,'2025-06-06 14:56:27'),(28,'Transparência Pública Digital','Criar um portal com acesso a dados públicos em tempo real.',6,'2025-07-07 20:10:27'),(29,'Incentivo à Leitura nas Escolas','Distribuir livros e promover clubes de leitura escolares.',7,'2025-07-07 20:10:27'),(30,'Redução de Impostos Verdes','Criar políticas fiscais que favoreçam empresas sustentáveis.',8,'2025-07-07 20:10:27');
/*!40000 ALTER TABLE `propostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('usuario','admin') DEFAULT 'usuario',
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chico','chico@gmail.com','chico','usuario','2025-06-06 14:03:21'),(2,'Adrian','adrian@gmail.com','adrian','usuario','2025-06-06 14:03:21'),(4,'teste','teste@gmail.com','teste','admin','2025-06-30 18:31:59'),(6,'Laura Gomes','laura@gmail.com','laura123','usuario','2025-07-07 20:10:27'),(7,'Bruno Rocha','bruno@gmail.com','bruno123','usuario','2025-07-07 20:10:27'),(8,'Marina Dias','marina@gmail.com','marina123','usuario','2025-07-07 20:10:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07 17:17:05
