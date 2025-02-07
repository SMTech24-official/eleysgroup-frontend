"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ReviewFormInputs {
  image: FileList;
  rating: string;
  message: string;
  name: string;
}

export default function AddReview() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewFormInputs>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ReviewFormInputs> = (data) => {
    // Here you would typically send the data to your backend
    console.log(data);
    // Reset form or show success message
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Submit a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            {imagePreview && <Image src={imagePreview} alt="Preview" className="mt-2 max-w-full h-auto" />}
          </div>

          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select onValueChange={(value) => setValue("rating", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Write your review here..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: "Name is required" })} placeholder="Your name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-white hover:bg-pink-500">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
