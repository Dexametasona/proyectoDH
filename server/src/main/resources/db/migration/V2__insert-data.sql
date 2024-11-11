/* --------------------------------category */
INSERT INTO
  `category`
VALUES
  (1, 'Juegos de Dardos'),
(2, 'Juegos de Tiro al Blanco'),
(3, 'Simuladores'),
(4, 'Juegos de Agua'),
(5, 'Juegos de Fuerza'),
(6, 'Juegos de Lanzamiento'),
(7, 'Juegos de Habilidad'),
(8, 'Juegos Infantiles'),
(9, 'Juegos de Competencia');

/* -----------------------------tag */
INSERT INTO
  `tag`
VALUES
  (1, 'Dardos'),
(2, 'Tiro al Blanco'),
(3, 'Mecánico'),
(4, 'Digital'),
(5, 'Acuático'),
(6, 'Interactivo'),
(7, 'Luces LED'),
(8, 'Pesca'),
(9, 'Pistolas de Agua'),
(10, 'Anillos'),
(11, 'Diana'),
(12, 'Desafíos'),
(13, 'Competitivo'),
(14, 'Fiesta'),
(15, 'Tradicional'),
(16, 'Avanzado'),
(17, 'Básico'),
(18, 'Colores'),
(19, 'Familia'),
(20, 'Movible'),
(21, 'Sensorial'),
(22, 'Multijugador');

/* -------------------------------product */
INSERT INTO `product`
VALUES
  (1, 'CarnivalPro', 'Juego de lanzar dardos con tablero de precisión', 'Lanza Dardos Verde', 100, 'AVAILABLE', 1, 1),
  (2, 'CarnivalPro', 'Juego de lanzar dardos con tablero de precisión', 'Lanza Dardos Rojo', 100, 'AVAILABLE', 1, 1),
  (3, 'FunFair', 'Juego de tiro al blanco avanzado con luces y sonidos', 'Tiro al Blanco Avanzado', 200, 'AVAILABLE', 2, 16),
  (4, 'FiestaPro', 'Simulador de toro mecánico para eventos grandes', 'Toro Mecánico', 300, 'AVAILABLE', 3, 3),
  (5, 'FiestaPro', 'Juego de martillo con medidor de fuerza digital', 'Martillo Digital', 250, 'AVAILABLE', 5, 4),
  (6, 'AquaFun', 'Juego de lanzamiento de anillos en objetivos flotantes', 'Anillos Acuáticos', 120, 'AVAILABLE', 4, 10),
  (7, 'WaterPlay', 'Juego de pistolas de agua con objetivos móviles', 'Disparos de Agua', 90, 'AVAILABLE', 4, 9),
  (8, 'BounceKing', 'Lanzamiento de pelotas en aros de diferentes tamaños', 'Encesta la Pelota', 110, 'AVAILABLE', 6, 10),
  (9, 'FairPlay', 'Mesa de billar', 'Juegos para adultos', 95, 'AVAILABLE', 9, 14),
  (10, 'CarnivalPro', 'Mesa de billar electronica', 'Juegos para adultos', 115, 'AVAILABLE', 9, 14),
  (11, 'AquaFun', 'Mesa de ping pong', 'Juego de competencia', 125, 'AVAILABLE', 9, 14),
  (12, 'GameMaster', 'Juego de puntería con luces interactivas', 'Diana Interactiva', 140, 'AVAILABLE', 7, 6),
  (13, 'FunZone', 'Juego de fuerza con martillo tradicional', 'Martillo Tradicional', 200, 'AVAILABLE', 5, 15),
  (14, 'AquaFun', 'Juego de pistolas de agua para grupos grandes', 'Pistolas de Agua XXL', 150, 'AVAILABLE', 4, 9),
  (15, 'GameMaster', 'Mesa de fulbito', 'Juego taca taca', 160, 'AVAILABLE', 9, 14),
  (16, 'FunFair', 'Simulador de tiro con arco', 'Tiro con Arco', 220, 'AVAILABLE', 3, 12),
  (17, 'GameMaster', 'Juego del sapo', 'Precision', 130, 'AVAILABLE', 6, 15),
  (18, 'AquaFun', 'Juego de pesca de pelotas en el agua', 'Pesca de Pelotas', 115, 'AVAILABLE', 4, 8),
  (19, 'CarnivalPro', 'Mesa de hockey', 'Juego de competencia', 125, 'AVAILABLE', 6, 15),
  (20, 'FunZone', 'Juego de lanzar aros en diana', 'Aros en Diana', 145, 'AVAILABLE', 6, 11),
  (21, 'FunFair', 'Juego de dardos electrónicos para eventos', 'Dardos Electrónicos', 250, 'AVAILABLE', 1, 1),
  (22, 'FiestaPro', 'Juego de encestar con arco y flecha', 'Encesta con Flechas', 180, 'AVAILABLE', 3, 12),
  (23, 'GameMaster', 'Juego de puntería con tecnología láser', 'Puntería Laser', 200, 'AVAILABLE', 1, 6),
  (24, 'FunFair', 'Juego de tiro de precisión con sensores', 'Tiro de Precisión', 220, 'AVAILABLE', 2, 3),
  (25, 'CarnivalPro', 'Toro mecánico futurista', 'El tradicional juego del toro pero futurista', 180, 'AVAILABLE', 3, 3),
  (26, 'FunFair', 'Juego de puntería digital con pantalla', 'Puntería Digital', 230, 'AVAILABLE', 4, 4);
