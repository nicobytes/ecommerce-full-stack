export interface Category {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  slug?: string;
  creationAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRta {
  access_token: string;
}
