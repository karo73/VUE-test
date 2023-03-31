import { AdvertServiceType } from '@/enums/advertServiceType';
import type { IAdvert } from '@/types/avdert';
import { citiesMock } from './cityMock';
import { usersMock } from './usersMock';

export const advertListMock: IAdvert[] = [
  {
    id: 0,
    user: usersMock[0],
    city: citiesMock[0],
    date: new Date(2023, 2, 20, 9, 17),
    serviceType: AdvertServiceType.barber,
    header: 'Мужская и женская стрижка',
    post: `Всем привет 🙂
    Меня зовут Анна и вот уже 10 лет я стою на страже красивых волос✨`,
  },
  {
    id: 1,
    user: usersMock[1],
    city: citiesMock[1],
    date: new Date(2023, 2, 19, 15, 44),
    serviceType: AdvertServiceType.cleaning,
    header: 'Уборка жилых помещений',
    post: `Уберусь в вашем доме. Постираю, поглажу, влажная уборка и уборка любых видов. Могу приготовить еду.
    В общем и целом любые виды помощи.`,
  },
  {
    id: 2,
    user: usersMock[2],
    city: citiesMock[2],
    date: new Date(2023, 2, 18, 14, 25),
    serviceType: AdvertServiceType.photoVideo,
    header: 'Профессиональный фотограф',
    post: `Привет! Меня зовут Евгений и я профессиональный фотограф.
    Снимаю индивидуальные и парные фотосессии. Помогу составить образ и подскажу что делать во время съемки! `,
  },
  {
    id: 3,
    user: usersMock[2],
    city: citiesMock[2],
    date: new Date(2023, 2, 18),
    serviceType: AdvertServiceType.tutoring,
    header: 'Обучение игре на гитаре',
    post: `Всем привет, предлагаю услуги обучение игре на гитаре для взрослых и детей от 6ти лет, программу обучения подбираю каждому ученику индивидуально, в зависимости от потребностей.`,
  },
];
