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

/* --------------------------------user */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `token_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
);

/*------------------------------------order */
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `ship_address` varchar(255) DEFAULT NULL,
  `ship_end` date NOT NULL,
  `ship_start` date NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK787ibr3guwp6xobrpbofnv7le` (`product_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK787ibr3guwp6xobrpbofnv7le` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

/* --------------------------------review */

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `comment` TEXT NOT NULL,
  `score` INT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `date` DATETIME NOT NULL,
  `product_id` BIGINT NOT NULL,
  `order_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);

/* --------------------------------favorite */
DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
    `id` bigint AUTO_INCREMENT PRIMARY KEY,
    `user_id` bigint NOT NULL,
    `product_id` bigint NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

