import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductReviewSection } from "../reviews/ProductReviewSection";
import { SellerReviewSection } from "../reviews/SellerReviewSection";
import type { Order } from "@/types/orders";
import useMutation from "@/hooks/useMutation";

export type ReviewInput = {
  rating: number;
  comment?: string;
};

export type LeaveReviewPayload = {
  orderId: string;
  productReviews: ReviewInput[];
  sellerReview: ReviewInput;
};

interface LeaveReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  id?: string;
}

export const LeaveReviewDialog: React.FC<LeaveReviewDialogProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [productReviews, setProductReviews] = useState<
    { productId: string; rating: number; comment: string }[]
  >([]);
  const [sellerRating, setSellerRating] = useState(0);
  const [sellerComment, setSellerComment] = useState("");
  const { execute } = useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProductReviews(
        order.items.map((item) => ({
          productId: item.productId,
          rating: 0,
          comment: "",
        })),
      );
      setSellerRating(0);
      setSellerComment("");
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen, order.items]);

  const handleReset = () => {
    setProductReviews(
      order.items.map(() => ({
        productId: "",
        rating: 0,
        comment: "",
      })),
    );
    setSellerRating(0);
    setSellerComment("");
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  const hasInvalidProduct = productReviews.some((p) => p.rating === 0);
  const hasInvalidComment = productReviews.some((p) => p.comment.length > 300);

  const handleSubmit = async () => {
    if (hasInvalidProduct || sellerRating === 0) {
      toast.error("Please rate all products and the seller.");
      return;
    }

    if (hasInvalidComment || sellerComment.length > 300) {
      toast.error("Comments must be 300 characters or less.");
      return;
    }

    setIsSubmitting(true);

    const payload: LeaveReviewPayload = {
      orderId: order.id,
      productReviews,
      sellerReview: {
        rating: sellerRating,
        comment: sellerComment,
      },
    };

    console.log(payload);
    try {
      // Simulated API call
      const response = await execute("reviews", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      // console.log(response);

      setIsSuccess(true);
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductRatingChange = (index: number, rating: number) => {
    setProductReviews((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rating };
      return updated;
    });
  };

  const handleProductCommentChange = (index: number, comment: string) => {
    setProductReviews((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], comment };
      return updated;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden rounded-[40px] border-none shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col max-h-[90vh]"
            >
              <DialogHeader className="p-8 pb-4">
                <DialogTitle className="text-3xl font-black">
                  Leave a Review
                </DialogTitle>
                <DialogDescription>Order #{order.id}</DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-8">
                {order.items.map((item, index) => (
                  <ProductReviewSection
                    key={item.id || index}
                    productName={item.productName}
                    productImage={item.productImageUrl}
                    productPrice={item.price}
                    rating={productReviews[index]?.rating || 0}
                    comment={productReviews[index]?.comment || ""}
                    onRatingChange={(rating) =>
                      handleProductRatingChange(index, rating)
                    }
                    onCommentChange={(comment) =>
                      handleProductCommentChange(index, comment)
                    }
                  />
                ))}

                <SellerReviewSection
                  sellerName={order.sellerName}
                  sellerAvatar={order.sellerName}
                  rating={sellerRating}
                  comment={sellerComment}
                  onRatingChange={setSellerRating}
                  onCommentChange={setSellerComment}
                />
              </div>

              <DialogFooter className="p-8 pt-4 flex gap-4">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || hasInvalidProduct || sellerRating === 0
                  }
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center space-y-6"
            >
              <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold">Thank you for your review!</h3>
              <Button onClick={handleClose}>Close</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
