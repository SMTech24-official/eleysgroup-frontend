/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EditReviewForm from "@/components/dashboard/review/EditReview";
import { CustomLoader } from "@/components/shared/CustomLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteReviewMutation, useGetAllReviewsQuery } from "@/redux/features/reviewSlice/reviewApi";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  image: string;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllReviews() {
  const { data, isLoading } = useGetAllReviewsQuery({});
  const allReviewsFromDatabase = data?.data?.data || [];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [deleteFn, { isLoading: deleteLoading }] = useDeleteReviewMutation();

  const handleDelete = async (id: string) => {
    // Implement delete functionality here
    console.log("Delete review with id:", id);

    try {
      const response = await deleteFn(id).unwrap();
      console.log(response);
      if (response.success) {
        console.log("Review deleted successfully");
        toast.success("Review deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const filteredReviews = allReviewsFromDatabase.filter((review: any) => {
    const matchesName = review.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === null || review.rating === selectedRating;
    return matchesName && matchesRating;
  });

  if (isLoading)
    return (
      <div>
        {" "}
        <CustomLoader />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-full  p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedRating ?? ""}
          onChange={(e) => setSelectedRating(e.target.value ? parseInt(e.target.value) : null)}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star{rating > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map((review: Review) => (
          <Card key={review.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image
                  src={review.image}
                  height={200}
                  width={200}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
                <span>{review.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm">{review.message}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="mr-2" onClick={() => handleEditClick(review)}>
                Edit
              </Button>
              <Button disabled={deleteLoading} variant="destructive" onClick={() => handleDelete(review.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedReview && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
            </DialogHeader>
            <EditReviewForm review={selectedReview} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
