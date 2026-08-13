export interface SignUpRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    is_admin: boolean;
  };
}

export type SignUpResponse = LoginResponse;

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  is_admin: boolean;
}

export interface Category {
  id: number;
  label: string;
  vat_type: string;
  picture: string;
}

export interface Product {
  id: number;
  label: string;
  is_available: boolean;
  excl_vat_price: number;
  picture?: string;
  category_id: number;
  event_id?: number;
  category?: Category;
}

export interface OrderLine {
  product_id: number;
  purchase_id?: number;
  quantity: number;
  price?: number;
}

export interface Purchase {
  id: number;
  date: string;
  user_id: number;
  is_served: boolean;
  order_line: OrderLine[];
}

export interface Event {
  id: number;
  name: string;
  location: string;
  image?: string;
  is_active: boolean;
  iban: string;
}

export interface Vat {
  type: string;
  rate: number;
}

export interface ImageUploadUrl {
  uploadURL: string;
}

export interface UploadImageResponse {
  url: string;
}

export interface Pagination {
  total: number;
  offset: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
