"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, ArrowUpDown, Check } from "lucide-react";

export type SortOption = "PRICE_LOW_TO_HIGH" | "PRICE_HIGH_TO_LOW";

interface FilterControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
  { value: "PRICE_LOW_TO_HIGH" as SortOption, label: "Price, low to high" },
  { value: "PRICE_HIGH_TO_LOW" as SortOption, label: "Price, high to low" },
];

export default function FilterControls({
  currentSort,
  onSortChange,
}: FilterControlsProps) {
  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label || "Sort";

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ArrowUpDown className="w-4 h-4" />
              {currentSortLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span>{option.label}</span>
                {currentSort === option.value && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Filter className="w-4 h-4" />
          FILTERS
        </Button>
      </div>
    </div>
  );
}
