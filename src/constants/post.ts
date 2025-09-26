import { type Post, type LostPost } from '@/types/post';

export const MOCK_LOST_POSTS: LostPost[] = [
  {
    post_Id: 1,
    name: 'Whiskers',
    bounty: 500,
    microchip: '982000123456789',
    returned: false,
  },
  {
    post_Id: 2,
    name: 'Buddy',
    bounty: 750,
    microchip: '982000987654321',
    returned: false,
  },
  { post_Id: 3, name: 'Luna', bounty: 300, returned: false },
  {
    post_Id: 4,
    name: 'Max',
    bounty: 1000,
    microchip: '982000555666777',
    returned: false,
  },
  { post_Id: 5, name: 'Mittens', bounty: 400, returned: false },
];

export const MOCK_FEED_POSTS: Post[] = [
  {
    id: 1,
    user_id: 101,
    type: 'cat',
    breed: 'Persian',
    gender: 'female',
    description:
      "My beloved cat went missing yesterday. She's very friendly and responds to her name. Last seen near Brooklyn Heights.",
    image: '/images/onboarding/pet.svg',
    images: [
      '/images/onboarding/pet.svg',
      '/images/onboarding/pet-2.svg',
      '/images/onboarding/pet-3.svg',
    ],
    is_lost: true,
    timeAgo: '15 hours ago',
    reports: 0,
  },
  {
    id: 2,
    user_id: 102,
    type: 'cat',
    breed: 'Maine Coon',
    gender: 'male',
    description:
      'Found this little one wandering around Central Park. Very cute and seems lost. Please help me find the owner.',
    image: '/images/onboarding/pet-2.svg',
    images: ['/images/onboarding/pet-2.svg', '/images/onboarding/pet.svg'],
    is_lost: false,
    timeAgo: '6 hours ago',
    reports: 1,
  },
  {
    id: 3,
    user_id: 103,
    type: 'dog',
    breed: 'Golden Retriever',
    gender: 'male',
    description:
      'Found this friendly golden retriever near the playground in Manhattan. Very well-behaved and has a blue collar.',
    image: '/images/onboarding/pet-3.svg',
    images: [
      '/images/onboarding/pet-3.svg',
      '/images/onboarding/pet-2.svg',
      '/images/onboarding/pet.svg',
    ],
    is_lost: false,
    timeAgo: '2 hours ago',
    reports: 2,
  },
  {
    id: 4,
    user_id: 104,
    type: 'dog',
    breed: 'German Shepherd',
    gender: 'female',
    description:
      'Lost my German Shepherd Max from our backyard in Queens. She has a blue collar and is microchipped. Please contact if found.',
    image: '/images/onboarding/pet.svg',
    images: ['/images/onboarding/pet.svg', '/images/onboarding/pet-3.svg'],
    is_lost: true,
    timeAgo: '1 day ago',
    reports: 0,
  },
  {
    id: 5,
    user_id: 105,
    type: 'cat',
    breed: 'Siamese',
    gender: 'unknown',
    description:
      'Found this beautiful Siamese cat near Times Square. Very friendly and well-groomed. Looking for the owner.',
    image: '/images/onboarding/pet-2.svg',
    images: ['/images/onboarding/pet-2.svg', '/images/onboarding/pet.svg'],
    is_lost: false,
    timeAgo: '3 hours ago',
    reports: 3,
  },
];
