-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: ai_db
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
-- Table structure for table `cctvs`
--

DROP TABLE IF EXISTS `cctvs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cctvs` (
  `cctv_no` bigint NOT NULL AUTO_INCREMENT COMMENT 'CCTV 번호 (PK)',
  `its_cctv_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ITS API의 CCTV 식별자',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'CCTV 명칭/위치',
  `alias` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '관리자가 지정한 별칭',
  `stream_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'CCTV 스트림 URL',
  `latitude` decimal(10,7) DEFAULT NULL COMMENT '위도',
  `longitude` decimal(10,7) DEFAULT NULL COMMENT '경도',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '사용 여부 (1=사용, 0=중지)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`cctv_no`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CCTV 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cctvs`
--

LOCK TABLES `cctvs` WRITE;
/*!40000 ALTER TABLE `cctvs` DISABLE KEYS */;
/*!40000 ALTER TABLE `cctvs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detections`
--

DROP TABLE IF EXISTS `detections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detections` (
  `detection_no` bigint NOT NULL AUTO_INCREMENT COMMENT '감지 번호 (PK)',
  `cctv_no` bigint NOT NULL COMMENT '감지된 CCTV (FK)',
  `class_no` bigint NOT NULL COMMENT '감지된 클래스 (FK)',
  `confidence` decimal(5,4) NOT NULL COMMENT '모델 신뢰도 (0.0000~1.0000)',
  `image_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '캡처 이미지 파일 경로',
  `detected_at` datetime NOT NULL COMMENT '감지 시각',
  `status` enum('UNREAD','CONFIRMED','DISMISSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UNREAD' COMMENT '처리 상태',
  `handled_by` bigint DEFAULT NULL COMMENT '처리한 관리자 (FK)',
  `handled_at` datetime DEFAULT NULL COMMENT '처리 시각',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '기록 생성 시각',
  PRIMARY KEY (`detection_no`),
  KEY `idx_detections_detected_at` (`detected_at`),
  KEY `idx_detections_cctv` (`cctv_no`,`detected_at`),
  KEY `fk_detections_class` (`class_no`),
  KEY `fk_detections_handler` (`handled_by`)
) ENGINE=InnoDB AUTO_INCREMENT=2608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 감지 기록 및 알림';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detections`
--

LOCK TABLES `detections` WRITE;
/*!40000 ALTER TABLE `detections` DISABLE KEYS */;
/*!40000 ALTER TABLE `detections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detections_backup_20260601_dedup`
--

DROP TABLE IF EXISTS `detections_backup_20260601_dedup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detections_backup_20260601_dedup` (
  `detection_no` bigint NOT NULL AUTO_INCREMENT COMMENT '감지 번호 (PK)',
  `cctv_no` bigint NOT NULL COMMENT '감지된 CCTV (FK)',
  `class_no` bigint NOT NULL COMMENT '감지된 클래스 (FK)',
  `confidence` decimal(5,4) NOT NULL COMMENT '모델 신뢰도 (0.0000~1.0000)',
  `image_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '캡처 이미지 파일 경로',
  `detected_at` datetime NOT NULL COMMENT '감지 시각',
  `status` enum('UNREAD','CONFIRMED','DISMISSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UNREAD' COMMENT '처리 상태',
  `handled_by` bigint DEFAULT NULL COMMENT '처리한 관리자 (FK)',
  `handled_at` datetime DEFAULT NULL COMMENT '처리 시각',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '기록 생성 시각',
  PRIMARY KEY (`detection_no`),
  KEY `idx_detections_detected_at` (`detected_at`),
  KEY `idx_detections_cctv` (`cctv_no`,`detected_at`),
  KEY `fk_detections_class` (`class_no`),
  KEY `fk_detections_handler` (`handled_by`)
) ENGINE=InnoDB AUTO_INCREMENT=485 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 감지 기록 및 알림';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detections_backup_20260601_dedup`
--

LOCK TABLES `detections_backup_20260601_dedup` WRITE;
/*!40000 ALTER TABLE `detections_backup_20260601_dedup` DISABLE KEYS */;
/*!40000 ALTER TABLE `detections_backup_20260601_dedup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forbidden_classes`
--

DROP TABLE IF EXISTS `forbidden_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forbidden_classes` (
  `class_no` bigint NOT NULL AUTO_INCREMENT COMMENT '클래스 번호 (PK)',
  `class_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '모델 출력 클래스명 (예: pedestrian)',
  `display_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '화면 표시명 (예: 보행자)',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '감지 사용 여부',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  PRIMARY KEY (`class_no`),
  UNIQUE KEY `uk_forbidden_classes_name` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='고속도로 진입 금지 객체 클래스';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forbidden_classes`
--

LOCK TABLES `forbidden_classes` WRITE;
/*!40000 ALTER TABLE `forbidden_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `forbidden_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_versions`
--

DROP TABLE IF EXISTS `model_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_versions` (
  `version_no` bigint NOT NULL AUTO_INCREMENT COMMENT '버전 번호 (PK)',
  `model_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '모델명 (예: yolov8-roadeye)',
  `version` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '버전 (예: v1.0.0)',
  `trained_at` date NOT NULL COMMENT '학습 완료일',
  `precision_score` decimal(5,4) DEFAULT NULL COMMENT 'Precision (정밀도)',
  `recall_score` decimal(5,4) DEFAULT NULL COMMENT 'Recall (재현율)',
  `map_score` decimal(5,4) DEFAULT NULL COMMENT 'mAP (평균 정밀도)',
  `model_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '모델 가중치 파일 경로',
  `notes` text COLLATE utf8mb4_unicode_ci COMMENT '비고 (변경점, 학습 조건 등)',
  `is_active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '현재 서비스 중인 모델 여부',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  PRIMARY KEY (`version_no`),
  UNIQUE KEY `uk_model_versions` (`model_name`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 모델 버전 및 성능';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_versions`
--

LOCK TABLES `model_versions` WRITE;
/*!40000 ALTER TABLE `model_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ai_db'
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
