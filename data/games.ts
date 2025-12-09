
import { Game } from '../types';

export const initialGames: Game[] = [
  // Featured Game
{
  id: 'minecraft',
  title: { en: 'Minecraft', tr: 'Minecraft' },
  developer: { en: 'Mojang Studios', tr: 'Mojang Studios' },
  publisher: { en: 'Mojang Studios', tr: 'Mojang Studios' },
  genre: { en: 'Sandbox / Survival', tr: 'Sandbox / Hayatta Kalma' },
  category: { en: 'Simulation', tr: 'Simülasyon' },
  platform: 'PC, PS5, Xbox',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/news/m/microsoft-/microsoft-leaks-minecraft-live-reveals-including-creepy-soun_c46b.1280.jpg',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpapercave.com/wp/NjGW245.jpg',
  trailerUrl: 'https://www.youtube.com/watch?v=MmB9b5njVbA',
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
  ],
  systemRequirements: {
    minimum: {
      en: 'OS: Windows 7\nProcessor: Intel Core i3-3210\nMemory: 4 GB RAM\nGraphics: Intel HD 4000\nStorage: 1 GB available space',
      tr: 'OS: Windows 7\nİşlemci: Intel Core i3-3210\nBellek: 4 GB RAM\nEkran Kartı: Intel HD 4000\nDepolama: 1 GB kullanılabilir alan'
    },
    recommended: {
       en: 'OS: Windows 10\nProcessor: Intel Core i5-4690\nMemory: 8 GB RAM\nGraphics: GeForce 700 Series\nStorage: 4 GB available space',
       tr: 'OS: Windows 10\nİşlemci: Intel Core i5-4690\nBellek: 8 GB RAM\nEkran Kartı: GeForce 700 Serisi\nDepolama: 4 GB kullanılabilir alan'
    }
  }
},
{
    id: 'fifa-23',
    title: { en: 'FIFA 23', tr: 'FIFA 23' },
    developer: { en: 'EA Canada', tr: 'EA Canada' },
    publisher: { en: 'Electronic Arts', tr: 'Electronic Arts' },
    genre: { en: 'Sports / Simulation', tr: 'Spor / Simülasyon' },
    category: { en: 'Sports', tr: 'Spor' },
    platform: 'PC, PS5, Xbox',
    verticalImageUrl: 'https://images.weserv.nl/?url=https://assets.goal.com/images/v3/blt679f57c2115ccd2c/GettyImages-1409223178.jpg?format=webp',
    horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1811260/capsule_616x353.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=o3V-GvvzjE4',
    downloadUrl: 'https://gofile.io/d/KE5BX2',
    releaseDate: '2022-09-30',
    description: {
      en: 'FIFA 23 brings The World\'s Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, both the men\'s and women\'s FIFA World Cup™, and more.',
      tr: 'FIFA 23, hem erkekler hem de kadınlar FIFA World Cup™, HyperMotion2 Teknolojisi ve daha fazlasıyla Dünyanın Oyununu sahaya taşıyor.'
    },
    price: 69.99,
    featured: false,
    patchUrl: '#',
    screenshots: [
      'https://images.weserv.nl/?url=https://media.altchar.com/prod/images/gm_featured_image/262f2363565c-fifa-23-screenshot.jpg',
      'https://images.weserv.nl/?url=https://i.ytimg.com/vi/0jlGnVVEvPQ/maxresdefault.jpg',
    ],
    systemRequirements: {
      minimum: {
        en: 'OS: Windows 10 64-bit\nProcessor: Intel Core i5 6600k or AMD Ryzen 5 1600\nMemory: 8 GB RAM\nGraphics: NVIDIA GeForce GTX 1050 Ti or AMD Radeon RX 570\nStorage: 100 GB available space',
        tr: 'OS: Windows 10 64-bit\nİşlemci: Intel Core i5 6600k veya AMD Ryzen 5 1600\nBellek: 8 GB RAM\nEkran Kartı: NVIDIA GeForce GTX 1050 Ti veya AMD Radeon RX 570\nDepolama: 100 GB kullanılabilir alan'
      },
      recommended: {
        en: 'OS: Windows 10 64-bit\nProcessor: Intel Core i7 6700 or AMD Ryzen 7 2700X\nMemory: 12 GB RAM\nGraphics: NVIDIA GeForce GTX 1660 or AMD Radeon RX 5600 XT\nStorage: 100 GB available space',
        tr: 'OS: Windows 10 64-bit\nİşlemci: Intel Core i7 6700 veya AMD Ryzen 7 2700X\nBellek: 12 GB RAM\nEkran Kartı: NVIDIA GeForce GTX 1660 veya AMD Radeon RX 5600 XT\nDepolama: 100 GB kullanılabilir alan'
      }
    }
  },
  {
    id: 'fifa-16',
    title: { en: 'FIFA 16', tr: 'FIFA 16' },
    developer: { en: 'EA Canada', tr: 'EA Canada' },
    publisher: { en: 'Electronic Arts', tr: 'Electronic Arts' },
    genre: { en: 'Sports / Simulation', tr: 'Spor / Simülasyon' },
    category: { en: 'Sports', tr: 'Spor' },
    platform: 'PC, PS4, Xbox One',
    verticalImageUrl: 'https://images.weserv.nl/?url=https://www.fifauteam.com/wp-content/uploads/2015/06/A638-1.jpg',
    horizontalImageUrl: 'https://images.weserv.nl/?url=https://i.ebayimg.com/images/g/XKAAAOSwwVRZky0S/s-l1200.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=bwz98athxQ8',
    downloadUrl: 'https://drive.google.com/file/d/1y0ci2GsB4P1lZR4Ku7JpFSWX8OM14jHB/view',
    releaseDate: '2015-09-22',
    description: {
      en: 'FIFA 16 innovates across the entire pitch to deliver a balanced, authentic, and exciting football experience that lets you play your way. It is the first in the series to include female players.',
      tr: 'FIFA 16, tüm sahada yenilikler yaparak dengeli, otantik ve heyecan verici bir futbol deneyimi sunar. Serinin kadın oyuncuları içeren ilk oyunudur.'
    },
    price: 0.00,
    featured: false,
    patchUrl: '#',
    screenshots: [
    ],
    systemRequirements: {
      minimum: {
        en: 'OS: Windows 7/8/8.1 64-bit\nProcessor: Intel Core i3-2100 @ 3.1GHz\nMemory: 4 GB RAM\nGraphics: ATI Radeon HD 5770, NVIDIA GTX 650\nStorage: 15 GB available space',
        tr: 'OS: Windows 7/8/8.1 64-bit\nİşlemci: Intel Core i3-2100 @ 3.1GHz\nBellek: 4 GB RAM\nEkran Kartı: ATI Radeon HD 5770, NVIDIA GTX 650\nDepolama: 15 GB kullanılabilir alan'
      },
      recommended: {
        en: 'OS: Windows 8/8.1/10 64-bit\nProcessor: Intel i5-2550K @ 3.4Ghz\nMemory: 8 GB RAM\nGraphics: ATI Radeon HD 6870, NVIDIA GTX 460\nStorage: 15 GB available space',
        tr: 'OS: Windows 8/8.1/10 64-bit\nİşlemci: Intel i5-2550K @ 3.4Ghz\nBellek: 8 GB RAM\nEkran Kartı: ATI Radeon HD 6870, NVIDIA GTX 460\nDepolama: 15 GB kullanılabilir alan'
      }
    }
  },
  {
    id: 'fifa-15',
    title: { en: 'FIFA 15', tr: 'FIFA 15' },
    developer: { en: 'EA Canada', tr: 'EA Canada' },
    publisher: { en: 'Electronic Arts', tr: 'Electronic Arts' },
    genre: { en: 'Sports / Simulation', tr: 'Spor / Simülasyon' },
    category: { en: 'Sports', tr: 'Spor' },
    platform: 'PC, PS4, Xbox One',
    verticalImageUrl: 'https://images.weserv.nl/?url=https://www.thesun.co.uk/wp-content/uploads/2022/07/fifa-15-leo-messi-eden-hazard.jpg?strip=all&w=682',
    horizontalImageUrl: 'https://images.weserv.nl/?url=https://fifauteam.com/wp-content/uploads/2014/07/A459-0.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=TnTYVT6lwBc',
    downloadUrl: 'https://drive.google.com/file/d/1XvKnwgytD-QfB3O7bmiZL5g6l8oONa7X/view',
    releaseDate: '2014-09-23',
    description: {
      en: 'FIFA 15 brings soccer to life in stunning detail so fans can experience the emotion of the sport like never before. Witness the intensity of crowds chanting and cheering like on match day.',
      tr: 'FIFA 15, futbolu büyüleyici ayrıntılarla hayata geçiriyor, böylece taraftarlar sporun duygusunu daha önce hiç olmadığı gibi deneyimleyebiliyor. Maç günündeki gibi tezahürat yapan kalabalıkların coşkusuna tanık olun.'
    },
    price: 0.00,
    featured: false,
    patchUrl: '#',
    screenshots: [],
    systemRequirements: {
      minimum: {
        en: 'OS: Windows V/7/8/8.1 64-bit\nProcessor: Intel Q6600 Core2 Quad @ 2.4Ghz\nMemory: 4 GB RAM\nGraphics: ATI Radeon HD 5770, NVIDIA GTX 650\nStorage: 15 GB available space',
        tr: 'OS: Windows V/7/8/8.1 64-bit\nİşlemci: Intel Q6600 Core2 Quad @ 2.4Ghz\nBellek: 4 GB RAM\nEkran Kartı: ATI Radeon HD 5770, NVIDIA GTX 650\nDepolama: 15 GB kullanılabilir alan'
      },
      recommended: {
        en: 'OS: Windows V/7/8/8.1 64-bit\nProcessor: Intel i5-2550K @ 3.4Ghz\nMemory: 8 GB RAM\nGraphics: ATI Radeon HD 6870, NVIDIA GTX 460\nStorage: 15 GB available space',
        tr: 'OS: Windows V/7/8/8.1 64-bit\nİşlemci: Intel i5-2550K @ 3.4Ghz\nBellek: 8 GB RAM\nEkran Kartı: ATI Radeon HD 6870, NVIDIA GTX 460\nDepolama: 15 GB kullanılabilir alan'
      }
    }
  },
{
  id: 'mount-blade-warband',
  title: { en: 'Mount & Blade: Warband', tr: 'Mount & Blade: Warband' },
  developer: { en: 'TaleWorlds Entertainment', tr: 'TaleWorlds Entertainment' },
  publisher: { en: 'Paradox Interactive', tr: 'Paradox Interactive' },
  genre: { en: 'Strategy / RPG', tr: 'Strateji / RPG' },
  category: { en: 'War Games', tr: 'Savaş Oyunları' },
  platform: 'PC',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/tr/9/9d/Mount_%26_Blade_II_-_Bannerlord.jpg',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/48700/capsule_616x353.jpg',
  trailerUrl: 'https://www.youtube.com/watch?v=hwG_o_R3_mI',
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
  ],
  systemRequirements: {
    minimum: {
      en: 'OS: Windows XP\nProcessor: Intel Pentium 4 2.0 GHz\nMemory: 512 MB RAM\nGraphics: 64MB VRAM\nStorage: 1 GB available space',
      tr: 'OS: Windows XP\nİşlemci: Intel Pentium 4 2.0 GHz\nBellek: 512 MB RAM\nEkran Kartı: 64MB VRAM\nDepolama: 1 GB kullanılabilir alan'
    },
    recommended: {
       en: 'OS: Windows 7\nProcessor: Intel Core Duo 2.0 GHz\nMemory: 1 GB RAM\nGraphics: NVIDIA GeForce FX 5200\nStorage: 1 GB available space',
       tr: 'OS: Windows 7\nİşlemci: Intel Core Duo 2.0 GHz\nBellek: 1 GB RAM\nEkran Kartı: NVIDIA GeForce FX 5200\nDepolama: 1 GB kullanılabilir alan'
    }
  }
},
{
  id: 'gta-sanandreas',
  title: { en: 'GTA San Andreas', tr: 'GTA Sanandreas' },
  developer: { en: 'Rockstar North', tr: 'Rockstar North' },
  publisher: { en: 'Rockstar Games', tr: 'Rockstar Games' },
  genre: { en: 'Action / Open World', tr: 'Aksiyon / Açık Dünya' },
  category: { en: 'Action', tr: 'Aksiyon' },
  platform: 'PC, PS2',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ebayimg.com/00/s/NTAwWDM1NA==/z/uYYAAOSwPCVX3l3M/$_12.JPG',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://getwallpapers.com/wallpaper/full/3/c/b/1120096-large-grand-theft-auto-san-andreas-wallpapers-1920x1200-meizu.jpg',
  trailerUrl: 'https://www.youtube.com/watch?v=u_Cb6_f_zQI',
  downloadUrl: 'https://drive.google.com/file/d/1sjV8ft0_X3cQQ2FEvUJaQhOpVb-j-RHz/view?usp=drive_link',
  releaseDate: '2005-06-07',
  description: {
    en: 'A legendary adventure that combines action and story, set in streets full of freedom. Are you ready to take over the city with CJ?',
    tr: 'Özgürlük dolu sokaklarda geçen, aksiyon ve hikayeyi bir araya getiren efsanevi bir macera. CJ ile şehri ele geçirmeye hazır mısın?'
  },
  price: 19.99,
  featured: true,
  screenshots: ['https://cdn.akamai.steamstatic.com/steam/apps/12120/0000000003.1920x1080.jpg?t=1573591461', 'https://cdn.akamai.steamstatic.com/steam/apps/12120/0000000004.1920x1080.jpg?t=1573591461', 'https://cdn.akamai.steamstatic.com/steam/apps/12120/0000000005.1920x1080.jpg?t=1573591461'],
  systemRequirements: {
    minimum: {
      en: 'OS: Windows 2000/XP\nProcessor: 1GHz Pentium III or AMD Athlon\nMemory: 256 MB RAM\nGraphics: 64MB Video Card (Geforce 3 or better)\nStorage: 3.6 GB available space',
      tr: 'OS: Windows 2000/XP\nİşlemci: 1GHz Pentium III veya AMD Athlon\nBellek: 256 MB RAM\nEkran Kartı: 64MB Ekran Kartı (Geforce 3 veya üstü)\nDepolama: 3.6 GB kullanılabilir alan'
    },
    recommended: {
      en: 'OS: Windows 2000/XP\nProcessor: Intel Pentium 4 or AMD Athlon XP\nMemory: 384 MB RAM\nGraphics: 128MB Video Card (Geforce 6 or better)\nStorage: 4.7 GB available space',
      tr: 'OS: Windows 2000/XP\nİşlemci: Intel Pentium 4 veya AMD Athlon XP\nBellek: 384 MB RAM\nEkran Kartı: 128MB Ekran Kartı (Geforce 6 veya üstü)\nDepolama: 4.7 GB kullanılabilir alan'
    }
  }
},

