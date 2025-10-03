import { rewardType } from '@/types/reward';

export const MOCK_REWARDS: rewardType[] = [
  {
    id: '1',
    name: 'Premium Pet Store Gift Card',
    description:
      'Redeem for premium pet supplies, organic food, toys and accessories at participating pet stores nationwide. This gift card can be used at over 500 pet stores across the country, giving you access to the best quality products for your furry friends. Perfect for purchasing high-end pet food, toys, grooming supplies, and accessories.',
    points: 1000,
    stock: 50,
  },
  {
    id: '2',
    name: 'Animal Shelter Donation',
    description:
      'Make a positive impact by contributing to local animal shelters to help rescue and care for homeless pets. Your donation will go directly towards providing food, medical care, and shelter for animals in need. Every point you redeem helps us save more lives and find loving homes for abandoned pets.',
    points: 250,
    stock: 200,
  },
  {
    id: '3',
    name: 'Professional Pet Grooming',
    description:
      "Full-service professional grooming package including bath, nail trim, ear cleaning, and styling for your pet. Our certified groomers use only the best products and techniques to ensure your pet looks and feels their best. The service includes a relaxing bath with premium shampoo, thorough brushing, nail clipping, ear cleaning, and a stylish cut tailored to your pet's breed and personality.",
    points: 800,
    stock: 25,
  },
  {
    id: '4',
    name: 'Veterinary Care Voucher',
    description:
      '30% discount voucher for veterinary checkups, vaccinations, and basic medical consultations at partner clinics. This voucher covers routine health examinations, annual vaccinations, basic diagnostic tests, and consultation fees. Valid at over 200 veterinary clinics nationwide and can be used within 12 months of redemption.',
    points: 600,
    stock: 75,
  },
  {
    id: '5',
    name: 'Pet Training Course Bundle',
    description:
      'Complete pet training course package including basic obedience, behavioral training, and socialization sessions. This comprehensive program includes 8 weeks of professional training sessions with certified animal behaviorists. Covers essential commands, house training, leash walking, and social skills development. Perfect for puppies and adult dogs alike.',
    points: 1200,
    stock: 15,
  },
  {
    id: '6',
    name: 'Custom Pet Portrait',
    description:
      'Commission a custom hand-painted portrait of your pet by a professional artist, perfect for home decor. Each portrait is uniquely crafted using high-quality materials and can be customized in various styles including realistic, cartoon, or artistic interpretations. Delivered as a high-resolution digital file and optional physical print.',
    points: 1500,
    stock: 10,
  },
  {
    id: '7',
    name: 'Luxury Pet Bed',
    description:
      'High-quality, orthopedic pet bed designed for maximum comfort and support for pets of all sizes. Made with memory foam and premium materials to provide optimal joint support and temperature regulation. Machine washable cover included. Available in multiple sizes and colors to match your home decor.',
    points: 700,
    stock: 30,
  },
];

// API simulation functions
export const fetchRewards = async (): Promise<rewardType[]> => {
  return MOCK_REWARDS;
};

export const fetchRewardById = async (
  id: string,
): Promise<rewardType | null> => {
  return MOCK_REWARDS.find((reward) => reward.id === id) || null;
};
