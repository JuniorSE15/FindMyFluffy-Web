import { LatLng } from 'leaflet';

// Pin data with relative offsets (lat/lng deltas) from current location
// These offsets represent different distances and directions from user's position
export const NEARBY_PINS_OFFSETS = [
  {
    id: 1,
    offset: { lat: 0.001358, lng: 0.001581 }, // ~200m North-East
    title: 'Lost Golden Retriever',
    description:
      "Friendly golden retriever, answers to 'Max'. Last seen in nearby park.",
    type: 'lost' as const,
    date: '2 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    offset: { lat: -0.002478, lng: -0.002219 }, // ~350m South-West
    title: 'Found Cat',
    description:
      'Orange tabby cat found near shopping area. Very friendly, wearing a blue collar.',
    type: 'found' as const,
    date: '5 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    offset: { lat: 0.003602, lng: -0.000889 }, // ~400m North
    title: 'Missing Siamese Cat',
    description:
      "Blue-eyed Siamese cat named 'Luna'. Last seen in residential area.",
    type: 'lost' as const,
    date: '1 day ago',
    imageUrl:
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    offset: { lat: -0.003312, lng: 0.001624 }, // ~380m South-East
    title: 'Found Small Dog',
    description:
      'Small brown dog found near transit station. No collar, very gentle.',
    type: 'found' as const,
    date: '3 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    offset: { lat: 0.002288, lng: -0.003339 }, // ~420m North-West
    title: 'Lost Parrot',
    description: 'Green parrot escaped from balcony. Knows a few words.',
    type: 'lost' as const,
    date: '6 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: 6,
    offset: { lat: -0.000783, lng: 0.003031 }, // ~320m East
    title: 'Found Rabbit',
    description:
      'White rabbit found in local park. Appears to be domesticated.',
    type: 'found' as const,
    date: '4 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 7,
    offset: { lat: -0.004445, lng: -0.001138 }, // ~460m South
    title: 'Lost Husky',
    description: 'Siberian Husky named "Snow". Very friendly but may be tired.',
    type: 'lost' as const,
    date: '8 hours ago',
    imageUrl:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 8,
    offset: { lat: 0.004417, lng: 0.000598 }, // ~450m North
    title: 'Found Hamster',
    description: 'Small golden hamster found near monument. In good condition.',
    type: 'found' as const,
    date: '1 hour ago',
    imageUrl:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=100&h=100&fit=crop&crop=center',
  },
];

// Helper function to convert offsets to absolute positions
export const createPinWithPosition = (
  pin: (typeof NEARBY_PINS_OFFSETS)[0],
  currentLocation: LatLng,
) => ({
  ...pin,
  position: new LatLng(
    currentLocation.lat + pin.offset.lat,
    currentLocation.lng + pin.offset.lng,
  ),
});

// For backward compatibility, keep NEARBY_PINS that uses default center
const DEFAULT_CENTER = new LatLng(13.736717, 100.523186);
export const NEARBY_PINS = NEARBY_PINS_OFFSETS.map((pin) =>
  createPinWithPosition(pin, DEFAULT_CENTER),
);
