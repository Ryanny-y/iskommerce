import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, XCircle } from "lucide-react";

interface CancelOrderDialogProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const PREDEFINED_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Seller is unresponsive",
  "Incorrect items ordered",
  "Other",
];

export const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  orderId,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  
  const isOther = selectedReason === "Other";
  const canConfirm =
    selectedReason && (!isOther || customReason.trim().length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl! overflow-x-hidden overflow-y-auto rounded-[40px] border-none shadow-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-8 pb-4 border-b border-neutral-50 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-xl">
              <XCircle className="h-5 w-5 text-rose-600" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
              Cancel Order #{orderId}
            </DialogTitle>
          </div>
          <DialogDescription className="text-neutral-500 font-medium">
            Please tell us why you want to cancel this order.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Select a reason
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-3"
            >
              {PREDEFINED_REASONS.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-neutral-50 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                >
                  <RadioGroupItem
                    value={reason}
                    id={reason}
                    className="border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <Label
                    htmlFor={reason}
                    className="flex-1 font-bold text-neutral-700 cursor-pointer"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {isOther && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label
                htmlFor="custom-reason"
                className="text-xs font-bold uppercase tracking-widest text-neutral-400"
              >
                Please specify
              </Label>
              <Textarea
                id="custom-reason"
                placeholder="Enter your reason here..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 min-h-25 font-medium"
              />
            </div>
          )}

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-xs font-medium leading-relaxed">
              Cancellation is only possible while the order is still pending.
              Once accepted by the seller, you may need to contact them
              directly.
            </p>
          </div>
        </div>

        <DialogFooter className="p-8 pt-4 border-t border-neutral-50 bg-neutral-50/30 flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-2xl font-bold text-neutral-500 hover:bg-neutral-100 py-5"
          >
            Go Back
          </Button>
          <Button
            onClick={() => {
              const finalReason =
                selectedReason === "Other" ? customReason : selectedReason;
              onConfirm(finalReason);
            }}
            disabled={!canConfirm}
            className="flex-1 rounded-2xl bg-red-600 hover:bg-red-700 font-bold shadow-lg shadow-rose-200 disabled:opacity-50 disabled:shadow-none py-5"
          >
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
