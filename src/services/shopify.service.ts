import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export class ShopifyService {
  protected client;

  constructor() {
    this.client = createStorefrontApiClient({
      storeDomain: "mindera-test-store.myshopify.com",
      apiVersion: "2025-04",
      publicAccessToken: "2a5f59cbd5bd3ff5b063a1aa1c6f6d31",
    });
  }
}
