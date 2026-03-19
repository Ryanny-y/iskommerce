import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useMutation from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/common";
import type { Product } from "@/types/marketplace";
import useCategory from "@/contexts/CategoryContext";
import { CategorySelector } from "../seller/CategorySelector";
import { ProductTypeSelector } from "../seller/ProductTypeSelector";
import { FoodFields } from "../seller/FoodFields";
import { NonFoodFields } from "../seller/NonFoodFields";

const formSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0.01),
    stock: z.coerce.number().min(1),
    type: z.enum(["FOOD", "NON_FOOD"]),
    categoryId: z.string().min(1),
    newCategoryName: z.string().optional(),
    food_notes: z.string().optional(),
    allergen_info: z.string().optional(),
    spicy_level: z.enum(["NONE", "MILD", "MEDIUM", "HOT"]).optional(),
    condition: z.enum(["NEW", "USED"]).optional(),
    images: z.array(z.instanceof(File)).optional(), // 👈 optional for edit
  })
  .refine(
    (data) =>
      data.categoryId !== "OTHER" ||
      (data.newCategoryName && data.newCategoryName.trim() !== ""),
    { path: ["newCategoryName"], message: "New category name is required" },
  )
  .refine((data) => data.type !== "NON_FOOD" || !!data.condition, {
    path: ["condition"],
    message: "Condition is required for non-food items",
  });

type FormInput = z.input<typeof formSchema>;

interface EditProductProps {
  product: Product | null;
  refetchProducts: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProduct = ({
  product,
  refetchProducts,
  isOpen,
  onClose,
}: EditProductProps) => {
  const { execute } = useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories, refetchData: refetchCategories } = useCategory();

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      stock: 1,
      type: "FOOD",
      categoryId: "",
      newCategoryName: "",
      food_notes: "",
      allergen_info: "",
      spicy_level: undefined,
      condition: undefined,
      images: [],
    },
  });

  const productType = form.watch("type");
  const categoryId = form.watch("categoryId");

  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      type: product.type,
      categoryId: product.categoryId,
      newCategoryName: "",
      food_notes: product.food_notes || "",
      allergen_info: product.allergen_info || "",
      spicy_level: product.spicy_level || undefined,
      condition: product.condition || undefined,
      images: [],
    });
  }, [product, form]);

  // SAME LOGIC AS CREATE
  useEffect(() => {
    if (productType === "NON_FOOD") {
      form.resetField("food_notes");
      form.resetField("allergen_info");
      form.resetField("spicy_level");
      form.setValue("condition", "NEW");
    }

    if (productType === "FOOD") {
      form.setValue("condition", "NEW");
      form.setValue("food_notes", "");
      form.setValue("allergen_info", "");
      form.setValue("spicy_level", "NONE");
    }
  }, [productType, form]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    if (!product) return;

    const parsed = formSchema.parse(values);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", parsed.name);
      formData.append("description", parsed.description);
      formData.append("price", parsed.price.toString());
      formData.append("stock", parsed.stock.toString());
      formData.append("type", parsed.type);
      formData.append("categoryId", parsed.categoryId);

      if (parsed.newCategoryName) {
        formData.append("newCategoryName", parsed.newCategoryName);
      }

      if (parsed.type === "FOOD") {
        if (parsed.food_notes) formData.append("food_notes", parsed.food_notes);
        if (parsed.allergen_info)
          formData.append("allergen_info", parsed.allergen_info);
        if (parsed.spicy_level)
          formData.append("spicy_level", parsed.spicy_level);
      }

      if (parsed.type === "NON_FOOD") {
        if (parsed.condition) formData.append("condition", parsed.condition);
      }

      // OPTIONAL IMAGES (only if user adds new ones)
      if (parsed.images && parsed.images.length > 0) {
        parsed.images.forEach((file) => {
          formData.append("image", file);
        });
      }

      const response: ApiResponse<Product> = await execute(
        `products/${product.id}`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      toast.success(response.message);
      form.reset();
      onClose();
      await refetchProducts();
      refetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] flex flex-col p-0 overflow-auto">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
          <DialogDescription>
            Update your product details below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-4"
          >
            <ProductTypeSelector
              value={productType}
              onChange={(value) =>
                form.setValue("type", value, { shouldValidate: true })
              }
            />

            <CategorySelector
              categories={categories}
              selectedId={categoryId}
              newCategoryName={form.watch("newCategoryName")}
              onSelect={(id) =>
                form.setValue("categoryId", id, { shouldValidate: true })
              }
              onNewCategoryChange={(name) =>
                form.setValue("newCategoryName", name, {
                  shouldValidate: true,
                })
              }
              error={
                form.formState.errors.categoryId?.message ||
                form.formState.errors.newCategoryName?.message
              }
            />

            {/* SAME UI BELOW (UNCHANGED) */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                Basic Information
              </h3>

              <div>
                <label className="text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input className="py-5" {...form.register("name")} />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  className="resize-none h-24"
                  {...form.register("description")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Price (₱) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min={0.01}
                    {...form.register("price")}
                  />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.price?.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <Input min={1} type="number" {...form.register("stock")} />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.stock?.message}
                  </p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {productType === "FOOD" ? (
                <FoodFields key="food" form={form} />
              ) : (
                <NonFoodFields key="non-food" form={form} />
              )}
            </AnimatePresence>
          </form>
        </ScrollArea>

        <DialogFooter className="p-6 pt-2 border-t bg-muted/20">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
