/* --------------------------------category */
INSERT INTO `category`
VALUES
  (1, 'Juegos de Dardos', 'Diversión y precisión en juegos de dardos para todas las edades', 'https://i.ibb.co/yN1t1Rc/dardos.jpg'),
  (2, 'Juegos de Tiro al Blanco', 'Desafíos de puntería con objetivos de diferentes tipos y tamaños', 'https://i.ibb.co/MpkxZ3J/tiro-al-blanco.jpg'),
  (3, 'Simuladores', 'Experiencias interactivas y simulaciones realistas para eventos', 'https://i.ibb.co/82wZPz6/simuladores.jpg'),
  (4, 'Juegos de Agua', 'Actividades refrescantes con pistolas y otros juegos de agua', 'https://i.ibb.co/NpgYBvT/agua.jpg'),
  (5, 'Juegos de Fuerza', 'Demuestra tu fuerza en desafíos de martillos y otros retos', 'https://i.ibb.co/rk1YcwP/martillo.jpg'),
  (6, 'Juegos de Lanzamiento', 'Encesta y lanza con precisión en juegos de lanzamiento variados', 'https://i.ibb.co/LhPsNKW/lanzamiento.jpg'),
  (7, 'Juegos de Habilidad', 'Pon a prueba tu destreza y habilidades con juegos desafiantes', 'https://i.ibb.co/KKWqNL8/habilidad.jpg'),
  (8, 'Juegos Infantiles', 'Juegos diseñados especialmente para los más pequeños', 'https://i.ibb.co/zGGzwN8/infantiles.jpg'),
  (9, 'Juegos de Competencia', 'Competencias divertidas y emocionantes para todos los gustos', 'https://i.ibb.co/FV8SRhW/competencia.jpg');

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
  (9, 'FairPlay', 'Mesa de billar', 'Mesa de billar clásica', 95, 'AVAILABLE', 9, 14),
  (10, 'CarnivalPro', 'Mesa de billar electronica', 'Mesa de billar', 115, 'AVAILABLE', 9, 14),
  (11, 'AquaFun', 'Mesa de ping pong', 'Mesa de ping pong', 125, 'AVAILABLE', 9, 14),
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
INSERT INTO
  `photo`
VALUES
  (
    1,
    'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126712198_03/w=800,h=800,fit=pad',
    1
  ),
(
    107,
    'https://images.pexels.com/photos/13179775/pexels-photo-13179775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1
  ),
(
    105,
    'https://images.pexels.com/photos/1424745/pexels-photo-1424745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1
  ),
(
    106,
    'https://images.pexels.com/photos/226580/pexels-photo-226580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1
  ),
(
    110,
    'https://images.pexels.com/photos/2423222/pexels-photo-2423222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    2
  ),
(
    109,
    'https://images.pexels.com/photos/8762586/pexels-photo-8762586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    2
  ),
(
    108,
    'https://images.pexels.com/photos/8762591/pexels-photo-8762591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    2
  ),
(
    5,
    'https://st4.depositphotos.com/22463976/41441/i/450/depositphotos_414414268-stock-photo-close-darts-game-board-wall.jpg',
    2
  ),
(
    9,
    'https://http2.mlstatic.com/D_NQ_NP_636503-MPE51433430986_092022-O.webp',
    3
  ),
(
    111,
    'https://toybook.com/wp-content/uploads/sites/4/2022/05/GelBlaster_LE-jpg-webp.webp',
    3
  ),
(
    113,
    'https://toyrush.co/cdn/shop/files/Gel-Blaster-Gun-Toy-Rush-6280.webp?v=1716868964&width=360',
    3
  ),
(
    112,
    'https://www.yallamums.com/image/cache/catalog/LS_BG_AKBU/LS_BG_AKBU%20(1)-1000x1000.webp',
    3
  ),
(
    116,
    'https://d1466fuyav80bi.cloudfront.net/statics/styles/webp/s3/2023-11/toro-mecanico-6.jpg.webp?itok=2EZXJ8kD',
    4
  ),
(
    13,
    'https://i.ibb.co/QMtcv1B/toro-realista.jpg',
    4
  ),
(
    114,
    'https://img.cronista.com/files/image/741/741360/65b7d5fadd131_360_202!.webp?s=f8d318cf4a97b0e63bb1733e24041345&d=1730026746&oe=jpg',
    4
  ),
