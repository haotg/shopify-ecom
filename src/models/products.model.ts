import { Connection } from "./common.model";

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText?: string;
}

export interface ProductVariant {
  id: string;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  availableForSale: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
}

export type ProductsConnection = Connection<Product>;

export interface ProductsResponse {
  products: ProductsConnection;
}
