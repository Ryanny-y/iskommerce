import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { CategoryContextType } from "./types/CategoryContextType";
import type { ApiResponse } from "@/types/common";
import useFetchData from "@/hooks/useFetchData";
import type { Category } from "@/types/marketplace";
import useAuth from "./AuthContext";

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { authResponse } = useAuth();

  const options = useMemo(
    () => ({
      enabled: !!authResponse?.userData,
    }),
    [authResponse?.userData],
  );

  const { data, loading, error, refetchData } = useFetchData<
    ApiResponse<Category[]>
  >("categories", options);

  const categories: Category[] = data?.data ?? [];

  const value = useMemo(
    () => ({
      categories,
      data,
      loading,
      error,
      refetchData,
    }),
    [categories, data, loading, error, refetchData],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider");
  }
  return context;
};

export default useCategory;
