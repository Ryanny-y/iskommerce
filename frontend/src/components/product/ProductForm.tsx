import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductCondition } from "@/types/seller";
import { ProductImageUpload } from "./ProductImageUpload";
import type { Product, ProductImage } from "@/types/marketplace";
import useCategory from "@/contexts/CategoryContext";

export type ProductFormData = Omit<Partial<Product>, "images"> & {
  images: File[] | ProductImage[];
};

interface ProductFormProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof Product, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const { categories } = useCategory();

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="e.g. Blue University Hoodie"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your product in detail..."
          className="min-h-25"
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₱)</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            value={formData.price || ""}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            placeholder="1"
            value={formData.stock || ""}
            onChange={(e) => handleChange("stock", parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {formData.type === "NON_FOOD" && (
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) =>
                handleChange("condition", value as ProductCondition)
              }
            >
              <SelectTrigger id="condition" className="w-full">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="USED">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          value={formData.} 
          onValueChange={(value) => handleChange('status', value as ProductStatus)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <ProductImageUpload
        images={(formData.images || []).filter(
          (img): img is File => img instanceof File,
        )}
        onChange={(files) => handleChange("images", files)}
      />
    </div>
  );
};

export default ProductForm;
