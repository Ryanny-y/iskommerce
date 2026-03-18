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
import { ProductTypeSelector } from "./ProductTypeSelector";
import { CategorySelector, type Category } from "./CategorySelector";
import { FoodFields } from "./FoodFields";
import { NonFoodFields } from "./NonFoodFields";
import { ProductImageUpload } from "../product/ProductImageUpload";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useMutation from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/common";
import type { Product } from "@/types/marketplace";

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
    spicy_level: z.enum(["NONE", "MILD", "MEDIUM", "HOT"]).default("NONE"),
    condition: z.enum(["NEW", "USED"]).default("NEW"),
    images: z.array(z.instanceof(File)).min(1),
  })
  .refine(
    (data) =>
      data.categoryId !== "other" ||
      (data.newCategoryName && data.newCategoryName.trim() !== ""),
    { path: ["newCategoryName"], message: "New category name is required" },
  )
  .refine((data) => data.type !== "NON_FOOD" || !!data.condition, {
    path: ["condition"],
    message: "Condition is required for non-food items",
  });

type FormInput = z.input<typeof formSchema>;

interface PostProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export const PostProductDialog = ({
  isOpen,
  onClose,
}: PostProductDialogProps) => {
  const { execute } = useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      spicy_level: "NONE",
      condition: "NEW",
      images: [],
    },
  });

  const productType = form.watch("type");
  const categoryId = form.watch("categoryId");

  useEffect(() => {
    if (productType === "NON_FOOD") {
      form.resetField("food_notes");
      form.resetField("allergen_info");
      form.setValue("spicy_level", "NONE");
    }

    if (productType === "FOOD") {
      form.setValue("condition", "NEW");
    }
  }, [productType, form]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    console.log("submitting");
    
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

      // Safe optional fields
      if (parsed.newCategoryName) {
        formData.append("newCategoryName", parsed.newCategoryName);
      }

      if (parsed.type === "FOOD") {
        if (parsed.food_notes) formData.append("food_notes", parsed.food_notes);
        if (parsed.allergen_info)
          formData.append("allergen_info", parsed.allergen_info);

        formData.append("spicy_level", parsed.spicy_level);
      }

      if (parsed.type === "NON_FOOD") {
        formData.append("condition", parsed.condition);
      }

      // Images
      parsed.images.forEach((file) => {
        formData.append("image", file);
      });

      const response: ApiResponse<Product> = await execute("products", {
        method: "POST",
        body: formData,
      });

      toast.success(response.message);
      form.reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] flex flex-col p-0 overflow-auto">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Post New Item
          </DialogTitle>
          <DialogDescription>
            Sell an item in the campus marketplace. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-4"
          >
            {/* Product Type */}
            <ProductTypeSelector
              value={productType}
              onChange={(value) =>
                form.setValue("type", value, { shouldValidate: true })
              }
            />

            {/* Category */}
            <CategorySelector
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

            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                Basic Information
              </h3>

              <div>
                <label className="text-sm font-medium">Product Name <span className="text-red-500">*</span></label>
                <Input required className="py-5" {...form.register("name")} />
                <p className="text-sm text-red-500">
                  {form.formState.errors.name?.message}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
                <Textarea
                  required
                  className="resize-none h-24"
                  {...form.register("description")}
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.description?.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price (₱) <span className="text-red-500">*</span></label>
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
                  <label className="text-sm font-medium">Stock <span className="text-red-500">*</span></label>
                  <Input min={1} type="number" {...form.register("stock")} />
                  <p className="text-sm text-red-500">
                    {form.formState.errors.stock?.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Conditional Fields */}
            <AnimatePresence mode="wait">
              {productType === "FOOD" ? (
                <FoodFields key="food" form={form} />
              ) : (
                <NonFoodFields key="non-food" form={form} />
              )}
            </AnimatePresence>

            {/* Images */}
            <ProductImageUpload
              images={form.watch("images")}
              onChange={(images) =>
                form.setValue("images", images, { shouldValidate: true })
              }
              error={form.formState.errors.images?.message as string}
            />
          </form>
        </ScrollArea>

        <DialogFooter className="p-6 pt-2 border-t bg-muted/20">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
            className="min-w-30"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
