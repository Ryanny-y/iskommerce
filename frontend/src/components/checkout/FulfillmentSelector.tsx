import React from "react";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Info } from "lucide-react";

interface FulfillmentSelectorProps {
  index: number;
}

export const FulfillmentSelector: React.FC<FulfillmentSelectorProps> = ({
  index,
}) => {
  const { register, setValue, watch } = useFormContext();

  const fulfillmentType = watch(`sellerOrders.${index}.fulfillmentType`);

  return (
    <div className="space-y-6 pt-4 border-t">
      {/* Fulfillment Type */}
      <div className="space-y-3">
        <Label className="text-base font-bold">Fulfillment Type</Label>

        <RadioGroup
          value={fulfillmentType}
          onValueChange={(value) =>
            setValue(`sellerOrders.${index}.fulfillmentType`, value)
          }
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-3 rounded-xl px-4 border-2 cursor-pointer transition-all hover:bg-secondary/10 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
            <RadioGroupItem id="PICKUP" value="PICKUP" />
            <Label htmlFor="PICKUP" className="flex-1 cursor-pointer font-semibold py-4">
              Pickup
            </Label>
          </div>

          <div className="flex items-center space-x-3 rounded-xl px-4 border-2 cursor-pointer transition-all hover:bg-secondary/10 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
            <RadioGroupItem id="MEETUP" value="MEETUP" />
            <Label htmlFor="MEETUP" className="flex-1 cursor-pointer font-semibold py-4">
              Meetup
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Pickup Info */}
      {fulfillmentType === "PICKUP" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border text-sm text-muted-foreground">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <p>
            Pickup location will be provided by the seller once the order is
            accepted.
          </p>
        </div>
      )}

      {/* Meetup Fields */}
      {fulfillmentType === "MEETUP" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Meetup Location
            </Label>
            <Input
              placeholder="e.g. Library Lobby, Gate 1"
              className="rounded-xl py-5 text-sm"
              {...register(`sellerOrders.${index}.meetupLocation`)}
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Meetup Time
            </Label>
            <Input
              type="datetime-local"
              className="rounded-xl py-5 text-sm"
              {...register(`sellerOrders.${index}.meetupTime`)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              placeholder="Any specific instructions for the meetup?"
              className="rounded-xl resize-none"
              rows={3}
              {...register(`sellerOrders.${index}.meetupNotes`)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
