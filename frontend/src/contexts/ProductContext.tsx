import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import useFetchData from "@/hooks/useFetchData";
import type { Product } from "@/types/marketplace";
import type { ApiResponse } from "@/types/common";
import useAuth from "./AuthContext";

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  productsLoading: boolean;
  productsError: string | null;
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  refetchProducts: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { authResponse } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const options = useMemo(
    () => ({
      enabled: !!authResponse?.userData,
    }),
    [authResponse?.userData],
  );

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetchData: refetchProducts,
  } = useFetchData<ApiResponse<Product[]>>("products", options);

  const products = useMemo(() => productsData?.data ?? [], [productsData]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return products.filter((product) => {
      const name = product.name?.toLowerCase() ?? "";
      const seller = product.seller?.toLowerCase() ?? "";

      const matchesSearch = name.includes(query) || seller.includes(query);
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        productsLoading,
        productsError,
        searchQuery,
        activeCategory,
        setSearchQuery,
        setActiveCategory,
        refetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
