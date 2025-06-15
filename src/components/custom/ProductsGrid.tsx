"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@/models/products.model";
import { formatPrice } from "@/lib/utils";
import { SortOption } from "./FilterControls";

interface ProductsApiResponse {
  products: {
    edges: Array<{
      cursor: string;
      node: Product;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

interface ProductsGridProps {
  sortBy: SortOption;
}

export default function ProductsGrid({ sortBy }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadInitialProducts();
  }, [sortBy]);

  const loadInitialProducts = async () => {
    try {
      setInitialLoading(true);
      const response = await fetch(`/api/products?first=12&sortBy=${sortBy}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: ProductsApiResponse = await response.json();
      const productNodes = data.products.edges.map((edge) => edge.node);

      setProducts(productNodes);
      setHasNextPage(data.products.pageInfo.hasNextPage);
      setEndCursor(data.products.pageInfo.endCursor);
    } catch (error) {
      console.error("Error loading initial products:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!hasNextPage || loading || !endCursor) return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/products?first=12&after=${encodeURIComponent(
          endCursor
        )}&sortBy=${sortBy}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more products");
      }

      const data: ProductsApiResponse = await response.json();
      const newProducts = data.products.edges.map((edge) => edge.node);

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasNextPage(data.products.pageInfo.hasNextPage);
      setEndCursor(data.products.pageInfo.endCursor);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center text-lg text-gray-600">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading products...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="pt-0 group cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <CardHeader className="p-0">
              <div className="bg-gray-200 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image
                  src={String(
                    product.images?.edges[0]?.node.url ||
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K"
                  )}
                  alt={product.images?.edges[0]?.node.altText || product.title}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 leading-tight">
                  {product.title}
                </h3>
                <div className="text-sm font-semibold text-gray-900">
                  {product.variants.edges.length > 0 && (
                    <>
                      {product.variants.edges[0].node.compareAtPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-red-600">
                            {formatPrice(
                              parseFloat(
                                product.variants.edges[0].node.price.amount
                              )
                            )}
                          </span>
                          <span className="text-gray-500 line-through text-xs">
                            {formatPrice(
                              parseFloat(
                                product.variants.edges[0].node.compareAtPrice
                                  .amount
                              )
                            )}
                          </span>
                        </div>
                      ) : (
                        <span>
                          {formatPrice(
                            parseFloat(
                              product.variants.edges[0].node.price.amount
                            )
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <Button size="lg" onClick={loadMoreProducts} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      <div className="text-center mt-4 text-sm text-gray-500">
        Showing {products.length} products
      </div>
    </div>
  );
}
