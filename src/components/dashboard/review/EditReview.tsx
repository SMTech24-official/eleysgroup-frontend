import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
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

export default function EditReviewForm({ review }: { review: Review }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: review,
  });
  const [imagePreview, setImagePreview] = useState(review.image);

  useEffect(() => {
    reset(review);
    setImagePreview(review.image);
  }, [review, reset]);

  const onSubmit = (data: Review) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
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
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
