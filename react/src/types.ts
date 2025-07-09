export interface Script {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image?: string | null;
  images?: string[];
  categories: string[];
  reviews?: Review[];
  user?: User;
  content?: string;
  date?: string;
  seoKeywords?: string[];
  slug: string;
  rating?: number;
  demoVideo?: string;
  video?: string;
  core_features: string;
  key_benefits?: string;
  system_requirements?: string;
  reviews_count?: number; // Added reviews_count to Script type
  new?: boolean;
  bestseller?: boolean;
  category?: string[];
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
  description: string; // Added description field to match API response
  date: string;
}

export interface User {
  name: string;
  avatar?: string;
}