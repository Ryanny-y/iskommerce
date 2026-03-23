import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface FoodFieldsProps {
  form: UseFormReturn<any>;
}

export const FoodFields: React.FC<FoodFieldsProps> = ({ form }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const spicyLevel = watch("spicy_level");

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 overflow-hidden"
    >
      <div className="pt-4 border-t">
        <h3 className="text-sm font-semibold mb-4 text-primary">
          Food Details
        </h3>

        <div className="space-y-4">
          {/* Food Notes */}
          <div>
            <label className="text-sm font-medium">Food Notes</label>
            <Textarea
              placeholder="Preparation time, serving size, etc."
              className="resize-none"
              {...register("food_notes")}
            />
            {errors.food_notes && (
              <p className="text-sm text-red-500">
                {errors.food_notes.message as string}
              </p>
            )}
          </div>

          {/* Allergen Info */}
          {/* <div>
            <label className="text-sm font-medium">Allergen Info</label>
            <Textarea
              placeholder="Contains nuts, dairy, etc."
              className="resize-none h-20"
              {...register("allergen_info")}
            />
            {errors.allergen_info && (
              <p className="text-sm text-red-500">
                {errors.allergen_info.message as string}
              </p>
            )}
          </div> */}

          {/* Spicy Level */}
          <div>
            <label className="text-sm font-medium">Spicy Level</label>
            <Select
              value={spicyLevel}
              onValueChange={(value) => setValue("spicy_level", value)}
            >
              <SelectTrigger className="w-full py-5">
                <SelectValue placeholder="Select spicy level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="py-2" value="NONE">
                  NONE
                </SelectItem>
                <SelectItem className="py-2" value="MILD">
                  MILD
                </SelectItem>
                <SelectItem className="py-2" value="MEDIUM">
                  MEDIUM
                </SelectItem>
                <SelectItem className="py-2" value="HOT">
                  HOT
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.spicy_level && (
              <p className="text-sm text-red-500">
                {errors.spicy_level.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
