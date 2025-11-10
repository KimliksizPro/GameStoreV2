import { Game } from '../types';

export const initialGames: Game[] = [
  // Featured Game
{
  id: 'minecraft',
  title: 'Minecraft',
  genre: 'Sandbox / Survival',
  category: 'Simülasyon',
  platform: 'PC, PS5, Xbox',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/news/m/microsoft-/microsoft-leaks-minecraft-live-reveals-including-creepy-soun_c46b.1280.jpg',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpapercave.com/wp/NjGW245.jpg',
  downloadUrl: 'https://drive.google.com/drive/folders/15DKwjLtqSxfEH5kGK2yN-45HRWlqZs9q?usp=drive_link',
  releaseDate: '2011-11-18',
  description: 'Blok tabanlı bir evrende geçen bu dijital deneyim, oyunculara keşfetme, inşa etme ve hayatta kalma özgürlüğü sunar. Yaratıcılığı ve stratejiyi bir araya getirir.',
  price: 29.99,
  featured: true,
  patchUrl: '#',
  screenshots: [
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/Survive-and-thrive-screenshot.png',
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/Build-anything-you-can-imagine-screenshot.png',
    'https://www.minecraft.net/content/dam/games/minecraft/screenshots/Explore-new-worlds-screenshot.png',
  ]
},
{ 
  id: 'mount-blade-warband', 
  title: 'Mount & Blade: Warband', 
  genre: 'Strategy / RPG', 
  category: 'Savaş Oyunları',
  platform: 'PC',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/tr/9/9d/Mount_%26_Blade_II_-_Bannerlord.jpg', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/48700/ss_e61336c561f584f73801e1db8c160a2d54f59df0.1920x1080.jpg?t=1695222276',
  downloadUrl: 'https://drive.usercontent.google.com/download?id=1EDdxJTl5czyyYTFRagyUsrX1bkkca9vp&export=download&authuser=0',
  releaseDate: '2010-03-31',
  description: 'Orta Çağ temalı, hem strateji hem de RPG öğeleri içeren eşsiz bir oyun. Kendi ordunu kur, kaleleri fethet ve Calradia\'nın hakimi ol.', 
  price: 19.99, 
  featured: false,
  patchUrl: '#',
   screenshots: [
    'https://www.taleworlds.com/Images/gamemain/mb_warband_scr_21.jpg',
    'https://www.taleworlds.com/Images/gamemain/mb_warband_scr_20.jpg',
    'https://www.taleworlds.com/Images/gamemain/mb_warband_scr_19.jpg',
  ]
},
{ 
  id: 'gta-sanandreas', 
  title: 'GTA Sanandreas', 
  genre: 'Action / Open World', 
  category: 'Aksiyon',
  platform: 'PC, PS2',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ebayimg.com/00/s/NTAwWDM1NA==/z/uYYAAOSwPCVX3l3M/$_12.JPG', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://getwallpapers.com/wallpaper/full/3/c/b/1120096-large-grand-theft-auto-san-andreas-wallpapers-1920x1200-meizu.jpg',
  downloadUrl: 'https://drive.google.com/file/d/1sjV8ft0_X3cQQ2FEvUJaQhOpVb-j-RHz/view?usp=drive_link',
  releaseDate: '2005-06-07',
  description: 'Özgürlük dolu sokaklarda geçen, aksiyon ve hikayeyi bir araya getiren efsanevi bir macera. CJ ile şehri ele geçirmeye hazır mısın?', 
  price: 19.99, 
  featured: true,
},

// Savaş Oyunları
{ id: 'counter-strike-1-6', title: 'Counter Strike 1.6', genre: 'FPS / Action', category: 'Savaş Oyunları', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BOWU1MTVhOTUtNmU0Mi00MWNiLWIyOWQtMDFkOTFmMzc5ZTNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/10/0000000109.1920x1080.jpg?t=1602621379', downloadUrl: 'https://drive.google.com/file/d/17EQ0qVctazydRMyD8oMGWFGeUqCl5k6A/view?usp=drive_link', releaseDate: '2000-11-01', description: 'Rekabetin ve taktiksel zekânın zirveye çıktığı, efsaneleşmiş bir aksiyon deneyimidir.', price: 9.99 },
{ id: 'point-black-portable', title: 'Point Black Portable', genre: 'FPS / Action', category: 'Savaş Oyunları', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BYjdlZjZlMTQtMTQwNS00MTBjLWE3YjQtM2Y3NjQ5ZWEzMzRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/KzylQy_g5hY/maxresdefault.jpg', downloadUrl: 'https://drive.google.com/file/d/1QPyfg1kP8VEN7LnVGpxfFT8AJGt-v5bW/view?usp=sharing', releaseDate: '2011-01-01', description: 'CS 1.6 çakması.', price: 0.00 },
{ id: 'half-life-1', title: 'Half-Life 1', genre: 'FPS / Sci-Fi', category: 'Savaş Oyunları', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/screenshot/default/half-life-3_36sx.1280.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/70/0000002198.1920x1080.jpg?t=1602611415', downloadUrl: 'https://drive.google.com/file/d/1qvB_OOJqVoPLb5JYiOmKYq8tCDn84pts/view', releaseDate: '1998-11-08', description: 'Bilim kurgu ve aksiyonu birleştiren, oyun dünyasına yön vermiş efsanevi bir FPS.', price: 14.99 },

// Strateji / Aksiyon
{ id: 'among-us', title: 'Among Us', genre: 'Social Deduction', category: 'Strateji', platform: 'PC, Mobile', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2020/04/Among-Us.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/945360/ss_27918118228305de7ade33946a361884b2c86e02.1920x1080.jpg?t=1704490333', downloadUrl: 'https://drive.google.com/file/d/1vl9FlEg36KctzElvmc0DiLuSJuUA3Uq5/view?usp=sharing', releaseDate: '2018-11-16', description: 'Uzay gemisinde geçen, ekip çalışması ve ihanet üzerine kurulu popüler bir sosyal çıkarım oyunu.', price: 4.99 },
{ id: 'gang-beasts', title: 'Gang Beasts', genre: 'Party / Physics', category: 'Aksiyon', platform: 'PC, PS4', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2019/01/Gang-Beasts4.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/285900/ss_287ba6203a3d582b130e54d852e42848525b687f.1920x1080.jpg?t=1686941785', downloadUrl: 'https://drive.google.com/drive/folders/1sooBCQv69tis2cbIEc4Jo3ppEMiJ7JVr', releaseDate: '2017-12-12', description: 'Jelibon gibi karakterlerle komik ve kaotik dövüşlerin yapıldığı, fizik tabanlı eğlenceli bir parti oyunu.', price: 14.99 },
{ id: 'pico-park', title: 'Pico Park', genre: 'Co-op / Puzzle', category: 'Aksiyon', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2021/08/PICO-PARK.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2021/08/PICO-PARK.jpg', downloadUrl: 'https://drive.google.com/file/d/1JRoI8k2OBUtH8s36qQHV-0OdmJJjx5lv/view?usp=drive_link', releaseDate: '2016-04-28', description: 'Arkadaşlarınızla birlikte anahtarı alıp hedefe ulaşmanız gereken, oldukça eğlenceli bir kooperatif aksiyon bulmaca oyunu.', price: 0.00 },

// 2D Oyunlar
{ id: 'stardew-valley', title: 'Stardew Valley', genre: 'Simulation RPG', category: '2D Oyunlar', platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://static01.galaxus.com/productimages/4/1/7/4/1/3/2/3/9/3/5/7/0/3/1/4/8/2/9/d51c0e69-a007-4c47-bad1-338a675c0909_cropped.jpg_720.jpeg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_59f3d62323e200870845a720e365181710526829.1920x1080.jpg?t=1686942003', downloadUrl: 'https://drive.google.com/file/d/1nt4seYRfRYCpVIH1LPtz3y3gagTP_Dg6/view', releaseDate: '2016-02-26', description: 'Çiftçilik, balıkçılık, madencilik ve sosyal yaşamın iç içe geçtiği huzurlu bir köy hayatı simülasyonu.', price: 14.99 },
{ id: 'terraria', title: 'Terraria', genre: 'Sandbox / Adventure', category: '2D Oyunlar', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/I/815a-OjJ0SL.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_91a0f95c4c1e403d508248c89b33a7f85117f739.1920x1080.jpg?t=1690922849', downloadUrl: 'https://drive.google.com/file/d/1lBwkYejVPcP0pMnOSCSIkjBDcO3dSetG/view', releaseDate: '2011-05-16', description: 'Keşif, inşa ve savaşın birleştiği 2D bir sandbox macerası. Kendi dünyanı yarat ve düşmanlarla savaş.', price: 9.99 },
{ id: 'undertale', title: 'Undertale', genre: 'RPG', category: '2D Oyunlar', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/Sm6m6_XB8P4/sddefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpaperswide.com/download/undertale_sans-wallpaper-2048x1152.jpg', downloadUrl: 'https://drive.google.com/file/d/1epPqbUNq9pgJKmkFoZdHU2aoi24_14Xi/view', releaseDate: '2015-09-15',featured:true, description: 'Seçimlerinin hikayeyi değiştirdiği, eşsiz bir RPG deneyimi. Canavarlarla savaşmak yerine onlarla arkadaş olabilirsin.', price: 9.99 },
{ id: 'hollow-knight', title: 'Hollow Knight', genre: 'Metroidvania', category: '2D Oyunlar', platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbz5qNiKoSqm1ymVyXQIggcPAP6OssByQ_w&s', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_61f52d50125890855aa1625f3c0293b9d03433e1.1920x1080.jpg?t=1667006028', downloadUrl: 'https://drive.google.com/file/d/1FX-WymH2hT7IL-b9Wjit9PJ3yS0Z4SVp/view', releaseDate: '2017-02-24', description: 'Gizemli bir yeraltı dünyasında geçen, zorlu düşmanlar ve keşfedilmeyi bekleyen sırlar içeren atmosferik bir Metroidvania oyunu.', price: 14.99 },
{ id: 'celeste', title: 'Celeste', genre: 'Platformer', category: '2D Oyunlar', platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/1rwAvUvvQzQ/maxresdefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/504230/ss_20773d2f09950005a7703b41d62c3b53f64d0840.1920x1080.jpg?t=1675283827', downloadUrl: 'https://drive.google.com/file/d/19OpqVx1c4Fn0NJaKcykbu4fmRNYxr40F/view', releaseDate: '2018-01-25', description: 'Zorlu platform mekanikleri ve dokunaklı hikayesiyle öne çıkan, bağımlılık yapıcı bir macera oyunu.', price: 19.99 },
{ id: 'cuphead', title: 'Cuphead', genre: 'Run-and-Gun / Platformer', category: '2D Oyunlar', platform: 'PC, Xbox', verticalImageUrl: 'https://images.weserv.nl/?url=https://androidoyun.club/wp-content/uploads/2022/08/cuphead-mobile-v7-2-full-apk-tam-surum-e1661870847576.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/268910/ss_549a15b579585b73e35d12228b3a017253a60f64.1920x1080.jpg?t=1679093414', downloadUrl: 'https://example.com/cuphead', releaseDate: '2017-09-29', description: '1930\'ların çizgi filmlerinden ilham alan eşsiz görsel tarzı ve zorlu boss savaşlarıyla ünlü bir run-and-gun oyunu.', price: 19.99 },
{ id: 'geometry-dash', title: 'Geometry Dash', genre: 'Rhythm / Platformer', category: '2D Oyunlar', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.pinimg.com/736x/e9/66/66/e9666654716dad9b13c68ad72b3e8c37.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/capsule_616x353.jpg?t=1703006148', downloadUrl: 'https://drive.google.com/file/d/1Xiu7JBqIQ5ZbJbwZTh9Tlfec92mrUtto/view', releaseDate: '2014-12-22', description: 'Müzik ritmine dayalı, engellerle dolu seviyeleri tamamlamaya çalıştığınız hızlı tempolu bir platform oyunu.', price: 0.00 },

// Simülasyon / Platformer
{ 
  id: 'ets-2', 
  title: 'ETS 2', 
  genre: 'Simulation / Driving', 
  category: 'Simülasyon', 
  platform: 'PC', 
  verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/euro-truck-simulator-2/images/0/0e/Euro_Truck_Simulator_2_cover.jpg/revision/latest?cb=20210517022450', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/227300/ss_622a2555742618488e376236592dc17c46131494.1920x1080.jpg',
  downloadUrl: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/', // Bu ETS 2, ETS 1.30 değil
  releaseDate: '2012-10-18', 
  description: 'Avrupa\'nın yollarında tır şoförü olarak seyahat edin, önemli kargoları teslim ederek kendi işinizi kurun ve büyütün.', 
  price: 24.99 
},
{ id: 'getting-over-it', title: 'Getting Over It with Bennett Foddy', genre: 'Platformer / Physics', category: 'Simülasyon', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Getting-Over-It-with-Bennett-Foddy-PC1.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Getting-Over-It-with-Bennett-Foddy-PC1.jpg', downloadUrl: 'https://drive.google.com/file/d/1Q4aK_3UTGq_V3IPQy4zSaUyOqH1Uuzqn/view', releaseDate: '2017-12-06', description: 'Bir tencerenin içinde balyozla dağa tırmanmaya çalıştığınız, sinir bozucu derecede zor ama bağımlılık yapıcı bir platform oyunu.', price: 0.00 },
{ id: 'only-up', title: 'Only Up!', genre: 'Platformer / 3D', category: 'Simülasyon', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6l8u.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2023/05/Only-Up-.jpg', downloadUrl: 'https://drive.google.com/file/d/1nZ1hy78h90rI6u5iKH-Mn9bSK4PUWINm/view', releaseDate: '2023-05-24', description: 'Gökyüzüne doğru tırmandığınız, düşmemeye çalıştığınız ve her hatanın bedelinin ağır olduğu zorlu bir parkur oyunu.', price: 0.00 },

// Araba Yarışı
{ id: 'most-wanted', title: 'Most Wanted', genre: 'Racing / Open World', category: 'Araba Yarışı', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/videogamefanon/images/2/28/Nfsmwptii_poster.png/revision/latest?cb=20240314123047', horizontalImageUrl: 'https://images.weserv.nl/?url=https://c4.wallpaperflare.com/wallpaper/259/775/636/bmw-m3-gtr-bmw-need-for-speed-most-wanted-garage-tuning-hd-wallpaper-preview.jpg', downloadUrl: 'https://drive.google.com/drive/folders/1aZJjoQJ20F0YpvCZ7kmu-0f6b3LK_alX', releaseDate: '2005-11-11', description: 'Hız tutkunlarının vazgeçilmezi, sokak yarışlarının efsanesi. Polis kovalamacaları ve nefes kesen mücadelelerle dolu bir açık dünya deneyimi.', price: 0.00 },
{ id: 'blur', title: 'Blur', genre: 'Arcade Racing / Combat', category: 'Araba Yarışı', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', downloadUrl: 'https://drive.usercontent.google.com/download?id=1tcdzcnGKfv-j0mqRzJ0lBSV4CrpL47Nw&export=download&authuser=0', releaseDate: '2010-05-25', description: 'Arcade tarzı yarış ile araçlı savaş mekaniklerini birleştiren, aksiyon dolu bir yarış oyunu.', price: 0.00 },
{ id: 'underground-2', title: 'Underground 2', genre: 'Racing / Tuning', category: 'Araba Yarışı', platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', horizontalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', downloadUrl: 'https://drive.google.com/file/d/1yy7sqsc-n5H3DGgZ8RyJLYVcEy-2ZnW-/view?usp=drive_link', releaseDate: '2004-11-09', description: 'Efsanevi sokak yarışı oyunu. Arabanı modifiye et ve şehrin en hızlısı ol.', price: 0.00,featured: true },
];