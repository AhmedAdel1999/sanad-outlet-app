// Common Types
export interface Amount {
  amount: number;
  currency: string;
}

export interface Pagination {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: Record<string, string> | any[];
}

export interface DateObject {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface ProductUrls {
  customer: string;
  admin: string;
}

// Promotion
export interface Promotion {
  title: string;
  sub_title: string;
}

// Metadata
export interface ProductMetadata {
  title: string;
  description: string;
  url?: string;
}

// Rating
export interface Rating {
  total: number;
  count: number;
  rate: number;
}

// Product Images
export interface ProductImage {
  id: number;
  url: string;
  main: boolean;
  three_d_image_url: string;
  alt: string;
  video_url: string;
  type: "image" | "video";
  sort: number;
}

// Product Options
export interface OptionTranslation {
  option_name: string;
  description: string;
}

export interface OptionValueTranslation {
  option_details_name: string;
}

export interface OptionValue {
  id: number;
  name: string;
  price: Amount;
  formatted_price?: string;
  display_value: string;
  advance: boolean;
  option_id: number;
  image_url: string;
  hashed_display_value: string;
  translations: Record<string, OptionValueTranslation>;
  is_default?: boolean;
  is_out_of_stock?: boolean;
}

export interface ProductOption {
  id: number;
  name: string;
  description: string;
  type:
    | "radio"
    | "checkbox"
    | "text"
    | "textarea"
    | "date"
    | "time"
    | "datetime";
  required: boolean;
  associated_with_order_time: number;
  availability_range: boolean;
  not_same_day_order: boolean;
  choose_date_time: boolean;
  from_date_time: string;
  to_date_time: string;
  sort: number;
  advance: boolean;
  display_type: "text" | "color" | "image";
  visibility: "always" | "out_of_stock" | "in_stock";
  translations: Record<string, OptionTranslation>;
  values: OptionValue[];
}

// Product SKUs
export interface ProductSku {
  id: number;
  price: Amount;
  regular_price: Amount;
  cost_price: Amount;
  sale_price: Amount | Record<string, never>;
  has_special_price?: boolean;
  stock_quantity: number | string;
  unlimited_quantity: boolean;
  notify_low: string;
  barcode: string;
  sku: string;
  mpn: string;
  gtin: string;
  related_options: number[];
  related_option_values: number[];
  weight: number;
  weight_type: "kg" | "g" | "lb" | "oz";
  weight_label: string;
  is_user_subscribed_to_sku?: boolean;
  is_default?: boolean;
}

// Scoped Prices
export interface ScopedPrice {
  scope_id: number;
  price: number;
  cost_price: number;
  sale_price: number | null;
  sale_end: string | null;
  sale_start: string | null;
  currency: string;
}

// Services Blocks
export interface ServicesBlocks {
  installments: any[];
}

// Product Categories
export interface ProductCategory {
  id: number;
  name: string;
  urls: ProductUrls;
  items: any[];
  parent_id: number;
  status: "active" | "hidden";
  sort_order: number;
  update_at: DateObject;
}

// Full Product Detail
export interface Product {
  id: number;
  promotion: Promotion;
  sku: string;
  thumbnail: string;
  mpn: string;
  gtin: string;
  type:
    | "product"
    | "service"
    | "digital"
    | "codes"
    | "group_products"
    | "booking"
    | "food";
  name: string;
  short_link_code: string;
  urls: ProductUrls;
  price: Amount;
  taxed_price: Amount;
  pre_tax_price: Amount;
  tax: Amount;
  description: string;
  quantity: number | string;
  status: "sale" | "out" | "hidden";
  is_available: boolean;
  views: number;
  sale_price: Amount;
  sale_end: string | Record<string, never>;
  require_shipping: boolean;
  cost_price: string;
  weight: number;
  weight_type: "kg" | "g" | "lb" | "oz";
  with_tax: boolean;
  url: string;
  main_image: string;
  images: ProductImage[];
  sold_quantity: number | string;
  rating: Rating;
  regular_price: Amount;
  max_items_per_user: number;
  maximum_quantity_per_order: number | string;
  show_in_app: boolean;
  notify_quantity: string;
  hide_quantity: boolean;
  unlimited_quantity: boolean;
  managed_by_branches: boolean;
  services_blocks: ServicesBlocks;
  calories: number | string;
  customized_sku_quantity?: boolean;
  channels: string[];
  metadata: ProductMetadata;
  scoped_prices?: ScopedPrice[];
  allow_attachments: boolean;
  is_pinned: boolean;
  pinned_date: string;
  sort: number;
  enable_upload_image: boolean;
  updated_at: string;
  options: ProductOption[];
  skus: ProductSku[];
  categories: ProductCategory[];
  brand?: Record<string, any>;
  tags: number[];
  starting_price?: Amount | Record<string, never>;
}

// Product List Item (for GET all products)
export interface ProductListItem {
  id: number;
  promotion: Promotion;
  sku: string;
  thumbnail: string;
  mpn: string;
  gtin: string;
  type: string;
  name: string;
  short_link_code: string;
  urls: ProductUrls;
  price: Amount;
  taxed_price: Amount;
  pre_tax_price: Amount;
  tax: Amount;
  description: string;
  quantity: number | string;
  status: "sale" | "out" | "hidden";
  is_available: boolean;
  views: number;
  sale_price: Amount;
  sale_end: string | Record<string, never>;
  require_shipping: boolean;
  cost_price: string;
  weight: number;
  weight_type: string;
  with_tax: boolean;
  url: string;
  main_image: string;
  images: ProductImage[];
  sold_quantity: number | string;
  rating: Rating;
  regular_price: Amount;
  max_items_per_user: number;
  maximum_quantity_per_order: number | string;
  show_in_app: boolean;
  notify_quantity: string;
  hide_quantity: boolean;
  unlimited_quantity: boolean;
  managed_by_branches: boolean;
  services_blocks: ServicesBlocks;
  calories: number | string;
  starting_price?: Amount | Record<string, never>;
  metadata: ProductMetadata;
  allow_attachments: boolean;
  is_pinned: boolean;
  pinned_date: string;
  sort: number;
  enable_upload_image: boolean;
  updated_at: string;
  options: ProductOption[];
  skus: ProductSku[];
  categories: ProductCategory[];
  brand?: Record<string, any>;
  tags: number[];
}

// Create Product Request
export interface CreateProductRequest {
  name: string;
  type?:
    | "product"
    | "service"
    | "digital"
    | "codes"
    | "group_products"
    | "booking"
    | "food";
  description?: string;
  price: number;
  sale_price?: number;
  cost_price?: number;
  sku?: string;
  mpn?: string;
  gtin?: string;
  quantity?: number;
  unlimited_quantity?: boolean;
  weight?: number;
  weight_type?: "kg" | "g" | "lb" | "oz";
  require_shipping?: boolean;
  status?: "sale" | "out" | "hidden";
  with_tax?: boolean;
  show_in_app?: boolean;
  hide_quantity?: boolean;
  maximum_quantity_per_order?: number;
  notify_quantity?: number;
  sale_end?: string;
  promotion_title?: string;
  promotion_sub_title?: string;
  categories?: number[];
  images?: string[];
  options?: Array<{
    name: string;
    type: string;
    required?: boolean;
    values: Array<{
      name: string;
      price?: number;
    }>;
  }>;
  metadata_title?: string;
  metadata_description?: string;
  metadata_url?: string;
  calories?: number;
  enable_upload_image?: boolean;
  allow_attachments?: boolean;
  tags?: number[];
}

// Update Product Request
export interface UpdateProductRequest {
  name?: string;
  type?:
    | "product"
    | "service"
    | "digital"
    | "codes"
    | "group_products"
    | "booking"
    | "food";
  description?: string;
  price?: number;
  sale_price?: number;
  cost_price?: number;
  sku?: string;
  mpn?: string;
  gtin?: string;
  quantity?: number;
  unlimited_quantity?: boolean;
  weight?: number;
  weight_type?: "kg" | "g" | "lb" | "oz";
  require_shipping?: boolean;
  status?: "sale" | "out" | "hidden";
  with_tax?: boolean;
  show_in_app?: boolean;
  hide_quantity?: boolean;
  maximum_quantity_per_order?: number;
  notify_quantity?: number;
  sale_end?: string;
  promotion_title?: string;
  promotion_sub_title?: string;
  categories?: number[];
  images?: string[];
  metadata_title?: string;
  metadata_description?: string;
  metadata_url?: string;
  calories?: number;
  enable_upload_image?: boolean;
  allow_attachments?: boolean;
  tags?: number[];
  is_pinned?: boolean;
}

// API Response Types
export interface ProductListResponse {
  status: number;
  success: boolean;
  data: ProductListItem[];
  pagination: Pagination;
}

export interface ProductDetailResponse {
  status: number;
  success: boolean;
  data: Product;
}
