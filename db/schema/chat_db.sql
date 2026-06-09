-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: chat_db
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_keywords`
--

DROP TABLE IF EXISTS `chat_keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_keywords` (
  `keyword_no` bigint NOT NULL AUTO_INCREMENT COMMENT '키워드 번호 (PK)',
  `keyword` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '찾을 키워드',
  `response` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '출력하거나 참고할 텍스트',
  `mode` enum('fixed','reference') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fixed' COMMENT 'fixed=고정출력 reference=참고자료',
  `priority` int NOT NULL DEFAULT '0' COMMENT '우선순위 (클수록 먼저 검사)',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '사용 여부 (1=사용 0=중지)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`keyword_no`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='챗봇 키워드 자동응답 목록';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_keywords`
--

LOCK TABLES `chat_keywords` WRITE;
/*!40000 ALTER TABLE `chat_keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `message_no` bigint NOT NULL AUTO_INCREMENT COMMENT '메시지 번호 (PK)',
  `session_no` bigint NOT NULL COMMENT '소속 세션 (FK)',
  `role` enum('user','assistant') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '발화자 (Claude API role)',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '메시지 내용',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '발화 시각',
  PRIMARY KEY (`message_no`),
  KEY `idx_chat_messages_session` (`session_no`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='챗봇 대화 메시지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_sessions`
--

DROP TABLE IF EXISTS `chat_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_sessions` (
  `session_no` bigint NOT NULL AUTO_INCREMENT COMMENT '세션 번호 (PK)',
  `user_no` bigint NOT NULL COMMENT '사용자 (FK)',
  `last_message_at` datetime DEFAULT NULL COMMENT '마지막 메시지 시각 (이어보기용)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '세션 시작 시각',
  PRIMARY KEY (`session_no`),
  KEY `idx_chat_sessions_user_last` (`user_no`,`last_message_at`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='챗봇 대화 세션';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_sessions`
--

LOCK TABLES `chat_sessions` WRITE;
/*!40000 ALTER TABLE `chat_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'chat_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-09  3:00:02
