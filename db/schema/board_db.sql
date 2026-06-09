-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: board_db
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
-- Table structure for table `archive_attachments`
--

DROP TABLE IF EXISTS `archive_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_attachments` (
  `attachment_no` bigint NOT NULL AUTO_INCREMENT COMMENT '첨부 번호 (PK)',
  `archive_no` bigint NOT NULL COMMENT '자료실 글 (FK)',
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '원본 파일명',
  `stored_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '서버 저장 경로',
  `file_size` bigint NOT NULL COMMENT '파일 크기 (바이트)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '업로드 일시',
  PRIMARY KEY (`attachment_no`),
  KEY `idx_archive_attachments_archive` (`archive_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='자료실 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_attachments`
--

LOCK TABLES `archive_attachments` WRITE;
/*!40000 ALTER TABLE `archive_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `archive_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archives`
--

DROP TABLE IF EXISTS `archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archives` (
  `archive_no` bigint NOT NULL AUTO_INCREMENT COMMENT '자료 번호 (PK)',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '제목',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '내용',
  `view_count` int NOT NULL DEFAULT '0' COMMENT '조회수',
  `author_no` bigint NOT NULL COMMENT '작성자 (FK)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`archive_no`),
  KEY `fk_archives_author` (`author_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='자료실 게시글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archives`
--

LOCK TABLES `archives` WRITE;
/*!40000 ALTER TABLE `archives` DISABLE KEYS */;
/*!40000 ALTER TABLE `archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `faq_no` bigint NOT NULL AUTO_INCREMENT COMMENT 'FAQ 번호 (PK)',
  `question` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '질문',
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '답변',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '표시 순서 (작을수록 위)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`faq_no`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='자주 묻는 질문';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `inquiry_no` bigint NOT NULL AUTO_INCREMENT COMMENT '문의 번호 (PK)',
  `user_no` bigint NOT NULL COMMENT '문의 작성자 (FK)',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '제목',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '문의 내용',
  `answer` text COLLATE utf8mb4_unicode_ci COMMENT '관리자 답변',
  `answered_by` bigint DEFAULT NULL COMMENT '답변한 관리자 (FK)',
  `answered_at` datetime DEFAULT NULL COMMENT '답변 일시',
  `status` enum('PENDING','ANSWERED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING' COMMENT '처리 상태',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '문의 일시',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`inquiry_no`),
  KEY `fk_inquiries_user` (`user_no`),
  KEY `fk_inquiries_answerer` (`answered_by`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1:1 문의';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiry_attachments`
--

DROP TABLE IF EXISTS `inquiry_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiry_attachments` (
  `attachment_no` bigint NOT NULL AUTO_INCREMENT COMMENT '첨부 번호 (PK)',
  `inquiry_no` bigint NOT NULL COMMENT '1:1 문의 글 (FK)',
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '원본 파일명',
  `stored_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '서버 저장 경로',
  `file_size` bigint NOT NULL COMMENT '파일 크기 (바이트)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '업로드 일시',
  PRIMARY KEY (`attachment_no`),
  KEY `idx_inquiry_attachments_inquiry` (`inquiry_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1:1 문의 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiry_attachments`
--

LOCK TABLES `inquiry_attachments` WRITE;
/*!40000 ALTER TABLE `inquiry_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiry_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `notice_no` bigint NOT NULL AUTO_INCREMENT COMMENT '공지 번호 (PK)',
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '제목',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '내용',
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0' COMMENT '상단 고정 여부',
  `view_count` int NOT NULL DEFAULT '0' COMMENT '조회수',
  `author_no` bigint NOT NULL COMMENT '작성자 (관리자, FK)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`notice_no`),
  KEY `fk_notices_author` (`author_no`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='공지사항';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'board_db'
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