// Savaş Oyunları
{ id: 'counter-strike-1-6', title: { en: 'Counter-Strike 1.6', tr: 'Counter Strike 1.6' }, developer: {en: 'Valve', tr: 'Valve'}, publisher: {en: 'Sierra Studios', tr: 'Sierra Studios'}, genre: { en: 'FPS / Action', tr: 'FPS / Aksiyon' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BOWU1MTVhOTUtNmU0Mi00MWNiLWIyOWQtMDFkOTFmMzc5ZTNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/17EQ0qVctazydRMyD8oMGWFGeUqCl5k6A/view?usp=drive_link', releaseDate: '2000-11-01', description: { en: 'A legendary action experience where competition and tactical intelligence reach their peak.', tr: 'Rekabetin ve taktiksel zekânın zirveye çıktığı, efsaneleşmiş bir aksiyon deneyimidir.' }, price: 9.99, systemRequirements: { minimum: { en: 'OS: Windows 98/ME/2000/XP\nProcessor: 500 MHz\nMemory: 96 MB RAM\nGraphics: 16 MB VRAM\nStorage: 500 MB', tr: 'OS: Windows 98/ME/2000/XP\nİşlemci: 500 MHz\nBellek: 96 MB RAM\nEkran Kartı: 16 MB VRAM\nDepolama: 500 MB' }, recommended: { en: 'OS: Windows XP\nProcessor: 800 MHz\nMemory: 128 MB RAM\nGraphics: 32 MB+ VRAM\nStorage: 500 MB', tr: 'OS: Windows XP\nİşlemci: 800 MHz\nBellek: 128 MB RAM\nEkran Kartı: 32 MB+ VRAM\nDepolama: 500 MB' } } },
{ id: 'point-black-portable', title: { en: 'Point Blank Portable', tr: 'Point Black Portable' }, developer: {en: 'Zepetto', tr: 'Zepetto'}, publisher: {en: 'NCSOFT', tr: 'NCSOFT'}, genre: { en: 'FPS / Action', tr: 'FPS / Aksiyon' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/M/MV5BYjdlZjZlMTQtMTQwNS00MTBjLWE3YjQtM2Y3NjQ5ZWEzMzRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/KzylQy_g5hY/maxresdefault.jpg', downloadUrl: 'https://drive.google.com/file/d/1QPyfg1kP8VEN7LnVGpxfFT8AJGt-v5bW/view?usp=sharing', releaseDate: '2011-01-01', description: { en: 'A clone of CS 1.6.', tr: 'CS 1.6 çakması.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows XP\nProcessor: Pentium 4 2.4Ghz\nMemory: 512 MB RAM\nGraphics: GeForce FX 5700 128MB\nStorage: 1.5 GB', tr: 'OS: Windows XP\nİşlemci: Pentium 4 2.4Ghz\nBellek: 512 MB RAM\nEkran Kartı: GeForce FX 5700 128MB\nDepolama: 1.5 GB' }, recommended: { en: 'OS: Windows 7\nProcessor: Pentium 4 3.0Ghz\nMemory: 1 GB RAM\nGraphics: GeForce 6600 256MB\nStorage: 2 GB', tr: 'OS: Windows 7\nİşlemci: Pentium 4 3.0Ghz\nBellek: 1 GB RAM\nEkran Kartı: GeForce 6600 256MB\nDepolama: 2 GB' } } },
{ id: 'half-life-1', title: { en: 'Half-Life 1', tr: 'Half-Life 1' }, developer: {en: 'Valve', tr: 'Valve'}, publisher: {en: 'Sierra Studios', tr: 'Sierra Studios'}, genre: { en: 'FPS / Sci-Fi', tr: 'FPS / Bilim Kurgu' }, category: { en: 'War Games', tr: 'Savaş Oyunları' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://sm.ign.com/t/ign_tr/screenshot/default/half-life-3_36sx.1280.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1qvB_OOJqVoPLb5JYiOmKYq8tCDn84pts/view', releaseDate: '1998-11-08', description: { en: 'A legendary FPS that shaped the gaming world, combining sci-fi and action.', tr: 'Bilim kurgu ve aksiyonu birleştiren, oyun dünyasına yön vermiş efsanevi bir FPS.' }, price: 14.99, systemRequirements: { minimum: { en: 'OS: Windows 95/98/NT 4.0\nProcessor: 133 MHz\nMemory: 24 MB RAM\nGraphics: SVGA, high color (16-bit)\nStorage: 400 MB', tr: 'OS: Windows 95/98/NT 4.0\nİşlemci: 133 MHz\nBellek: 24 MB RAM\nEkran Kartı: SVGA, high color (16-bit)\nDepolama: 400 MB' }, recommended: { en: 'OS: Windows XP\nProcessor: 300 MHz\nMemory: 32 MB RAM\nGraphics: 16 MB VRAM\nStorage: 400 MB', tr: 'OS: Windows XP\nİşlemci: 300 MHz\nBellek: 32 MB RAM\nEkran Kartı: 16 MB VRAM\nDepolama: 400 MB' } } },

// Strateji / Aksiyon
{ id: 'among-us', title: { en: 'Among Us', tr: 'Among Us' }, developer: {en: 'Innersloth', tr: 'Innersloth'}, publisher: {en: 'Innersloth', tr: 'Innersloth'}, genre: { en: 'Social Deduction', tr: 'Sosyal Çıkarım' }, category: { en: 'Strategy', tr: 'Strateji' }, platform: 'PC, Mobile', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2020/04/Among-Us.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1vl9FlEg36KctzElvmc0DiLuSJuUA3Uq5/view?usp=sharing', releaseDate: '2018-11-16', description: { en: 'A popular social deduction game set on a spaceship, based on teamwork and betrayal.', tr: 'Uzay gemisinde geçen, ekip çalışması ve ihanet üzerine kurulu popüler bir sosyal çıkarım oyunu.' }, price: 4.99, systemRequirements: { minimum: { en: 'OS: Windows 7 SP1+\nProcessor: SSE2 instruction set support\nMemory: 1 GB RAM\nGraphics: DX10 support\nStorage: 250 MB', tr: 'OS: Windows 7 SP1+\nİşlemci: SSE2 komut seti desteği\nBellek: 1 GB RAM\nEkran Kartı: DX10 desteği\nDepolama: 250 MB' }, recommended: { en: 'OS: Windows 10\nProcessor: SSE2 instruction set support\nMemory: 2 GB RAM\nGraphics: DX10 support\nStorage: 250 MB', tr: 'OS: Windows 10\nİşlemci: SSE2 komut seti desteği\nBellek: 2 GB RAM\nEkran Kartı: DX10 desteği\nDepolama: 250 MB' } } },
{ id: 'gang-beasts', title: { en: 'Gang Beasts', tr: 'Gang Beasts' }, developer: {en: 'Boneloaf', tr: 'Boneloaf'}, publisher: {en: 'Double Fine Presents', tr: 'Double Fine Presents'}, genre: { en: 'Party / Physics', tr: 'Parti / Fizik' }, category: { en: 'Action', tr: 'Aksiyon' }, platform: 'PC, PS4', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2019/01/Gang-Beasts4.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/285900/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/drive/folders/1sooBCQv69tis2cbIEc4Jo3ppEMiJ7JVr', releaseDate: '2017-12-12', description: { en: 'A fun, physics-based party game with comical and chaotic fights featuring gelatinous characters.', tr: 'Jelibon gibi karakterlerle komik ve kaotik dövüşlerin yapıldığı, fizik tabanlı eğlenceli bir parti oyunu.' }, price: 14.99, systemRequirements: { minimum: { en: 'OS: Windows 7\nProcessor: 2nd generation Core i3\nMemory: 4 GB RAM\nGraphics: Nvidia 8800 GT\nStorage: 2 GB', tr: 'OS: Windows 7\nİşlemci: 2. nesil Core i3\nBellek: 4 GB RAM\nEkran Kartı: Nvidia 8800 GT\nDepolama: 2 GB' }, recommended: { en: 'OS: Windows 10\nProcessor: Core i5\nMemory: 8 GB RAM\nGraphics: SM4 1GB VRAM\nStorage: 2 GB', tr: 'OS: Windows 10\nİşlemci: Core i5\nBellek: 8 GB RAM\nEkran Kartı: SM4 1GB VRAM\nDepolama: 2 GB' } } },
{ id: 'pico-park', title: { en: 'Pico Park', tr: 'Pico Park' }, developer: {en: 'TECOPARK', tr: 'TECOPARK'}, publisher: {en: 'TECOPARK', tr: 'TECOPARK'}, genre: { en: 'Co-op / Puzzle', tr: 'Co-op / Bulmaca' }, category: { en: 'Action', tr: 'Aksiyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2021/08/PICO-PARK.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1JRoI8k2OBUtH8s36qQHV-0OdmJJjx5lv/view?usp=drive_link', releaseDate: '2016-04-28', description: { en: 'A very fun cooperative action puzzle game where you and your friends need to get the key and reach the goal.', tr: 'Arkadaşlarınızla birlikte anahtarı alıp hedefe ulaşmanız gereken, oldukça eğlenceli bir kooperatif aksiyon bulmaca oyunu.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows 7 or later\nProcessor: Intel Core 2 Duo\nMemory: 1 GB RAM\nGraphics: Any\nStorage: 100 MB', tr: 'OS: Windows 7 veya üstü\nİşlemci: Intel Core 2 Duo\nBellek: 1 GB RAM\nEkran Kartı: Herhangi\nDepolama: 100 MB' }, recommended: { en: 'OS: Windows 10\nProcessor: Intel Core i3\nMemory: 2 GB RAM\nGraphics: Any\nStorage: 100 MB', tr: 'OS: Windows 10\nİşlemci: Intel Core i3\nBellek: 2 GB RAM\nEkran Kartı: Herhangi\nDepolama: 100 MB' } } },

// 2D Oyunlar
{ id: 'stardew-valley', title: { en: 'Stardew Valley', tr: 'Stardew Valley' }, developer: {en: 'ConcernedApe', tr: 'ConcernedApe'}, publisher: {en: 'ConcernedApe', tr: 'ConcernedApe'}, genre: { en: 'Simulation RPG', tr: 'Simülasyon RPG' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://static01.galaxus.com/productimages/4/1/7/4/1/3/2/3/9/3/5/7/0/3/1/4/8/2/9/d51c0e69-a007-4c47-bad1-338a675c0909_cropped.jpg_720.jpeg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1nt4seYRfRYCpVIH1LPtz3y3gagTP_Dg6/view', releaseDate: '2016-02-26', description: { en: 'A peaceful village life simulation intertwining farming, fishing, mining, and social life.', tr: 'Çiftçilik, balıkçılık, madencilik ve sosyal yaşamın iç içe geçtiği huzurlu bir köy hayatı simülasyonu.' }, price: 14.99, systemRequirements: { minimum: { en: 'OS: Windows Vista or greater\nProcessor: 2 Ghz\nMemory: 2 GB RAM\nGraphics: 256 mb video memory, shader model 3.0+\nStorage: 500 MB', tr: 'OS: Windows Vista veya üstü\nİşlemci: 2 Ghz\nBellek: 2 GB RAM\nEkran Kartı: 256 mb video belleği, shader model 3.0+\nDepolama: 500 MB' }, recommended: { en: 'OS: Windows 10\nProcessor: 2.4 Ghz\nMemory: 4 GB RAM\nGraphics: 512 mb video memory, shader model 3.0+\nStorage: 500 MB', tr: 'OS: Windows 10\nİşlemci: 2.4 Ghz\nBellek: 4 GB RAM\nEkran Kartı: 512 mb video belleği, shader model 3.0+\nDepolama: 500 MB' } } },
{ id: 'terraria', title: { en: 'Terraria', tr: 'Terraria' }, developer: {en: 'Re-Logic', tr: 'Re-Logic'}, publisher: {en: 'Re-Logic', tr: 'Re-Logic'}, genre: { en: 'Sandbox / Adventure', tr: 'Sandbox / Macera' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://m.media-amazon.com/images/I/815a-OjJ0SL.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1lBwkYejVPcP0pMnOSCSIkjBDcO3dSetG/view', releaseDate: '2011-05-16', description: { en: 'A 2D sandbox adventure combining exploration, building, and combat. Create your own world and fight enemies.', tr: 'Keşif, inşa ve savaşın birleştiği 2D bir sandbox macerası. Kendi dünyanı yarat ve düşmanlarla savaş.' }, price: 9.99, systemRequirements: { minimum: { en: 'OS: Windows Xp, Vista, 7, 8/8.1, 10\nProcessor: 2.0 Ghz\nMemory: 2.5 GB RAM\nGraphics: 128mb Video Memory, capable of Shader Model 2.0+\nStorage: 200 MB', tr: 'OS: Windows Xp, Vista, 7, 8/8.1, 10\nİşlemci: 2.0 Ghz\nBellek: 2.5 GB RAM\nEkran Kartı: 128mb Video Belleği, Shader Model 2.0+ destekli\nDepolama: 200 MB' }, recommended: { en: 'OS: Windows 7, 8/8.1, 10\nProcessor: Dual Core 3.0 Ghz\nMemory: 4 GB RAM\nGraphics: 256mb Video Memory, capable of Shader Model 2.0+\nStorage: 200 MB', tr: 'OS: Windows 7, 8/8.1, 10\nİşlemci: Çift Çekirdek 3.0 Ghz\nBellek: 4 GB RAM\nEkran Kartı: 256mb Video Belleği, Shader Model 2.0+ destekli\nDepolama: 200 MB' } } },
{ id: 'undertale', title: { en: 'Undertale', tr: 'Undertale' }, developer: {en: 'tobyfox', tr: 'tobyfox'}, publisher: {en: 'tobyfox', tr: 'tobyfox'}, genre: { en: 'RPG', tr: 'RPG' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/Sm6m6_XB8P4/sddefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://wallpaperswide.com/download/undertale_sans-wallpaper-2048x1152.jpg', downloadUrl: 'https://drive.google.com/file/d/1epPqbUNq9pgJKmkFoZdHU2aoi24_14Xi/view', releaseDate: '2015-09-15',featured:true, description: { en: 'A unique RPG experience where your choices change the story. You can befriend monsters instead of fighting them.', tr: 'Seçimlerinin hikayeyi değiştirdiği, eşsiz bir RPG deneyimi. Canavarlarla savaşmak yerine onlarla arkadaş olabilirsin.' }, price: 9.99, systemRequirements: { minimum: { en: 'OS: Windows XP, Vista, 7, 8, or 10\nMemory: 2 GB RAM\nGraphics: 128MB\nStorage: 200 MB', tr: 'OS: Windows XP, Vista, 7, 8, veya 10\nBellek: 2 GB RAM\nEkran Kartı: 128MB\nDepolama: 200 MB' }, recommended: { en: 'OS: Windows XP, Vista, 7, 8, or 10\nProcessor: 2.0 GHz+\nMemory: 3 GB RAM\nGraphics: 256MB\nStorage: 200 MB', tr: 'OS: Windows XP, Vista, 7, 8, veya 10\nİşlemci: 2.0 GHz+\nBellek: 3 GB RAM\nEkran Kartı: 256MB\nDepolama: 200 MB' } } },
{ id: 'hollow-knight', title: { en: 'Hollow Knight', tr: 'Hollow Knight' }, developer: {en: 'Team Cherry', tr: 'Team Cherry'}, publisher: {en: 'Team Cherry', tr: 'Team Cherry'}, genre: { en: 'Metroidvania', tr: 'Metroidvania' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbz5qNiKoSqm1ymVyXQIggcPAP6OssByQ_w&s', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1FX-WymH2hT7IL-b9Wjit9PJ3yS0Z4SVp/view', releaseDate: '2017-02-24', description: { en: 'An atmospheric Metroidvania game set in a mysterious underground world with challenging enemies and secrets to discover.', tr: 'Gizemli bir yeraltı dünyasında geçen, zorlu düşmanlar ve keşfedilmeyi bekleyen sırlar içeren atmosferik bir Metroidvania oyunu.' }, price: 14.99, systemRequirements: { minimum: { en: 'OS: Windows 7\nProcessor: Intel Core 2 Duo E5200\nMemory: 4 GB RAM\nGraphics: GeForce 9800GTX+ (1GB)\nStorage: 9 GB', tr: 'OS: Windows 7\nİşlemci: Intel Core 2 Duo E5200\nBellek: 4 GB RAM\nEkran Kartı: GeForce 9800GTX+ (1GB)\nDepolama: 9 GB' }, recommended: { en: 'OS: Windows 10\nProcessor: Intel Core i5\nMemory: 8 GB RAM\nGraphics: GeForce GTX 560\nStorage: 9 GB', tr: 'OS: Windows 10\nİşlemci: Intel Core i5\nBellek: 8 GB RAM\nEkran Kartı: GeForce GTX 560\nDepolama: 9 GB' } } },
{ id: 'celeste', title: { en: 'Celeste', tr: 'Celeste' }, developer: {en: 'Maddy Makes Games', tr: 'Maddy Makes Games'}, publisher: {en: 'Maddy Makes Games', tr: 'Maddy Makes Games'}, genre: { en: 'Platformer', tr: 'Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Switch', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.ytimg.com/vi/1rwAvUvvQzQ/maxresdefault.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/504230/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/19OpqVx1c4Fn0NJaKcykbu4fmRNYxr40F/view', releaseDate: '2018-01-25', description: { en: 'An addictive adventure game that stands out with its challenging platform mechanics and touching story.', tr: 'Zorlu platform mekanikleri ve dokunaklı hikayesiyle öne çıkan, bağımlılık yapıcı bir macera oyunu.' }, price: 19.99, systemRequirements: { minimum: { en: 'OS: Windows 7 or newer\nProcessor: Intel Core i3 M380\nMemory: 2 GB RAM\nGraphics: OpenGL 3.0+\nStorage: 1.2 GB', tr: 'OS: Windows 7 veya üstü\nİşlemci: Intel Core i3 M380\nBellek: 2 GB RAM\nEkran Kartı: OpenGL 3.0+\nDepolama: 1.2 GB' }, recommended: { en: 'OS: Windows 10\nProcessor: Intel Core i3 M380\nMemory: 4 GB RAM\nGraphics: OpenGL 3.0+\nStorage: 1.2 GB', tr: 'OS: Windows 10\nİşlemci: Intel Core i3 M380\nBellek: 4 GB RAM\nEkran Kartı: OpenGL 3.0+\nDepolama: 1.2 GB' } } },
{ id: 'cuphead', title: { en: 'Cuphead', tr: 'Cuphead' }, developer: {en: 'Studio MDHR', tr: 'Studio MDHR'}, publisher: {en: 'Studio MDHR', tr: 'Studio MDHR'}, genre: { en: 'Run-and-Gun / Platformer', tr: 'Run-and-Gun / Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC, Xbox', verticalImageUrl: 'https://images.weserv.nl/?url=https://cdn2.steamgriddb.com/grid/695fa79993c658afd071d262088d7110.png', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/268910/capsule_616x353.jpg', downloadUrl: 'https://example.com/cuphead', releaseDate: '2017-09-29', description: { en: 'A run-and-gun game famous for its unique visual style inspired by 1930s cartoons and its challenging boss battles.', tr: '1930\'ların çizgi filmlerinden ilham alan eşsiz görsel tarzı ve zorlu boss savaşlarıyla ünlü bir run-and-gun oyunu.' }, price: 19.99, systemRequirements: { minimum: { en: 'OS: Windows 7\nProcessor: Intel Core2 Duo E8400, 3.0GHz\nMemory: 3 GB RAM\nGraphics: GeForce 9600 GT\nStorage: 4 GB', tr: 'OS: Windows 7\nİşlemci: Intel Core2 Duo E8400, 3.0GHz\nBellek: 3 GB RAM\nEkran Kartı: GeForce 9600 GT\nDepolama: 4 GB' }, recommended: { en: 'OS: Windows 10\nProcessor: Intel Core i3 2100\nMemory: 4 GB RAM\nGraphics: AMD HD 3870 512MB\nStorage: 4 GB', tr: 'OS: Windows 10\nİşlemci: Intel Core i3 2100\nBellek: 4 GB RAM\nEkran Kartı: AMD HD 3870 512MB\nDepolama: 4 GB' } } },
{ id: 'geometry-dash', title: { en: 'Geometry Dash', tr: 'Geometry Dash' }, developer: {en: 'RobTop Games', tr: 'RobTop Games'}, publisher: {en: 'RobTop Games', tr: 'RobTop Games'}, genre: { en: 'Rhythm / Platformer', tr: 'Ritim / Platformer' }, category: { en: '2D Games', tr: '2D Oyunlar' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://i.pinimg.com/736x/e9/66/66/e9666654716dad9b13c68ad72b3e8c37.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1Xiu7JBqIQ5ZbJbwZTh9Tlfec92mrUtto/view', releaseDate: '2014-12-22', description: { en: 'A fast-paced platform game based on music rhythm, where you try to complete levels full of obstacles.', tr: 'Müzik ritmine dayalı, engellerle dolu seviyeleri tamamlamaya çalıştığınız hızlı tempolu bir platform oyunu.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows XP\nProcessor: 2.0+ GHz\nMemory: 512 MB RAM\nGraphics: OpenGL 2.0\nStorage: 100 MB', tr: 'OS: Windows XP\nİşlemci: 2.0+ GHz\nBellek: 512 MB RAM\nEkran Kartı: OpenGL 2.0\nDepolama: 100 MB' }, recommended: { en: 'OS: Windows 7 or newer\nProcessor: 2.0+ GHz\nMemory: 1 GB RAM\nGraphics: OpenGL 2.0\nStorage: 100 MB', tr: 'OS: Windows 7 veya üstü\nİşlemci: 2.0+ GHz\nBellek: 1 GB RAM\nEkran Kartı: OpenGL 2.0\nDepolama: 100 MB' } } },

// Simülasyon / Platformer
{
  id: 'ets-2',
  title: { en: 'ETS 2', tr: 'ETS 2' },
  developer: {en: 'SCS Software', tr: 'SCS Software'}, publisher: {en: 'SCS Software', tr: 'SCS Software'},
  genre: { en: 'Simulation / Driving', tr: 'Simülasyon / Sürüş' },
  category: { en: 'Simulation', tr: 'Simülasyon' },
  platform: 'PC',
  verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/euro-truck-simulator-2/images/0/0e/Euro_Truck_Simulator_2_cover.jpg/revision/latest?cb=20210517022450',
  horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/capsule_616x353.jpg',
  downloadUrl: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/',
  releaseDate: '2012-10-18',
  description: { en: 'Travel on European roads as a truck driver, deliver important cargo, and start and grow your own business.', tr: 'Avrupa\'nın yollarında tır şoförü olarak seyahat edin, önemli kargoları teslim ederek kendi işinizi kurun ve büyütün.' },
  price: 24.99,
  systemRequirements: {
    minimum: {
      en: 'OS: Windows 7\nProcessor: Dual core CPU 2.4 GHz\nMemory: 4 GB RAM\nGraphics: GeForce GTS 450-class (Intel HD 4000)\nStorage: 12 GB available space',
      tr: 'OS: Windows 7\nİşlemci: Çift çekirdekli CPU 2.4 GHz\nBellek: 4 GB RAM\nEkran Kartı: GeForce GTS 450-sınıfı (Intel HD 4000)\nDepolama: 12 GB kullanılabilir alan'
    },
    recommended: {
       en: 'OS: Windows 7/8.1/10 64-bit\nProcessor: Quad core CPU 3.0 GHz\nMemory: 6 GB RAM\nGraphics: GeForce GTX 760-class (2 GB)\nStorage: 12 GB available space',
       tr: 'OS: Windows 7/8.1/10 64-bit\nİşlemci: Dört çekirdekli CPU 3.0 GHz\nBellek: 6 GB RAM\nEkran Kartı: GeForce GTX 760-sınıfı (2 GB)\nDepolama: 12 GB kullanılabilir alan'
    }
  }
},
{ id: 'getting-over-it', title: { en: 'Getting Over It with Bennett Foddy', tr: 'Getting Over It with Bennett Foddy' }, developer: {en: 'Bennett Foddy', tr: 'Bennett Foddy'}, publisher: {en: 'Bennett Foddy', tr: 'Bennett Foddy'}, genre: { en: 'Platformer / Physics', tr: 'Platformer / Fizik' }, category: { en: 'Simulation', tr: 'Simülasyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Getting-Over-It-with-Bennett-Foddy-PC1.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/240720/capsule_616x353.jpg', downloadUrl: 'https://drive.google.com/file/d/1Q4aK_3UTGq_V3IPQy4zSaUyOqH1Uuzqn/view', releaseDate: '2017-12-06', description: { en: 'A frustratingly difficult but addictive platformer where you try to climb a mountain with a hammer while in a pot.', tr: 'Bir tencerenin içinde balyozla dağa tırmanmaya çalıştığınız, sinir bozucu derecede zor ama bağımlılık yapıcı bir platform oyunu.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows Vista\nProcessor: 2 GHz Dual Core CPU\nMemory: 2 GB RAM\nGraphics: Intel HD Graphics 4000 or better\nStorage: 2 GB', tr: 'OS: Windows Vista\nİşlemci: 2 GHz Çift Çekirdek CPU\nBellek: 2 GB RAM\nEkran Kartı: Intel HD Graphics 4000 veya daha iyisi\nDepolama: 2 GB' }, recommended: { en: 'OS: Windows 10\nProcessor: 2.5 GHz Dual Core CPU\nMemory: 4 GB RAM\nGraphics: Geforce GTX 970/Radeon RX470 or better\nStorage: 2 GB', tr: 'OS: Windows 10\nİşlemci: 2.5 GHz Çift Çekirdek CPU\nBellek: 4 GB RAM\nEkran Kartı: Geforce GTX 970/Radeon RX470 veya daha iyisi\nDepolama: 2 GB' } } },
{ id: 'only-up', title: { en: 'Only Up!', tr: 'Only Up!' }, developer: {en: 'SCKR Games', tr: 'SCKR Games'}, publisher: {en: 'SCKR Games', tr: 'SCKR Games'}, genre: { en: 'Platformer / 3D', tr: 'Platformer / 3D' }, category: { en: 'Simulation', tr: 'Simülasyon' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6l8u.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2023/05/Only-Up-.jpg', downloadUrl: 'https://drive.google.com/file/d/1nZ1hy78h90rI6u5iKH-Mn9bSK4PUWINm/view', releaseDate: '2023-05-24', description: { en: 'A challenging parkour game where you climb towards the sky, trying not to fall, and where every mistake is costly.', tr: 'Gökyüzüne doğru tırmandığınız, düşmemeye çalıştığınız ve her hatanın bedelinin ağır olduğu zorlu bir parkur oyunu.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows 8/10/11 (64-Bit)\nProcessor: Intel Core i5-6600\nMemory: 8 GB RAM\nGraphics: NVIDIA GEFORCE GTX 970\nStorage: 6 GB', tr: 'OS: Windows 8/10/11 (64-Bit)\nİşlemci: Intel Core i5-6600\nBellek: 8 GB RAM\nEkran Kartı: NVIDIA GEFORCE GTX 970\nDepolama: 6 GB' }, recommended: { en: 'OS: Windows 8/10/11 (64-Bit)\nProcessor: Intel Core i7-8700\nMemory: 16 GB RAM\nGraphics: NVIDIA GEFORCE RTX 2060\nStorage: 6 GB', tr: 'OS: Windows 8/10/11 (64-Bit)\nİşlemci: Intel Core i7-8700\nBellek: 16 GB RAM\nEkran Kartı: NVIDIA GEFORCE RTX 2060\nDepolama: 6 GB' } } },

// Araba Yarışı
{ id: 'most-wanted', title: { en: 'Most Wanted', tr: 'Most Wanted' }, developer: {en: 'EA Black Box', tr: 'EA Black Box'}, publisher: {en: 'Electronic Arts', tr: 'Electronic Arts'}, genre: { en: 'Racing / Open World', tr: 'Yarış / Açık Dünya' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://static.wikia.nocookie.net/videogamefanon/images/2/28/Nfsmwptii_poster.png/revision/latest?cb=20240314123047', horizontalImageUrl: 'https://images.weserv.nl/?url=https://c4.wallpaperflare.com/wallpaper/259/775/636/bmw-m3-gtr-bmw-need-for-speed-most-wanted-garage-tuning-hd-wallpaper-preview.jpg', downloadUrl: 'https://drive.google.com/drive/folders/1aZJjoQJ20F0YpvCZ7kmu-0f6b3LK_alX', releaseDate: '2005-11-11', description: { en: 'A favorite of speed enthusiasts, the legend of street racing. An open-world experience full of police chases and breathtaking challenges.', tr: 'Hız tutkunlarının vazgeçilmezi, sokak yarışlarının efsanesi. Polis kovalamacaları ve nefes kesen mücadelelerle dolu bir açık dünya deneyimi.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows 2000/XP\nProcessor: 1.4 GHz\nMemory: 256 MB RAM\nGraphics: 32 MB VRAM (ATI Radeon 7500+)\nStorage: 3 GB', tr: 'OS: Windows 2000/XP\nİşlemci: 1.4 GHz\nBellek: 256 MB RAM\nEkran Kartı: 32 MB VRAM (ATI Radeon 7500+)\nDepolama: 3 GB' }, recommended: { en: 'OS: Windows XP\nProcessor: 2.2 GHz\nMemory: 512 MB RAM\nGraphics: 64 MB VRAM (NVIDIA GeForce 6200+)\nStorage: 3 GB', tr: 'OS: Windows XP\nİşlemci: 2.2 GHz\nBellek: 512 MB RAM\nEkran Kartı: 64 MB VRAM (NVIDIA GeForce 6200+)\nDepolama: 3 GB' } } },
{ id: 'blur', title: { en: 'Blur', tr: 'Blur' }, developer: {en: 'Bizarre Creations', tr: 'Bizarre Creations'}, publisher: {en: 'Activision', tr: 'Activision'}, genre: { en: 'Arcade Racing / Combat', tr: 'Arcade Yarış / Savaş' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', horizontalImageUrl: 'https://images.weserv.nl/?url=https://www.oyunindir.vip/wp-content/uploads/2018/06/Blur-PC.jpg', downloadUrl: 'https://drive.usercontent.google.com/download?id=1tcdzcnGKfv-j0mqRzJ0lBSV4CrpL47Nw&export=download&authuser=0', releaseDate: '2010-05-25', description: { en: 'An action-packed racing game that combines arcade-style racing with vehicle combat mechanics.', tr: 'Arcade tarzı yarış ile araçlı savaş mekaniklerini birleştiren, aksiyon dolu bir yarış oyunu.' }, price: 0.00, systemRequirements: { minimum: { en: 'OS: Windows XP/Vista/7\nProcessor: Intel Pentium D 3.4GHz\nMemory: 1 GB RAM\nGraphics: 256 MB (NVIDIA 6600GT)\nStorage: 14 GB', tr: 'OS: Windows XP/Vista/7\nİşlemci: Intel Pentium D 3.4GHz\nBellek: 1 GB RAM\nEkran Kartı: 256 MB (NVIDIA 6600GT)\nDepolama: 14 GB' }, recommended: { en: 'OS: Windows 7\nProcessor: Intel Core 2 Duo 2.0GHz\nMemory: 2 GB RAM\nGraphics: 256 MB (NVIDIA 8800GT)\nStorage: 14 GB', tr: 'OS: Windows 7\nİşlemci: Intel Core 2 Duo 2.0GHz\nBellek: 2 GB RAM\nEkran Kartı: 256 MB (NVIDIA 8800GT)\nDepolama: 14 GB' } } },
{ id: 'underground-2', title: { en: 'Underground 2', tr: 'Underground 2' }, developer: {en: 'EA Black Box', tr: 'EA Black Box'}, publisher: {en: 'Electronic Arts', tr: 'Electronic Arts'}, genre: { en: 'Racing / Tuning', tr: 'Yarış / Modifiye' }, category: { en: 'Car Racing', tr: 'Araba Yarışı' }, platform: 'PC', verticalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', horizontalImageUrl: 'https://images.weserv.nl/?url=https://images.steamusercontent.com/ugc/1001394007097934787/32D78B0D33F43AF11F9726C5918BF006C16BACD8/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', downloadUrl: 'https://drive.google.com/file/d/1yy7sqsc-n5H3DGgZ8RyJLYVcEy-2ZnW-/view?usp=drive_link', releaseDate: '2004-11-09', description: { en: 'The legendary street racing game. Modify your car and become the fastest in the city.', tr: 'Efsanevi sokak yarışı oyunu. Arabanı modifiye et ve şehrin en hızlısı ol.' }, price: 0.00,featured: true, systemRequirements: { minimum: { en: 'OS: Windows 98/ME/2000/XP\nProcessor: Pentium III 933 MHz\nMemory: 256 MB RAM\nGraphics: 32 MB VRAM (GeForce2+)\nStorage: 2 GB', tr: 'OS: Windows 98/ME/2000/XP\nİşlemci: Pentium III 933 MHz\nBellek: 256 MB RAM\nEkran Kartı: 32 MB VRAM (GeForce2+)\nDepolama: 2 GB' }, recommended: { en: 'OS: Windows XP\nProcessor: Pentium 4 2.0 GHz\nMemory: 512 MB RAM\nGraphics: 64 MB VRAM (GeForce4+)\nStorage: 2 GB', tr: 'OS: Windows XP\nİşlemci: Pentium 4 2.0 GHz\nBellek: 512 MB RAM\nEkran Kartı: 64 MB VRAM (GeForce4+)\nDepolama: 2 GB' } } },
];
