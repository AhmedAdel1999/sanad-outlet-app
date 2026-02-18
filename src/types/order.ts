// Common Types
export interface Amount {
  amount: number;
  currency: string;
}

export interface DateObject {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

// Customer Types
export interface Customer {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  mobile: string | number;
  mobile_code?: string;
  email: string;
  urls?: {
    customer: string;
    admin: string;
    digital_content: string;
  };
  avatar?: string;
  gender?: string;
  birthday?: DateObject;
  city?: string;
  country?: string;
  country_code?: string;
  currency?: string;
  location?: string;
  updated_at?: DateObject;
}

export interface Receiver {
  name: string;
  email: string;
  phone: string;
  country_code?: string;
  notify?: boolean;
}

// Address Types
export interface ShippingAddress {
  country: number;
  city: number;
  district: number;
  block: string;
  street_number: string;
  address: string;
  address_line: string;
  postal_code: string;
  geo_coordinates: GeoCoordinates;
}

// Status Types
export interface OrderStatus {
  id: number;
  name: string;
  slug: string;
  customized: {
    id: number;
    name: string;
  };
}

// Payment Types
export interface CashOnDelivery {
  amount: number;
  currency: string;
}

export interface PaymentDetails {
  status: string;
  method: string;
  store_bank_id?: number;
  receipt_image_path?: string;
  accepted_methods?: string[];
  cash_on_delivery?: CashOnDelivery;
}

// Product Types
export interface ProductOption {
  id: number;
  value: string[];
}

export interface ProductRecurring {
  slug: string;
  interval_unit: string;
  interval_count: number;
  meta?: {
    note: string;
  };
}

export interface OrderProduct {
  identifier_type: "id" | "sku";
  identifier: number | string;
  quantity: number;
  options?: ProductOption[];
  recurring?: ProductRecurring;
}

export interface OrderItem {
  name: string;
  quantity: number;
  thumbnail?: string;
}

// Discount Types
export interface Discount {
  title: string;
  type: string;
  code: string;
  discount: string;
  currency: string;
  discounted_shipping: string;
  hasMarketing: boolean;
}

// Amount Details
export interface OrderAmounts {
  sub_total: Amount;
  shipping_cost: Amount;
  cash_on_delivery: Amount;
  tax: {
    percent: string;
    amount: Amount;
  };
  discounts: Discount[];
  total: Amount;
}

// Features and Actions
export interface OrderFeatures {
  shippable: boolean;
  digitalable: boolean;
  multiple_shipments_supported?: boolean;
  order_type_price_quote?: boolean;
  has_suspicious_alert: boolean;
}

export interface OrderActions {
  cancellable: boolean;
  reorderable: boolean;
  payable: boolean;
}

// URLs
export interface OrderUrls {
  customer: string;
  admin: string;
  digital_content: string;
  rating?: string;
  checkout?: string;
}

// Source Details
export interface SourceDetails {
  type: string;
  value: string | null;
  device: string;
  "user-agent": string;
  ip: string;
}

// Exchange Rate
export interface ExchangeRate {
  base_currency: string;
  exchange_currency: string;
  rate: number;
}

// Full Order Detail (GET order by ID)
export interface OrderDetail {
  id: number;
  checkout_id: number;
  reference_id: number;
  features: OrderFeatures;
  actions: OrderActions;
  urls: OrderUrls;
  date: DateObject;
  updated_at: DateObject;
  source: string;
  source_details: SourceDetails;
  status: OrderStatus;
  is_price_quote: boolean;
  payment_method: string;
  currency: string;
  amounts: OrderAmounts;
  can_cancel: boolean;
  show_weight: boolean;
  can_reorder: boolean;
  is_pending_payment: boolean;
  pending_payment_ends_at: number;
  total_weight: string;
  receiver: Receiver;
  customer: Customer;
  bank: any | null;
  tags: string[];
}

// Order List Item (GET all orders)
export interface OrderListItem {
  id: number;
  reference_id: number;
  total: Amount;
  exchange_rate?: ExchangeRate;
  date: DateObject;
  status: OrderStatus;
  can_cancel: boolean;
  can_reorder: boolean;
  payment_method?: string;
  is_pending_payment: boolean;
  pending_payment_ends_at: number;
  features: OrderFeatures;
  items: OrderItem[];
}

// Pagination
export interface Pagination {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: Record<string, any>;
}

// Create Order Request
export interface CreateOrderRequest {
  customer: {
    id: number;
    name: string;
    mobile: string;
    email: string;
  };
  receiver: Receiver;
  delivery_method: string;
  branch_id: number;
  courier_id: number;
  ship_to: ShippingAddress;
  payment: PaymentDetails;
  products: OrderProduct[];
}

// Update Order Request
export interface UpdateOrderRequest {
  customer?: {
    id: number;
    name: string;
    mobile: string;
    email: string;
  };
  receiver?: Receiver;
  delivery_method?: string;
  branch_id?: number;
  courier_id?: number;
  ship_to?: ShippingAddress;
  payment?: PaymentDetails;
  coupon_code?: string;
  employees?: number[];
}

// API Response Types
export interface OrderDetailResponse {
  status: number;
  success: boolean;
  data: OrderDetail;
}

export interface OrderListResponse {
  status: number;
  success: boolean;
  data: OrderListItem[];
  pagination: Pagination;
}
