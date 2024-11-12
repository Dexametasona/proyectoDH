/* --------------------------------category */
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `photo_Url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* -----------------------------tag */
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* -------------------------------product */
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) DEFAULT NULL,
  `description` text,
  `name` varchar(100) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status` enum('AVAILABLE', 'BOOKED', 'MAINTENANCE') DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKskejd8b65v9fd1d68tdsob9ck` (`tag_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKskejd8b65v9fd1d68tdsob9ck` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
);

/* --------------------------------photo */
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8hs00tlacip0319kutudailre` (`product_id`),
  CONSTRAINT `FK8hs00tlacip0319kutudailre` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);
