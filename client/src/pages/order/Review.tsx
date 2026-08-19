import { useState, useEffect, type SubmitEvent } from "react";
import { Star, Utensils, Bike, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateReview } from "@/hooks/review/useCreateReview";
import { useUpdateReview } from "@/hooks/review/useUpdateReview";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiError } from "@/types/api";

interface ReviewProps {
  orderId: string;
  existingReview?: {
    reviewId: string;
    foodRating: number;
    deliveryRating: number;
    comment: string;
  };
}

export function Review({ orderId, existingReview }: ReviewProps) {
  const isEditMode = !!existingReview;

  const [open, setOpen] = useState(false);
  const [foodRating, setFoodRating] = useState(existingReview?.foodRating ?? 0);
  const [hoveredFoodRating, setHoveredFoodRating] = useState(0);

  const [deliveryRating, setDeliveryRating] = useState(
    existingReview?.deliveryRating ?? 0,
  );
  const [hoveredDeliveryRating, setHoveredDeliveryRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");

  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const queryClient = useQueryClient();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (existingReview) {
      setFoodRating(existingReview.foodRating);
      setDeliveryRating(existingReview.deliveryRating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onSuccess = async (data: { message: string }) => {
      toast.success(data.message);
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    };
    const onError = (error: ApiError) => {
      toast.error(
        error?.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} review`,
      );
    };

    if (isEditMode) {
      updateReview(
        {
          reviewId: existingReview.reviewId,
          foodRating,
          deliveryRating,
          comment,
        },
        { onSuccess, onError },
      );
      return;
    }
    createReview(
      { orderId, foodRating, deliveryRating, comment },
      { onSuccess, onError },
    );
  };

  const renderStarPicker = (
    currentRating: number,
    hoveredRating: number,
    setRating: (rating: number) => void,
    setHovered: (rating: number) => void,
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hoveredRating || currentRating);
          return (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Star
                className={`h-6 w-6 ${
                  active
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted stroke-muted-foreground/40"
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`mt-2 w-full cursor-pointer py-1 rounded-lg ${
          isEditMode
            ? "border border-primary text-primary"
            : "bg-primary text-white dark:text-black"
        }`}
      >
        {isEditMode ? "Edit Review" : "Leave a Review"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditMode ? "Update your review" : "How was your order?"}
          </DialogTitle>
          <DialogDescription>
            Help Food Loop and your driver improve by leaving feedback.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-semibold">Rate the Food</Label>
            </div>
            {renderStarPicker(
              foodRating,
              hoveredFoodRating,
              setFoodRating,
              setHoveredFoodRating,
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bike className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-semibold">Rate Delivery</Label>
            </div>
            {renderStarPicker(
              deliveryRating,
              hoveredDeliveryRating,
              setDeliveryRating,
              setHoveredDeliveryRating,
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment" className="text-sm font-semibold">
              Your Review
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Was the food hot? Did the driver follow instructions?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : isEditMode ? (
                "Update Review"
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Review;