(
    115,
    'https://motorba.com.ar/wp-content/uploads/como-funciona-el-toro-mecanico.webp',
    4
  ),
(
    119,
    'https://image.made-in-china.com/226f3j00iDulOfVFANkg/Rey-de-martillo-II-Juego-de-trueno-de-primera-Juego-de-martillo-inteligente-M-quina.webp',
    5
  ),
(
    117,
    'https://image.made-in-china.com/226f3j00PHzhyblsfNcu/Rey-de-martillo-II-Juego-de-trueno-de-primera-Juego-de-martillo-inteligente-M-quina.webp',
    5
  ),
(
    118,
    'https://madeforarcade.com/wp-content/uploads/2023/04/king-1.webp',
    5
  ),
(
    17,
    'https://web.tecnomono.cl/wp-content/uploads/2019/05/954A0E37-C646-4C0B-9B14-D2B6323EB831.jpeg',
    5
  ),
(
    122,
    'https://articulo.mercadolibre.com.mx/MLM-2131046027-anillos-de-buceo-de-4-piezas-deportes-acuaticos-juguetes-de-_JM',
    6
  ),
(
    21,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIhCbK0eyce1vXKMtf2NhqxjX9j0iR8R3Pw&s',
    6
  ),
(
    121,
    'https://es.shein.com/4pcs-Diving-Ring-Sets-Suitable-For-Throwing-Diving-Underwater-Pool-Play-Swimming-Training-And-Entertainment-Outdoor-Games-Water-Sports-Pool-Toys-p-31983618.html',
    6
  ),
(
    120,
    'https://http2.mlstatic.com/D_NQ_NP_650847-MLA31373791106_072019-O.webp',
    6
  ),
(
    123,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSco2ilvPqLBgczxVxggRmfyxdLyL0BlsfLlw&s',
    7
  ),
(
    125,
    'https://importadorasebastian.cl/wp-content/uploads/2024/02/D_NQ_NP_2X_640269-MCO72667401731_112023-F.webp',
    7
  ),
(
    124,
    'https://importadorasebastian.cl/wp-content/uploads/2024/02/D_NQ_NP_2X_879761-MCO72595671768_112023-F.webp',
    7
  ),
(
    25,
    'https://over21partyrentals.com/wp-content/uploads/2023/07/Water-Gun-Carnival-Game-Rental-California.jpg',
    7
  ),
(
    29,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7kbmHmJKnwmiDccryuuz6-5-0-TAyf6vPA&s',
    8
  ),
(
    127,
    'https://http2.mlstatic.com/D_NQ_NP_674271-MLM47233344363_082021-O.webp',
    8
  ),
(
    126,
    'https://http2.mlstatic.com/D_NQ_NP_699099-MLM32009209541_082019-O.webp',
    8
  ),
(
    128,
    'https://www.jugandoando.com.ar/wp-content/uploads/que-se-trabaja-con-aros.webp',
    8
  ),
(
    129,
    'https://http2.mlstatic.com/D_NQ_NP_640682-MLU74391476288_022024-O.webp',
    9
  ),
(
    33,
    'https://http2.mlstatic.com/D_NQ_NP_897223-MPE49317940505_032022-O.webp',
    9
  ),
(
    131,
    'https://http2.mlstatic.com/D_NQ_NP_984793-MPE75388657961_032024-O.webp',
    9
  ),
(
    130,
    'https://image.made-in-china.com/226f3j00NubhkBFWrGcl/6FT-moderno-7FT-plegable-Mesa-de-Billar-juego-de-billar.webp',
    9
  ),
(
    134,
    'https://devessport.es/wp-content/uploads/2024/07/2922_1-430x430.webp',
    10
  ),
(
    132,
    'https://es.made-in-china.com/co_dgbiliards/product_High-Quality-4-in-1-Multi-Game-Pool-Table-Popular-in-USA_ysuhoiriry.html',
    10
  ),
(
    133,
    'https://i.blogs.es/d2ebf2/billar-virtual/450_1000.webp',
    10
  ),
(
    37,
    'https://s.alicdn.com/@sc04/kf/H116102ed5ebb4ac483bc181afc9b79c7n.jpg_300x300.jpg',
    10
  ),
(
    136,
    'https://blog.marti.mx/wp-content/uploads/2023/01/los-5-mejores-tipos-de-mesas-de-ping-pong-para-casa-jpg.webp',
    11
  ),
