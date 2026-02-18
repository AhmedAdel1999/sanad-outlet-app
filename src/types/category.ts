// Common Types
export interface Pagination {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: any[];
}

export interface CategoryUrls {
  customer: string;
  admin: string;
}

export interface ShowIn {
  app: boolean;
  salla_points?: boolean;
}

export interface CategoryMetadata {
  title: string;
  description: string;
  url: string;
}

export interface CategoryTranslation {
  name: string;
  metadata_title: string;
  metadata_description: string;
  metadata_url: string;
}

export interface CategoryTranslations {
  [languageCode: string]: CategoryTranslation;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  image: string | null;
  urls: CategoryUrls;
  parent_id: number;
  sort_order: number;
  status: "active" | "hidden";
  show_in: ShowIn;
  has_hidden_products: boolean;
  update_at: string;
  metadata: CategoryMetadata;
  sub_categories: Category[];
}

// Category List Item (for GET all categories)
export interface CategoryListItem {
  id: number;
  name: string;
  image: string | null;
  urls: CategoryUrls;
  parent_id: number;
  sort_order: number;
  status: "active" | "hidden";
  show_in: ShowIn;
  has_hidden_products: boolean;
  update_at: string;
  metadata: CategoryMetadata;
  sub_categories: Category[];
}

// Category Children Item
export interface CategoryChild {
  id: number;
  name: string;
  urls: CategoryUrls;
  sort_order: number;
  items: any[];
}

// Category Product Item
export interface CategoryProduct {
  id: number;
  name: string;
  image: string;
  sort: number;
}

// Create Category Request
export interface CreateCategoryRequest {
  name: string;
  status: "active" | "hidden";
  image: string;
  metadata_title: string;
  metadata_description: string;
  metadata_url: string;
  show_in: {
    app: boolean;
  };
  translations?: CategoryTranslations;
}

// Update Category Request
export interface UpdateCategoryRequest {
  name?: string;
  image?: string;
  status?: "active" | "hidden";
  metadata_title?: string;
  metadata_description?: string;
  metadata_url?: string;
  show_in?: {
    app: boolean;
  };
  products?: Array<{
    id: number;
    sort: number;
  }>;
  translations?: CategoryTranslations;
}

// API Response Types
export interface CategoryListResponse {
  status: number;
  success: boolean;
  data: CategoryListItem[];
  pagination: Pagination;
}

export interface CategoryDetailResponse {
  status: number;
  success: boolean;
  data: Category;
}

export interface CategoryChildrenResponse {
  status: number;
  success: boolean;
  data: CategoryChild[];
  pagination: Pagination;
}

export interface CategoryProductsResponse {
  status: number;
  success: boolean;
  data: CategoryProduct[];
  pagination: Pagination;
}
