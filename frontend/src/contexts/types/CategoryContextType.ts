import type { ApiResponse } from "@/types/common";
import type { Category } from "@/types/marketplace";

export interface CategoryContextType {
  categories: Category[],
  data: ApiResponse<Category[]> | null;
  loading: boolean;
  error: string | null;
  refetchData: () => Promise<void>;
}
