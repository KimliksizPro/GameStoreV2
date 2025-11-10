import { ForumTopic } from '../types';

export const initialTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Oyun Tavsiyeleri',
    author: 'Gamer123',
    avatarUrl: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
    content: 'Selamlar, Mount & Blade: Warband tarzı orta çağ temalı strateji oyunları arıyorum. Önerileriniz var mı?',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: 'c1',
        author: 'StratejiUstasi',
        avatarUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        content: 'Crusader Kings III kesinlikle denemelisin. Derinlemesine bir strateji ve hanedan yönetimi sunuyor.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'c2',
        author: 'SavaşçıKız',
        avatarUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        content: 'Eğer aksiyon seviyorsan Chivalry 2\'ye de bakabilirsin. Çok eğlenceli savaş mekanikleri var.',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
  {
    id: '2',
    title: 'Teknik Destek ve Hatalar',
    author: 'BugAvcısı',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
    content: 'ETS 2 oynarken oyunum sürekli çöküyor. Benzer bir sorun yaşayan veya çözümünü bilen var mı?',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: '3',
    title: 'Stardew Valley\'de en sevdiğiniz karakter kim?',
    author: 'ÇiftçiHayranı',
    avatarUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    content: 'Benim favorim kesinlikle Abigail. Macera ruhlu ve ilginç bir karakter. Sizin favorileriniz kimler ve neden?',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
       {
        id: 'c3',
        author: 'Gamer123',
        avatarUrl: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
        content: 'Leah! Sanatçı ruhu ve doğayla iç içe yaşaması çok hoşuma gidiyor.',
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
  }
];
