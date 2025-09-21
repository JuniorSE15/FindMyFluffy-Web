export type Post = {
  id: number;
  user_id: number;
  type: string;
  breed?: string;
  gender: 'male' | 'female' | 'unknown';
  description: string;
  image: string;
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
