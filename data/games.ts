import { Game } from '../types';

export const initialGames: Game[] = [
  // Featured Game
{
  id: 'minecraft',
  title: { en: 'Minecraft', tr: 'Minecraft' },
  genre: { en: 'Sandbox / Survival', tr: 'Sandbox / Hayatta Kalma' },
  category: { en: 'Simulation', tr: 'Simülasyon' },
  platform: 'PC, PS5, Xbox',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/news/m/microsoft-/microsoft-leaks-minecraft-live-reveals-including-creepy-soun_c46b.1280.jpg',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpapercave.com/wp/NjGW245.jpg',
  downloadUrl: 'https://drive.google.com/drive/folders/15DKwjLtqSxfEH5kGK2yN-45HRWlqZs9q?usp=drive_link',
  releaseDate: '2011-11-18',
  description: {
    en: 'This digital experience, set in a block-based universe, offers players the freedom to explore, build, and survive. It combines creativity and strategy.',
    tr: 'Blok tabanlı bir evrende geçen bu dijital deneyim, oyunculara keşfetme, inşa etme ve hayatta kalma özgürlüğü sunar. Yaratıcılığı ve stratejiyi bir araya getirir.'
  },
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
  title: { en: 'Mount & Blade: Warband', tr: 'Mount & Blade: Warband' }, 
  genre: { en: 'Strategy / RPG', tr: 'Strateji / RPG' }, 
  category: { en: 'War Games', tr: 'Savaş Oyunları' },
  platform: 'PC',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/tr/9/9d/Mount_%26_Blade_II_-_Bannerlord.jpg', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/48700/ss_e61336c561f584f73801e1db8c160a2d54f59df0.1920x1080.jpg?t=1695222276',
  downloadUrl: 'https://drive.usercontent.google.com/download?id=1EDdxJTl5czyyYTFRagyUsrX1bkkca9vp&export=download&authuser=0',
  releaseDate: '2010-03-31',
  description: {
    en: 'A unique medieval-themed game with both strategy and RPG elements. Build your own army, conquer castles, and become the ruler of Calradia.',
    tr: 'Orta Çağ temalı, hem strateji hem de RPG öğeleri içeren eşsiz bir oyun. Kendi ordunu kur, kaleleri fethet ve Calradia\'nın hakimi ol.'
  }, 
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
  title: { en: 'GTA San Andreas', tr: 'GTA Sanandreas' }, 
  genre: { en: 'Action / Open World', tr: 'Aksiyon / Açık Dünya' }, 
  category: { en: 'Action', tr: 'Aksiyon' },
  platform: 'PC, PS2',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ebayimg.com/00/s/NTAwWDM1NA==/z/uYYAAOSwPCVX3l3M/$_12.JPG', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://getwallpapers.com/wallpaper/full/3/c/b/1120096-large-grand-theft-auto-san-andreas-wallpapers-1920x1200-meizu.jpg',
  downloadUrl: 'https://drive.google.com/file/d/1sjV8ft0_X3cQQ2FEvUJaQhOpVb-j-RHz/view?usp=drive_link',
  releaseDate: '2005-06-07',
  description: {
    en: 'A legendary adventure that combines action and story, set in streets full of freedom. Are you ready to take over the city with CJ?',
    tr: 'Özgürlük dolu sokaklarda geçen, aksiyon ve hikayeyi bir araya getiren efsanevi bir macera. CJ ile şehri ele geçirmeye hazır mısın?'
  }, 
  price: 19.99, 
  featured: true,
},

// Savaş Oyunları
{ id: 'counter-strike-1-6', title: { en: 'Counter-Strike 1.6', tr: 'Counter Strike 1.6' }, genre: { en: 'FPS / Action', tr: 'FPS / Aksiyon' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BOWU1MTVhOTUtNmU0Mi00MWNiLWIyOWQtMDFkOTFmMzc5ZTNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/10/0000000109.1920x1080.jpg?t=1602621379', downloadUrl: 'https://drive.google.com/file/d/17EQ0qVctazydRMyD8oMGWFGeUqCl5k6A/view?usp=drive_link', releaseDate: '2000-11-01', description: { en: 'A legendary action experience where competition and tactical intelligence reach their peak.', tr: 'Rekabetin ve taktiksel zekânın zirveye çıktığı, efsaneleşmiş bir aksiyon deneyimidir.' }, price: 9.99 },
{ id: 'point-black-portable', title: { en: 'Point Blank Portable', tr: 'Point Black Portable' }, genre: { en: 'FPS / Action', tr: 'FPS / Aksiyon' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BYjdlZjZlMTQtMTQwNS00MTBjLWE3YjQtM2Y3NjQ5ZWEzMzRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/KzylQy_g5hY/maxresdefault.jpg', downloadUrl: 'https://drive.google.com/file/d/1QPyfg1kP8VEN7LnVGpxfFT8AJGt-v5bW/view?usp=sharing', releaseDate: '2011-01-01', description: { en: 'A clone of CS 1.6.', tr: 'CS 1.6 çakması.' }, price: 0.00 },
{ id: 'half-life-1', title: { en: 'Half-Life 1', tr: 'Half-Life 1' }, genre: { en: 'FPS / Sci-Fi', tr: 'FPS / Bilim Kurgu' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/screenshot/default/half-life-3_36sx.1280.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/70/0000002198.1920x1080.jpg?t=1602611415', downloadUrl: 'https://drive.google.com/file/d/1qvB_OOJqVoPLb5JYiOmKYq8tCDn84pts/view', releaseDate: '1998-11-08', description: { en: 'A legendary FPS that shaped the gaming world, combining sci-fi and action.', tr: 'Bilim kurgu ve aksiyonu birleştiren, oyun dünyasına yön vermiş efsanevi bir FPS.' }, price: 14.99 },

// Strateji / Aksiyon
{ id: 'among-us', title: { en: 'Among Us', tr: 'Among Us' }, genre: { en: 'Social Deduction', tr: 'Sosyal Çıkarım' }, category: { en: 'Strategy', tr: 'Strateji' }, platform: 'PC, Mobile', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2020/04/Among-Us.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/945360/ss_27918118228305de7ade33946a361884b2c86e02.1920x1080.jpg?t=1704490333', downloadUrl: 'https://drive.google.com/file/d/1vl9FlEg36KctzElvmc0DiLuSJuUA3Uq5/view?usp=sharing', releaseDate: '2018-11-16', description: { en: 'A popular social deduction game set on a spaceship, based on teamwork and betrayal.', tr: 'Uzay gemisinde geçen, ekip çalışması ve ihanet üzerine kurulu popüler bir sosyal çıkarım oyunu.' }, price: 4.99 },
{ id: 'gang-beasts', title: { en: 'Gang Beasts', tr: 'Gang Beasts' }, genre: { en: 'Party / Physics', tr: 'Parti / Fizik' }, category: { en: 'Action', tr: 'Aksiyon' }, platform: 'PC, PS4', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2019/01/Gang-Beasts4.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/285900/ss_287ba6203a3d582b130e54d852e42848525b687f.1920x1080.jpg?t=1686941785', downloadUrl: 'https://drive.google.com/drive/folders/1sooBCQv69tis2cbIEc4Jo3ppEMiJ7JVr', releaseDate: '2017-12-12', description: { en: 'A fun, physics-based party game with comical and chaotic fights featuring gelatinous characters.', tr: 'Jelibon gibi karakterlerle komik ve kaotik dövüşlerin yapıldığı, fizik tabanlı eğlenceli bir parti oyunu.' }, price: 14.99 },
{ id: 'pico-park', title: { en: 'Pico Park', tr: 'Pico Park' }, genre: { en: 'Co-op / Puzzle', tr: 'Co-op / Bulmaca' }, category: { en: 'Action', tr: 'Aksiyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2021/08/PICO-PARK.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2021/08/PICO-PARK.jpg', downloadUrl: 'https://drive.google.com/file/d/1JRoI8k2OBUtH8s36qQHV-0OdmJJjx5lv/view?usp=drive_link', releaseDate: '2016-04-28', description: { en: 'A very fun cooperative action puzzle game where you and your friends need to get the key and reach the goal.', tr: 'Arkadaşlarınızla birlikte anahtarı alıp hedefe ulaşmanız gereken, oldukça eğlenceli bir kooperatif aksiyon bulmaca oyunu.' }, price: 0.00 },

// 2D Oyunlar
{ id: 'stardew-valley', title: { en: 'Stardew Valley', tr: 'Stardew Valley' }, genre: { en: 'Simulation RPG', tr: 'Simülasyon RPG' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://static01.galaxus.com/productimages/4/1/7/4/1/3/2/3/9/3/5/7/0/3/1/4/8/2/9/d51c0e69-a007-4c47-bad1-338a675c0909_cropped.jpg_720.jpeg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_59f3d62323e200870845a720e365181710526829.1920x1080.jpg?t=1686942003', downloadUrl: 'https://drive.google.com/file/d/1nt4seYRfRYCpVIH1LPtz3y3gagTP_Dg6/view', releaseDate: '2016-02-26', description: { en: 'A peaceful village life simulation intertwining farming, fishing, mining, and social life.', tr: 'Çiftçilik, balıkçılık, madencilik ve sosyal yaşamın iç içe geçtiği huzurlu bir köy hayatı simülasyonu.' }, price: 14.99 },
{ id: 'terraria', title: { en: 'Terraria', tr: 'Terraria' }, genre: { en: 'Sandbox / Adventure', tr: 'Sandbox / Macera' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/I/815a-OjJ0SL.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_91a0f95c4c1e403d508248c89b33a7f85117f739.1920x1080.jpg?t=1690922849', downloadUrl: 'https://drive.google.com/file/d/1lBwkYejVPcP0pMnOSCSIkjBDcO3dSetG/view', releaseDate: '2011-05-16', description: { en: 'A 2D sandbox adventure combining exploration, building, and combat. Create your own world and fight enemies.', tr: 'Keşif, inşa ve savaşın birleştiği 2D bir sandbox macerası. Kendi dünyanı yarat ve düşmanlarla savaş.' }, price: 9.99 },
{ id: 'undertale', title: { en: 'Undertale', tr: 'Undertale' }, genre: { en: 'RPG', tr: 'RPG' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/Sm6m6_XB8P4/sddefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpaperswide.com/download/undertale_sans-wallpaper-2048x1152.jpg', downloadUrl: 'https://drive.google.com/file/d/1epPqbUNq9pgJKmkFoZdHU2aoi24_14Xi/view', releaseDate: '2015-09-15',featured:true, description: { en: 'A unique RPG experience where your choices change the story. You can befriend monsters instead of fighting them.', tr: 'Seçimlerinin hikayeyi değiştirdiği, eşsiz bir RPG deneyimi. Canavarlarla savaşmak yerine onlarla arkadaş olabilirsin.' }, price: 9.99 },
{ id: 'hollow-knight', title: { en: 'Hollow Knight', tr: 'Hollow Knight' }, genre: { en: 'Metroidvania', tr: 'Metroidvania' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbz5qNiKoSqm1ymVyXQIggcPAP6OssByQ_w&s', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_61f52d50125890855aa1625f3c0293b9d03433e1.1920x1080.jpg?t=1667006028', downloadUrl: 'https://drive.google.com/file/d/1FX-WymH2hT7IL-b9Wjit9PJ3yS0Z4SVp/view', releaseDate: '2017-02-24', description: { en: 'An atmospheric Metroidvania game set in a mysterious underground world with challenging enemies and secrets to discover.', tr: 'Gizemli bir yeraltı dünyasında geçen, zorlu düşmanlar ve keşfedilmeyi bekleyen sırlar içeren atmosferik bir Metroidvania oyunu.' }, price: 14.99 },
{ id: 'celeste', title: { en: 'Celeste', tr: 'Celeste' }, genre: { en: 'Platformer', tr: 'Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/1rwAvUvvQzQ/maxresdefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/504230/ss_20773d2f09950005a7703b41d62c3b53f64d0840.1920x1080.jpg?t=1675283827', downloadUrl: 'https://drive.google.com/file/d/19OpqVx1c4Fn0NJaKcykbu4fmRNYxr40F/view', releaseDate: '2018-01-25', description: { en: 'An addictive adventure game that stands out with its challenging platform mechanics and touching story.', tr: 'Zorlu platform mekanikleri ve dokunaklı hikayesiyle öne çıkan, bağımlılık yapıcı bir macera oyunu.' }, price: 19.99 },
{ id: 'cuphead', title: { en: 'Cuphead', tr: 'Cuphead' }, genre: { en: 'Run-and-Gun / Platformer', tr: 'Run-and-Gun / Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Xbox', verticalImageUrl: 'https://images.weserv.nl/?url=https://androidoyun.club/wp-content/uploads/2022/08/cuphead-mobile-v7-2-full-apk-tam-surum-e1661870847576.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/268910/ss_549a15b579585b73e35d12228b3a017253a60f64.1920x1080.jpg?t=1679093414', downloadUrl: 'https://example.com/cuphead', releaseDate: '2017-09-29', description: { en: 'A run-and-gun game famous for its unique visual style inspired by 1930s cartoons and its challenging boss battles.', tr: '1930\'ların çizgi filmlerinden ilham alan eşsiz görsel tarzı ve zorlu boss savaşlarıyla ünlü bir run-and-gun oyunu.' }, price: 19.99 },
{ id: 'geometry-dash', title: { en: 'Geometry Dash', tr: 'Geometry Dash' }, genre: { en: 'Rhythm / Platformer', tr: 'Ritim / Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.pinimg.com/736x/e9/66/66/e9666654716dad9b13c68ad72b3e8c37.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/capsule_616x353.jpg?t=1703006148', downloadUrl: 'https://drive.google.com/file/d/1Xiu7JBqIQ5ZbJbwZTh9Tlfec92mrUtto/view', releaseDate: '2014-12-22', description: { en: 'A fast-paced platform game based on music rhythm, where you try to complete levels full of obstacles.', tr: 'Müzik ritmine dayalı, engellerle dolu seviyeleri tamamlamaya çalıştığınız hızlı tempolu bir platform oyunu.' }, price: 0.00 },

// Simülasyon / Platformer
{ 
  id: 'ets-2', 
  title: { en: 'ETS 2', tr: 'ETS 2' }, 
  genre: { en: 'Simulation / Driving', tr: 'Simülasyon / Sürüş' }, 
  category: { en: 'Simulation', tr: 'Simülasyon' }, 
  platform: 'PC', 
  verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/euro-truck-simulator-2/images/0/0e/Euro_Truck_Simulator_2_cover.jpg/revision/latest?cb=20210517022450', 
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://cdn.akamai.steamstatic.com/steam/apps/227300/ss_622a2555742618488e376236592dc17c46131494.1920x1080.jpg',
  downloadUrl: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/',
  releaseDate: '2012-10-18', 
  description: { en: 'Travel on European roads as a truck driver, deliver important cargo, and start and grow your own business.', tr: 'Avrupa\'nın yollarında tır şoförü olarak seyahat edin, önemli kargoları teslim ederek kendi işinizi kurun ve büyütün.' }, 
  price: 24.99 
},
{ id: 'getting-over-it', title: { en: 'Getting Over It with Bennett Foddy', tr: 'Getting Over It with Bennett Foddy' }, genre: { en: 'Platformer / Physics', tr: 'Platformer / Fizik' }, category: { en: 'Simulation', tr: 'Simülasyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Getting-Over-It-with-Bennett-Foddy-PC1.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Getting-Over-It-with-Bennett-Foddy-PC1.jpg', downloadUrl: 'https://drive.google.com/file/d/1Q4aK_3UTGq_V3IPQy4zSaUyOqH1Uuzqn/view', releaseDate: '2017-12-06', description: { en: 'A frustratingly difficult but addictive platformer where you try to climb a mountain with a hammer while in a pot.', tr: 'Bir tencerenin içinde balyozla dağa tırmanmaya çalıştığınız, sinir bozucu derecede zor ama bağımlılık yapıcı bir platform oyunu.' }, price: 0.00 },
{ id: 'only-up', title: { en: 'Only Up!', tr: 'Only Up!' }, genre: { en: 'Platformer / 3D', tr: 'Platformer / 3D' }, category: { en: 'Simulation', tr: 'Simülasyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6l8u.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2023/05/Only-Up-.jpg', downloadUrl: 'https://drive.google.com/file/d/1nZ1hy78h90rI6u5iKH-Mn9bSK4PUWINm/view', releaseDate: '2023-05-24', description: { en: 'A challenging parkour game where you climb towards the sky, trying not to fall, and where every mistake is costly.', tr: 'Gökyüzüne doğru tırmandığınız, düşmemeye çalıştığınız ve her hatanın bedelinin ağır olduğu zorlu bir parkur oyunu.' }, price: 0.00 },

// Araba Yarışı
{ id: 'most-wanted', title: { en: 'Most Wanted', tr: 'Most Wanted' }, genre: { en: 'Racing / Open World', tr: 'Yarış / Açık Dünya' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/videogamefanon/images/2/28/Nfsmwptii_poster.png/revision/latest?cb=20240314123047', horizontalImageUrl: 'https://images.weserv.nl/?url=https://c4.wallpaperflare.com/wallpaper/259/775/636/bmw-m3-gtr-bmw-need-for-speed-most-wanted-garage-tuning-hd-wallpaper-preview.jpg', downloadUrl: 'https://drive.google.com/drive/folders/1aZJjoQJ20F0YpvCZ7kmu-0f6b3LK_alX', releaseDate: '2005-11-11', description: { en: 'A favorite of speed enthusiasts, the legend of street racing. An open-world experience full of police chases and breathtaking challenges.', tr: 'Hız tutkunlarının vazgeçilmezi, sokak yarışlarının efsanesi. Polis kovalamacaları ve nefes kesen mücadelelerle dolu bir açık dünya deneyimi.' }, price: 0.00 },
{ id: 'blur', title: { en: 'Blur', tr: 'Blur' }, genre: { en: 'Arcade Racing / Combat', tr: 'Arcade Yarış / Savaş' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', downloadUrl: 'https://drive.usercontent.google.com/download?id=1tcdzcnGKfv-j0mqRzJ0lBSV4CrpL47Nw&export=download&authuser=0', releaseDate: '2010-05-25', description: { en: 'An action-packed racing game that combines arcade-style racing with vehicle combat mechanics.', tr: 'Arcade tarzı yarış ile araçlı savaş mekaniklerini birleştiren, aksiyon dolu bir yarış oyunu.' }, price: 0.00 },
{ id: 'underground-2', title: { en: 'Underground 2', tr: 'Underground 2' }, genre: { en: 'Racing / Tuning', tr: 'Yarış / Modifiye' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', horizontalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', downloadUrl: 'https://drive.google.com/file/d/1yy7sqsc-n5H3DGgZ8RyJLYVcEy-2ZnW-/view?usp=drive_link', releaseDate: '2004-11-09', description: { en: 'The legendary street racing game. Modify your car and become the fastest in the city.', tr: 'Efsanevi sokak yarışı oyunu. Arabanı modifiye et ve şehrin en hızlısı ol.' }, price: 0.00,featured: true },
];