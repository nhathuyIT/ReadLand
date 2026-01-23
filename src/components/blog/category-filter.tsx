import { Badge } from "@/components/ui/badge";

const categories = [
  "All",
  "Technology",
  "AI & ML",
  "Web Development",
  "Mobile",
  "Cloud",
  "DevOps",
  "Security",
];

interface CategoryFilterProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function CategoryFilter({
  activeCategory = "All",
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
          onClick={() => onCategoryChange?.(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
