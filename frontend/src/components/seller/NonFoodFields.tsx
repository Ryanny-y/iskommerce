import React from 'react';
import { type UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

interface NonFoodFieldsProps {
  form: UseFormReturn<any>;
}

export const NonFoodFields: React.FC<NonFoodFieldsProps> = ({ form }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const condition = watch("condition");

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 overflow-hidden"
    >
      <div className="pt-4 border-t">
        <h3 className="text-sm font-semibold mb-4 text-primary">
          Item Details
        </h3>

        <div className="space-y-4">

          {/* Condition */}
          <div>
            <label className="text-sm font-medium">Condition</label>

            <Select
              value={condition}
              onValueChange={(value) =>
                setValue("condition", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger className='w-full h-32 py-5'>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW" className='py-2'>NEW</SelectItem>
                <SelectItem value="USED" className='py-2'>USED</SelectItem>
              </SelectContent>
            </Select>

            {errors.condition && (
              <p className="text-sm text-red-500">
                {errors.condition.message as string}
              </p>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};