"use client";

import EditReviewForm from "@/components/dashboard/review/EditReview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllReviewsQuery } from "@/redux/features/reviewSlice/reviewApi";
import { Star } from "lucide-react";
import Image from "next/image";

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

  const handleDelete = (id: string) => {
    // Implement delete functionality here
    console.log("Delete review with id:", id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allReviewsFromDatabase.map((review: Review) => (
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Review</DialogTitle>
                  </DialogHeader>
                  <EditReviewForm review={review} />
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => handleDelete(review.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
