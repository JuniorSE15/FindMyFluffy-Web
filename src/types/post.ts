export type Post = {
  id: number;
  user_id: number;
  type: string;
  breed?: string;
  gender: 'male' | 'female' | 'unknown';
  description: string;
  image: string;
  images?: string[];
  online_post?: string;
  is_lost: boolean;
  timeAgo?: string;
  reports?: number;
};

export type LostPost = {
  post_Id: number;
  name: string;
  bounty?: number;
  microchip?: string;
  returned: boolean;
};

export type FoundPetPostResponse = {
  id: string;
  postId: string;
  catched: boolean;
  userId: string;
  title: string;
  type: string;
  breed?: string;
  gender: number;
  description?: string;
  image?: string;
  onlinePost?: string;
  isLost: boolean;
  latitude: number;
  longitude: number;
  postDatetime: string;
  name: string;
};

export type FoundPetPostFormData = {
  catched: boolean;
  userId: string;
  title: string;
  type: string;
  breed?: string;
  gender: number;
  description?: string;
  onlinePost?: string;
  isLost: boolean;
  latitude: number;
  longitude: number;
  postDatetime: string;
  images?: File[];
};

export type LostPetPostResponse = {
  id: string;
  postId: string;
  userId: string;
  title: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
  gender: number;
  microchip?: string;
  description?: string;
  onlinePost?: string;
  isLost: boolean;
  bounty?: number;
  latitude: number;
  longitude: number;
  postDatetime: string;
  returned: boolean;
};

export type LostPetPostFormData = {
  userId: string;
  title: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
  gender: number;
  microchip?: string;
  description?: string;
  onlinePost?: string;
  isLost: boolean;
  bounty?: number;
  latitude: number;
  longitude: number;
  postDatetime: string;
  images?: File[];
};

export type PostQueryParams = {
  isLost?: boolean;
  limit?: number;
  userId?: string;
};
