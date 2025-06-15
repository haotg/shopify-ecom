import { ShopifyService } from "@/services/shopify.service";
import { SearchOptions } from "@/models/common.model";
import { ProductsResponse } from "@/models/products.model";

class ProductService extends ShopifyService {
  constructor() {
    super();
  }

  async search(options: SearchOptions = {}) {
    const {
      first = 12,
      after,
      query,
      sortKey = "TITLE",
      reverse = false,
    } = options;

    const operation = `
      query ProductsQuery($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
        products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges {
            cursor
            node {
              id
              title
              description
              handle
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const variables = {
      first,
      after,
      query,
      sortKey,
      reverse,
    };

    try {
      const { data, errors } = await this.client.request(operation, {
        variables,
      });

      if (errors) {
        console.error("GraphQL errors:", errors);
        throw new Error("Failed to fetch products");
      }

      return data as { products: ProductsResponse["products"] };
    } catch (error) {
      console.error("ProductService error:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