/* --------------------------------photo */
INSERT INTO `photo`
(`id`,
`url`,
`product_id`)
VALUES
(1,'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126712198_03/w=800,h=800,fit=pad', 1),
(2,'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126712198_03/w=800,h=800,fit=pad', 1),
(3,'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126712198_03/w=800,h=800,fit=pad', 1),
(4,'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126712198_03/w=800,h=800,fit=pad', 1),
(5,'https://st4.depositphotos.com/22463976/41441/i/450/depositphotos_414414268-stock-photo-close-darts-game-board-wall.jpg', 2),
(6,'https://st4.depositphotos.com/22463976/41441/i/450/depositphotos_414414268-stock-photo-close-darts-game-board-wall.jpg', 2),
(7,'https://st4.depositphotos.com/22463976/41441/i/450/depositphotos_414414268-stock-photo-close-darts-game-board-wall.jpg', 2),
(8,'https://st4.depositphotos.com/22463976/41441/i/450/depositphotos_414414268-stock-photo-close-darts-game-board-wall.jpg', 2),
(9,'https://http2.mlstatic.com/D_NQ_NP_636503-MPE51433430986_092022-O.webp',  3),
(10,'https://http2.mlstatic.com/D_NQ_NP_636503-MPE51433430986_092022-O.webp', 3),
(11,'https://http2.mlstatic.com/D_NQ_NP_636503-MPE51433430986_092022-O.webp', 3),
(12,'https://http2.mlstatic.com/D_NQ_NP_636503-MPE51433430986_092022-O.webp', 3),
(13,'https://i.ibb.co/QMtcv1B/toro-realista.jpg', 4),
(14,'https://i.ibb.co/QMtcv1B/toro-realista.jpg', 4),
(15,'https://i.ibb.co/QMtcv1B/toro-realista.jpg', 4),
(16,'https://i.ibb.co/QMtcv1B/toro-realista.jpg', 4),
(17,'https://web.tecnomono.cl/wp-content/uploads/2019/05/954A0E37-C646-4C0B-9B14-D2B6323EB831.jpeg', 5),
(18,'https://web.tecnomono.cl/wp-content/uploads/2019/05/954A0E37-C646-4C0B-9B14-D2B6323EB831.jpeg', 5),
(19,'https://web.tecnomono.cl/wp-content/uploads/2019/05/954A0E37-C646-4C0B-9B14-D2B6323EB831.jpeg', 5),
(20,'https://web.tecnomono.cl/wp-content/uploads/2019/05/954A0E37-C646-4C0B-9B14-D2B6323EB831.jpeg', 5),
(21,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIhCbK0eyce1vXKMtf2NhqxjX9j0iR8R3Pw&s', 6),
(22,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIhCbK0eyce1vXKMtf2NhqxjX9j0iR8R3Pw&s', 6),
(23,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIhCbK0eyce1vXKMtf2NhqxjX9j0iR8R3Pw&s', 6),
(24,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIhCbK0eyce1vXKMtf2NhqxjX9j0iR8R3Pw&s', 6),
(25,'https://over21partyrentals.com/wp-content/uploads/2023/07/Water-Gun-Carnival-Game-Rental-California.jpg', 7),
(26,'https://over21partyrentals.com/wp-content/uploads/2023/07/Water-Gun-Carnival-Game-Rental-California.jpg', 7),
(27,'https://over21partyrentals.com/wp-content/uploads/2023/07/Water-Gun-Carnival-Game-Rental-California.jpg', 7),
(28,'https://over21partyrentals.com/wp-content/uploads/2023/07/Water-Gun-Carnival-Game-Rental-California.jpg', 7),
(29,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7kbmHmJKnwmiDccryuuz6-5-0-TAyf6vPA&s', 8),
(30,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7kbmHmJKnwmiDccryuuz6-5-0-TAyf6vPA&s', 8),
(31,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7kbmHmJKnwmiDccryuuz6-5-0-TAyf6vPA&s', 8),
(32,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7kbmHmJKnwmiDccryuuz6-5-0-TAyf6vPA&s', 8),
(33,'https://http2.mlstatic.com/D_NQ_NP_897223-MPE49317940505_032022-O.webp', 9),
(34,'https://http2.mlstatic.com/D_NQ_NP_897223-MPE49317940505_032022-O.webp', 9),
(35,'https://http2.mlstatic.com/D_NQ_NP_897223-MPE49317940505_032022-O.webp', 9),
(36,'https://http2.mlstatic.com/D_NQ_NP_897223-MPE49317940505_032022-O.webp', 9),
(37,'https://s.alicdn.com/@sc04/kf/H116102ed5ebb4ac483bc181afc9b79c7n.jpg_300x300.jpg', 10),
(38,'https://s.alicdn.com/@sc04/kf/H116102ed5ebb4ac483bc181afc9b79c7n.jpg_300x300.jpg', 10),
(39,'https://s.alicdn.com/@sc04/kf/H116102ed5ebb4ac483bc181afc9b79c7n.jpg_300x300.jpg', 10),
(40,'https://s.alicdn.com/@sc04/kf/H116102ed5ebb4ac483bc181afc9b79c7n.jpg_300x300.jpg', 10),
(41,'https://oechsle.vteximg.com.br/arquivos/ids/1908034-1000-1000/image-b07e7a6ae077435eb1549edb7e541186.jpg?v=637495443741100000', 11),
(42,'https://oechsle.vteximg.com.br/arquivos/ids/1908034-1000-1000/image-b07e7a6ae077435eb1549edb7e541186.jpg?v=637495443741100000', 11),
(43,'https://oechsle.vteximg.com.br/arquivos/ids/1908034-1000-1000/image-b07e7a6ae077435eb1549edb7e541186.jpg?v=637495443741100000', 11),
(44,'https://oechsle.vteximg.com.br/arquivos/ids/1908034-1000-1000/image-b07e7a6ae077435eb1549edb7e541186.jpg?v=637495443741100000', 11),
(45,'https://s3.ap-southeast-1.amazonaws.com/lasertag.com/wp-content/uploads/2020/12/09042524/NEW-circle2.png', 12),
(46,'https://s3.ap-southeast-1.amazonaws.com/lasertag.com/wp-content/uploads/2020/12/09042524/NEW-circle2.png', 12),
(47,'https://s3.ap-southeast-1.amazonaws.com/lasertag.com/wp-content/uploads/2020/12/09042524/NEW-circle2.png', 12),
(48,'https://s3.ap-southeast-1.amazonaws.com/lasertag.com/wp-content/uploads/2020/12/09042524/NEW-circle2.png', 12),
(49,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGywZMyqC4rK_UnqFXp6eK7kZ8uUnTAUCoQ&s', 13),
(50,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGywZMyqC4rK_UnqFXp6eK7kZ8uUnTAUCoQ&s', 13),
(51,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGywZMyqC4rK_UnqFXp6eK7kZ8uUnTAUCoQ&s', 13),
(52,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGywZMyqC4rK_UnqFXp6eK7kZ8uUnTAUCoQ&s', 13),
(53,'https://i.ytimg.com/vi/QZBBjwpUR9I/maxresdefault.jpg', 14),
(54,'https://i.ytimg.com/vi/QZBBjwpUR9I/maxresdefault.jpg', 14),
(55,'https://i.ytimg.com/vi/QZBBjwpUR9I/maxresdefault.jpg', 14),
(56,'https://i.ytimg.com/vi/QZBBjwpUR9I/maxresdefault.jpg', 14),
(57,'https://http2.mlstatic.com/D_NQ_NP_824602-MLC49440855684_032022-O.webp', 15),
(58,'https://http2.mlstatic.com/D_NQ_NP_824602-MLC49440855684_032022-O.webp', 15),
(59,'https://http2.mlstatic.com/D_NQ_NP_824602-MLC49440855684_032022-O.webp', 15),
(60,'https://http2.mlstatic.com/D_NQ_NP_824602-MLC49440855684_032022-O.webp', 15),
(61,'https://sc04.alicdn.com/kf/H40d620f0322f4cba8bec0fd5d543486dK.jpg', 16),
(62,'https://sc04.alicdn.com/kf/H40d620f0322f4cba8bec0fd5d543486dK.jpg', 16),
(63,'https://sc04.alicdn.com/kf/H40d620f0322f4cba8bec0fd5d543486dK.jpg', 16),
(64,'https://sc04.alicdn.com/kf/H40d620f0322f4cba8bec0fd5d543486dK.jpg', 16),
(65,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cOo3vnBUqABfFsUQIQQfNaCKMpgBTVUigw&s', 17),
(66,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cOo3vnBUqABfFsUQIQQfNaCKMpgBTVUigw&s', 17),
(67,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cOo3vnBUqABfFsUQIQQfNaCKMpgBTVUigw&s', 17),
(68,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cOo3vnBUqABfFsUQIQQfNaCKMpgBTVUigw&s', 17),
(69,'https://actividadesinfantil.com/wp-content/uploads/2019/10/motricidad-16.jpg', 18),
(70,'https://actividadesinfantil.com/wp-content/uploads/2019/10/motricidad-16.jpg', 18),
(71,'https://actividadesinfantil.com/wp-content/uploads/2019/10/motricidad-16.jpg', 18),
(72,'https://actividadesinfantil.com/wp-content/uploads/2019/10/motricidad-16.jpg', 18),
(73,'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/889/PMP20000092476/full_image-1.png', 19),
(74,'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/889/PMP20000092476/full_image-1.png', 19),
(75,'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/889/PMP20000092476/full_image-1.png', 19),
(76,'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/889/PMP20000092476/full_image-1.png', 19),
(77,'https://ae-pic-a1.aliexpress-media.com/kf/S6fadec5c71c648eda8b7864f27971d1af.jpg_300x300Q70.jpg_.webp', 20),
(78,'https://ae-pic-a1.aliexpress-media.com/kf/S6fadec5c71c648eda8b7864f27971d1af.jpg_300x300Q70.jpg_.webp', 20),
(79,'https://ae-pic-a1.aliexpress-media.com/kf/S6fadec5c71c648eda8b7864f27971d1af.jpg_300x300Q70.jpg_.webp', 20),
(80,'https://ae-pic-a1.aliexpress-media.com/kf/S6fadec5c71c648eda8b7864f27971d1af.jpg_300x300Q70.jpg_.webp', 20),
(81,'https://image.made-in-china.com/202f0j00neklBLTqfhgO/Dartbeat-Amusement-Electronic-Darts-Arcade-Game-Machines.webp', 21),
(82,'https://image.made-in-china.com/202f0j00neklBLTqfhgO/Dartbeat-Amusement-Electronic-Darts-Arcade-Game-Machines.webp', 21),
(83,'https://image.made-in-china.com/202f0j00neklBLTqfhgO/Dartbeat-Amusement-Electronic-Darts-Arcade-Game-Machines.webp', 21),
(84,'https://image.made-in-china.com/202f0j00neklBLTqfhgO/Dartbeat-Amusement-Electronic-Darts-Arcade-Game-Machines.webp', 21),
(85,'https://m.media-amazon.com/images/I/71mXdMo6jPL.jpg', 22),
(86,'https://m.media-amazon.com/images/I/71mXdMo6jPL.jpg', 22),
(87,'https://m.media-amazon.com/images/I/71mXdMo6jPL.jpg', 22),
(88,'https://m.media-amazon.com/images/I/71mXdMo6jPL.jpg', 22),
(89,'https://m.media-amazon.com/images/I/7128Zg-BfyL._AC_SL1500_.jpg', 23),
(90,'https://m.media-amazon.com/images/I/7128Zg-BfyL._AC_SL1500_.jpg', 23),
(91,'https://m.media-amazon.com/images/I/7128Zg-BfyL._AC_SL1500_.jpg', 23),
(92,'https://m.media-amazon.com/images/I/7128Zg-BfyL._AC_SL1500_.jpg', 23),
(93,'https://alabio.mx/ventas/uploads/services/gallery/324_822.jpg', 24),
(94,'https://alabio.mx/ventas/uploads/services/gallery/324_822.jpg', 24),
(95,'https://alabio.mx/ventas/uploads/services/gallery/324_822.jpg', 24),
(96,'https://alabio.mx/ventas/uploads/services/gallery/324_822.jpg', 24),
(97,'https://i.ibb.co/pwnQwCG/toro-futurista.jpg',  25),
(98,'https://i.ibb.co/pwnQwCG/toro-futurista.jpg',  25),
(99,'https://i.ibb.co/pwnQwCG/toro-futurista.jpg',  25),
(100,'https://i.ibb.co/pwnQwCG/toro-futurista.jpg', 25),
(101,'https://m.media-amazon.com/images/I/61qIkqaf42L._AC_UF894,1000_QL80_.jpg', 26),
(102, 'https://m.media-amazon.com/images/I/61qIkqaf42L._AC_UF894,1000_QL80_.jpg', 26),
(103,'https://m.media-amazon.com/images/I/61qIkqaf42L._AC_UF894,1000_QL80_.jpg', 26),
(104,'https://m.media-amazon.com/images/I/61qIkqaf42L._AC_UF894,1000_QL80_.jpg', 26);