(
    41,
    'https://oechsle.vteximg.com.br/arquivos/ids/1908034-1000-1000/image-b07e7a6ae077435eb1549edb7e541186.jpg?v=637495443741100000',
    11
  ),
(
    135,
    'https://united-events.es/sites/default/files/styles/productos_carrusel_450x300/public/2017-11/13694569_295635767456775_1586369480_n_0.jpg.webp?itok=mNWJ5Sd8',
    11
  ),
(
    137,
    'https://washington.org/sites/default/files/styles/generic_hero_banner_1440_x_600/public/man-playing-ping-pong-breadsoda_credit-breadsoda.jpg.webp?itok=S0n294GO',
    11
  ),
(
    140,
    'https://cdn.activifinder.com/media/activities/activities/covers/lazer-tag-arena-planet-lazer-regina-5Na6yh9c.main.webp',
    12
  ),
(
    139,
    'https://enchanted.com/wp-content/uploads/2022/10/Playing-Laser-Tag-at-Enchanted-Castle.webp',
    12
  ),
(
    45,
    'https://s3.ap-southeast-1.amazonaws.com/lasertag.com/wp-content/uploads/2020/12/09042524/NEW-circle2.png',
    12
  ),
(
    138,
    'https://www.losvirtuality.com/blog/wp-content/uploads/2022/12/LF-Gen8-2-scaled-1.webp',
    12
  ),
(
    49,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGywZMyqC4rK_UnqFXp6eK7kZ8uUnTAUCoQ&s',
    13
  ),
(
    141,
    'https://united-events.es/sites/default/files/styles/productos_carrusel_450x300/public/2020-03/martillo%20de%20feria%20%2827%29.jpg.webp?itok=vkhqgkOe',
    13
  ),
(
    142,
    'https://www.jugandoando.com.ar/wp-content/uploads/como-funciona-el-martillo-de-fuerza.webp',
    13
  ),
(
    143,
    'https://www.jugandoando.com.ar/wp-content/uploads/cuanto-mide-el-martillo-de-la-feria.webp',
    13
  ),
(
    146,
    'https://commerceoncolombia.com/wp-content/uploads/2024/04/D_NQ_NP_2X_889574-MCO74152979086_012024-F.webp',
    14
  ),
(
    144,
    'https://http2.mlstatic.com/D_NQ_NP_745648-MLM75241876705_032024-O.webp',
    14
  ),
(
    53,
    'https://i.ytimg.com/vi/QZBBjwpUR9I/maxresdefault.jpg',
    14
  ),
(
    145,
    'https://opaa.uy/wp-content/uploads/2021/12/D_NQ_NP_2X_725655-MLU48311165564_112021-F.webp',
    14
  ),
(
    57,
    'https://http2.mlstatic.com/D_NQ_NP_824602-MLC49440855684_032022-O.webp',
    15
  ),
(
    147,
    'https://santiagoinflable.cl/wp-content/uploads/2021/07/D_NQ_NP_946670-MLC69390056847_052023-O.webp',
    15
  ),
(
    149,
    'https://www.helgaeventos.cl/wp-content/uploads/2024/06/helgaeventos-mesas-de-juego22.webp',
    15
  ),
(
    148,
    'https://www.helgaeventos.cl/wp-content/uploads/2024/06/helgaeventos-mesas-de-juego24.webp',
    15
  ),
(
    150,
    'https://http2.mlstatic.com/D_NQ_NP_952439-MCO28075451040_092018-O.webp',
    16
  ),
(
    151,
    'https://http2.mlstatic.com/D_NQ_NP_986223-MCO28075451036_092018-O.webp',
    16
  ),
(
    152,
    'https://image.made-in-china.com/202f0j00mqgVDlbFnhUL/Super-Indoor-Ar-Archery-Sports-Augmented-Reality-Game-Center.webp',
    16
  ),
(
    61,
    'https://sc04.alicdn.com/kf/H40d620f0322f4cba8bec0fd5d543486dK.jpg',
    16
  ),
(
    65,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cOo3vnBUqABfFsUQIQQfNaCKMpgBTVUigw&s',
    17
  ),
(
    154,
    'https://http2.mlstatic.com/D_NQ_NP_634704-MLA74338424824_022024-O.webp',
    17
  ),
