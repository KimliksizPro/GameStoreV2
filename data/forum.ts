
import { ForumTopic } from '../types';

export const initialTopics: ForumTopic[] = [
  {
    id: '1',
    title: { en: 'Game Recommendations', tr: 'Oyun Tavsiyeleri' },
    authorId: 'user1',
    authorName: 'Gamer123',
    avatarUrl: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
    content: {
      en: 'Hello, I\'m looking for medieval-themed strategy games like Mount & Blade: Warband. Do you have any suggestions?',
      tr: 'Selamlar, Mount & Blade: Warband tarzı orta çağ temalı strateji oyunları arıyorum. Önerileriniz var mı?',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: 'c1',
        authorId: 'user2',
        authorName: 'StratejiUstasi',
        avatarUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        content: {
          en: 'You should definitely try Crusader Kings III. It offers deep strategy and dynasty management.',
          tr: 'Crusader Kings III kesinlikle denemelisin. Derinlemesine bir strateji ve hanedan yönetimi sunuyor.',
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'c2',
        authorId: 'user3',
        authorName: 'SavaşçıKız',
        avatarUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        content: {
          en: 'If you like action, you can also check out Chivalry 2. It has very fun combat mechanics.',
          tr: 'Eğer aksiyon seviyorsan Chivalry 2\'ye de bakabilirsin. Çok eğlenceli savaş mekanikleri var.',
        },
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
  {
    id: '2',
    title: { en: 'Technical Support & Bugs', tr: 'Teknik Destek ve Hatalar' },
    authorId: 'user3',
    authorName: 'BugAvcısı',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
    content: {
      en: 'My game keeps crashing while playing ETS 2. Has anyone experienced a similar issue or knows a solution?',
      tr: 'ETS 2 oynarken oyunum sürekli çöküyor. Benzer bir sorun yaşayan veya çözümünü bilen var mı?',
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: '3',
    title: { en: 'Who is your favorite character in Stardew Valley?', tr: 'Stardew Valley\'de en sevdiğiniz karakter kim?' },
    authorId: 'user2',
    authorName: 'ÇiftçiHayranı',
    avatarUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    content: {
      en: 'My favorite is definitely Abigail. She\'s adventurous and an interesting character. Who are your favorites and why?',
      tr: 'Benim favorim kesinlikle Abigail. Macera ruhlu ve ilginç bir karakter. Sizin favorileriniz kimler ve neden?',
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
       {
        id: 'c3',
        authorId: 'user1',
        authorName: 'Gamer123',
        avatarUrl: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
        content: {
          en: 'Leah! I love her artistic spirit and her life intertwined with nature.',
          tr: 'Leah! Sanatçı ruhu ve doğayla iç içe yaşaması çok hoşuma gidiyor.',
        },
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
  }
];