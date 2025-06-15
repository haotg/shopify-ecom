"use client";

import { useState } from "react";
import Banner from "@/components/custom/Banner";
import FilterControls, { SortOption } from "@/components/custom/FilterControls";
import ProductsGrid from "@/components/custom/ProductsGrid";

export default function Home() {
  const [sortBy, setSortBy] = useState<SortOption>("PRICE_LOW_TO_HIGH");

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner
        src="/shopping-banner.jpeg"
        alt="Spring Summer Collection Banner"
        title="Spring Summer"
        subtitle="SS2024"
      />
      <FilterControls currentSort={sortBy} onSortChange={setSortBy} />
      <ProductsGrid sortBy={sortBy} />
    </div>
  );
}