(
    153,
    'https://http2.mlstatic.com/D_NQ_NP_888505-MCO74294221273_012024-O.webp',
    17
  ),
(
    155,
    'https://http2.mlstatic.com/D_NQ_NP_919131-MLA49159158905_022022-O.webp',
    17
  ),
(
    69,
    'https://actividadesinfantil.com/wp-content/uploads/2019/10/motricidad-16.jpg',
    18
  ),
(
    157,
    'https://ae01.alicdn.com/kf/Sfc98dade4d324024be05e9b53ff05fd5W.jpeg_640x640.jpeg_.webp',
    18
  ),
(
    156,
    'https://http2.mlstatic.com/D_NQ_NP_921299-CBT75150345530_032024-O.webp',
    18
  ),
(
    158,
    'https://www.tradeinn.com/f/13964/139640568_2/atosa-juego-de-pesca-set-juego-de-petanca-6-bolas.webp',
    18
  ),
(
    159,
    'https://marben.net/image/cache/catalog/catalogo/air_hockey/medalsports/6-hockey-de-aire-medal-sports-1200x1200.webp',
    19
  ),
(
    73,
    'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/889/PMP20000092476/full_image-1.png',
    19
  ),
(
    161,
    'https://united-events.es/sites/default/files/styles/productos_carrusel_450x300/public/2019-01/20190115_114702.jpg.webp?itok=fGpaS4L6',
    19
  ),
(
    160,
    'https://www.loodens.com/wp-content/uploads/2022/10/mesa-de-air-hockey-768x512.jpg.webp',
    19
  ),
(
    77,
    'https://ae-pic-a1.aliexpress-media.com/kf/S6fadec5c71c648eda8b7864f27971d1af.jpg_300x300Q70.jpg_.webp',
    20
  ),
(
    163,
    'https://http2.mlstatic.com/D_NQ_NP_685872-MLM74314225293_012024-O.webp',
    20
  ),
(
    164,
    'https://http2.mlstatic.com/D_NQ_NP_696586-MLA80654398085_112024-O.webp',
    20
  ),
(
    162,
    'https://img2.miravia.es/g/fb/kf/E4c29bd669cfe4a378120b4219d90571fC.jpg_360x360q75.jpg_.webp',
    20
  ),
(
    165,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmNnbt-AgVE30gfg1XlN4j_fzhGtn6efk_A&s',
    21
  ),
(
    167,
    'https://image.made-in-china.com/202f0j00faKCBeOlESot/Wholesale-Coin-Operated-Electronic-Dart-Board-Arcade-Darts-Game-Machine-for-Sales.webp',
    21
  ),
(
    81,
    'https://image.made-in-china.com/202f0j00neklBLTqfhgO/Dartbeat-Amusement-Electronic-Darts-Arcade-Game-Machines.webp',
    21
  ),
(
    166,
    'https://image.made-in-china.com/2f0j00RomiSDCFyscI/Classic-Coin-Operated-Dart-Boards-Online-LCD-Video-Darts-Flight-Adult-Competition-Game-Machine-Electronic-Dartboard-Machine.webp',
    21
  ),
(
    168,
    'https://ae-pic-a1.aliexpress-media.com/kf/S3ba9d817b57c4448b8a3c51dfa5fa71eP/Juego-de-arco-y-flecha-para-ni-os-juego-de-juguetes-de-tiro-con-arco-con.jpg_640x640Q90.jpg_.webp',
    22
  ),
(
    169,
    'https://http2.mlstatic.com/D_NQ_NP_989705-MLA42048344039_062020-O.webp',
    22
  ),
(
    85,
    'https://m.media-amazon.com/images/I/71mXdMo6jPL.jpg',
    22
  ),
(
    170,
    'https://mudanzasyfletes2001.com.ar/wp-content/uploads/como-se-llama-el-juego-de-arco-y-flecha.webp',
    22
  ),
(
    171,
    'https://ae-pic-a1.aliexpress-media.com/kf/Sc0d8ca5bf1514a95ada9f02dbe051da9g/Pistolas-de-juguete-con-etiqueta-l-ser-para-ni-os-pistola-infrarroja-el-ctrica-para-ni.jpg_640x640Q90.jpg_.webp',
    23
  ),
(
    173,
    'https://http2.mlstatic.com/D_NQ_NP_605712-MLM73184023076_122023-O.webp',
    23
  ),
