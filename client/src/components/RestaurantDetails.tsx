import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Star, Timer } from "lucide-react";
import MenuList from "./MenuList";
import { useGetRestaurantDetails } from "@/hooks/restaurant/useGetRestaurantDetails";
import Loader from "./ui/Loader";
import { useGetRestaurantReviews } from "@/hooks/review/useGetReview";

function RestaurantDetails() {
  const { id: restaurantId } = useParams();

  const { data, isLoading } = useGetRestaurantDetails(restaurantId || "");
  const { data: reviewData } = useGetRestaurantReviews(restaurantId || "");

  if (isLoading) return <Loader />;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={data?.restaurant?.imageUrl}
            alt="restaurant-image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row md:px-4">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {data?.restaurant?.restaurantName}
            </h1>
            <div className="flex gap-2 my-2">
              {data?.restaurant?.cuisines.map((item: string, index: number) => (
                <Badge key={index}>{item}</Badge>
              ))}
              {reviewData && reviewData.totalReviews > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">
                    {reviewData.averageRating}
                  </span>
                  <span className="text-muted-foreground">
                    ({reviewData.totalReviews})
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer />
                <h1 className="flex items-center gap-2">
                  Delivery Time:{" "}
                  <span className="text-primary">
                    {data?.restaurant?.deliveryTime} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* available menu */}
        {data && <MenuList menus={data?.restaurant?.menus} />}

        {/* reviews */}
        {reviewData && reviewData.reviews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviewData.reviews.map((review) => (
                <div key={review._id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    {review.user.profilePicture ? (
                      <img
                        className="w-8 h-8 rounded-full object-contain"
                        src={review.user.profilePicture}
                        alt={review.user.fullname}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                        {review.user.fullname[0].toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">{review.user.fullname}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-1">
                    <span>Food Rating: {review.foodRating}★</span>
                    <span>Delivery Rating: {review.deliveryRating}★</span>
                  </div>
                  <p className="text-sm font-medium text-gray-100">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;
