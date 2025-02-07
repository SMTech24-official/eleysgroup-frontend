import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateReviewMutation } from "@/redux/features/reviewSlice/reviewApi";
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

interface EditReviewFormProps {
  review: Review;
  onClose: () => void;
}

export default function EditReviewForm({ review, onClose }: EditReviewFormProps) {
  const [updateReview, { isLoading: updateReviewIsLoading }] = useUpdateReviewMutation();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: review,
  });
  const [imagePreview, setImagePreview] = useState(review.image);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    reset(review);
    setImagePreview(review.image);
  }, [review, reset]);

  const onSubmit = async (data: Review) => {
    console.log(data);
    const formData = new FormData();
    if (selectedImage) {
      console.log(selectedImage);
      formData.append("image", selectedImage);
    }
    const reformedData = {
      name: data.name,
      rating: data.rating,
      message: data.message,
    };

    formData.append("data", JSON.stringify(reformedData));

    try {
      const response = await updateReview({ data: formData, id: review?.id }).unwrap();
      console.log(response);
      if (response.success) {
        console.log("Review updated successfully");
        toast.success("Review updated successfully");
        onClose(); // Close the dialog
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update review");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setSelectedImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Controller name="name" control={control} render={({ field }) => <Input id="name" {...field} />} />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => <Input id="rating" type="number" min="1" max="5" {...field} />}
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Controller name="message" control={control} render={({ field }) => <Textarea id="message" {...field} />} />
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        {imagePreview && (
          <Image
            height={200}
            width={200}
            src={imagePreview}
            alt={review.name}
            className="w-20 h-20 rounded-full mb-2"
          />
        )}
        <Input type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <Button disabled={updateReviewIsLoading} type="submit">
        {updateReviewIsLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