(
    172,
    'https://http2.mlstatic.com/D_NQ_NP_766681-MLM31994557230_082019-O.webp',
    23
  ),
(
    89,
    'https://m.media-amazon.com/images/I/7128Zg-BfyL._AC_SL1500_.jpg',
    23
  ),
(
    176,
    'https://ae-pic-a1.aliexpress-media.com/kf/S0bad9306bc6b4e0fbd60e102d2ab1df7S/Juego-de-tiro-de-porter-a-de-f-tbol-inflable-gigante-juego-de-carnaval-barato-env.jpg_640x640Q90.jpg_.webp',
    24
  ),
(
    174,
    'https://ae-pic-a1.aliexpress-media.com/kf/S69fb2c67bbde40c5aa4a76b5a6ec7b708/Juego-de-lanzamiento-de-f-tbol-inflable-de-4x2m-objetivo-de-f-tbol-inflable-porter-a.jpg_640x640Q90.jpg_.webp',
    24
  ),
(
    93,
    'https://alabio.mx/ventas/uploads/services/gallery/324_822.jpg',
    24
  ),
(
    175,
    'https://image.made-in-china.com/202f0j00CJaqRUtIqEkb/Commercial-Inflatable-Soccer-Goal-Outdoor-Bouncy-Sport-Games-Inflatable-Soccer-Shooting-Gate-Inflatable-Soccer-Goal-Inflatable-Football-Gate-Shooting-Ball-Games.webp',
    24
  ),
(
    178,
    'https://cdn0.bodas.net/vendor/33132/3_2/960/jpg/toro_1_233132-170064932285127.webp',
    25
  ),
(
    179,
    'https://http2.mlstatic.com/D_NQ_NP_2X_906861-MLU69111720045_042023-T.webp',
    25
  ),
(
    97,
    'https://i.ibb.co/pwnQwCG/toro-futurista.jpg',
    25
  ),
(
    177,
    'https://laopinionpergamino.com.ar/img/publicaciones/2024/06/03/alta/222689.webp',
    25
  ),
(
    181,
    'https://cdn.superstore.ge/2023/04/417055-3.webp',
    26
  ),
(
    180,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTqq5dhurbpzA0-whbIfgKtUWZQScABKvSw&s',
    26
  ),
(
    182,
    'https://http2.mlstatic.com/D_NQ_NP_970467-MLM46496086172_062021-O.webp',
    26
  ),
(
    101,
    'https://m.media-amazon.com/images/I/61qIkqaf42L._AC_UF894,1000_QL80_.jpg',
    26
  );

INSERT INTO `users`
(`id`,
`created_at`,
`email`,
`is_deleted`,
`is_enabled`,
`name`,
`lastname`,
`password`,
`role`)
VALUES
(1, '2024-11-07 22:42:57.281862', 'prueba01@gmail.com', 0, 1, 'Cesar', 'Acuña', '$2a$10$jWs63fJ29jiBqBD4FEwFS.MvJnN0/2FSlIk7ZnWDSIccV.yXDcVlO', 'ADMIN'),
(2, '2024-11-06 22:42:57.281862', 'prueba02@gmail.com', 0, 1, 'Antauro', 'Humala', '$2a$10$jWs63fJ29jiBqBD4FEwFS.MvJnN0/2FSlIk7ZnWDSIccV.yXDcVlO', 'ADMIN'),
(3, '2024-11-05 22:42:57.281862', 'prueba03@gmail.com', 0, 1, 'Dinamita', 'Balearte', '$2a$10$jWs63fJ29jiBqBD4FEwFS.MvJnN0/2FSlIk7ZnWDSIccV.yXDcVlO', 'USER'),
(4, '2024-11-04 22:42:57.281862', 'prueba04@gmail.com', 0, 1, 'Enrique', 'Peña Nieto', '$2a$10$jWs63fJ29jiBqBD4FEwFS.MvJnN0/2FSlIk7ZnWDSIccV.yXDcVlO', 'USER'),
(5, '2024-11-03 22:42:57.281862', 'prueba05@gmail.com', 0, 1, 'Tekito', 'Lacarie', '$2a$10$jWs63fJ29jiBqBD4FEwFS.MvJnN0/2FSlIk7ZnWDSIccV.yXDcVlO', 'USER');

/* --------------------------------favorites */
INSERT INTO `favorites`
VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,1)

