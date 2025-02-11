"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { useCreateServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { CustomLoader } from "@/components/shared/CustomLoader";

interface ServiceFormData {
  name: string;
  specialization: string;
  duration: number;
  doctorId: string;
  price: number;
  thumbnail: File | null;
  images: File[];
  points: { name: string }[];
}

export default function ServiceForm() {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<ServiceFormData>({
    defaultValues: {
      points: [],
      thumbnail: null,
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const { data: doctorsData, error, isLoading } = useGetAllDoctorsQuery({});
  const [createServiceFn, { isLoading: createServiceMutationLoading }] = useCreateServiceMutation();

  const allDoctors = doctorsData?.data;

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("thumbnail", file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(newImages);
  };

  const onSubmit = async (data: ServiceFormData) => {
    console.log(data);
    // return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("specialization", data.specialization);
    formData.append("duration", data.duration.toString());
    formData.append("doctorId", data.doctorId);
    formData.append("price", data.price.toString());
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    data.images.forEach((image) => {
      formData.append(`images`, image);
    });

    data.points.forEach((service, index) => {
      formData.append(`additionalServices[${index}]`, JSON.stringify(service));
    });

    try {
      const response = await createServiceFn(formData).unwrap();
      if (response.success) {
        toast.success("Service created successfully");
        reset();
        setThumbnailPreview(null);
        setImagesPreview([]);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.log(error);
    }
  };

  const removeImage = (index: number, type: "thumbnail" | "images") => {
    if (type === "thumbnail") {
      setValue("thumbnail", null);
      setThumbnailPreview(null);
    } else {
      const newImages = [...imagesPreview];
      newImages.splice(index, 1);
      setImagesPreview(newImages);
      setValue(
        "images",
        newImages.map((url) => new File([], url))
      );
    }
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <CustomLoader size={30} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a New Service</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Service Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Service name is required" }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Controller
            name="specialization"
            control={control}
            rules={{ required: "Specialization is required" }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Controller
            name="duration"
            control={control}
            rules={{ required: "Duration is required", min: 1 }}
            render={({ field }) => <Input type="number" {...field} />}
          />
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctorId">Doctor</Label>
          <Controller
            name="doctorId"
            control={control}
            rules={{ required: "Doctor selection is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {allDoctors?.map((doctor: { id: string; name: string }) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.doctorId && <p className="text-red-500">{errors.doctorId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required", min: 0 }}
            render={({ field }) => <Input type="number" step="0.01" {...field} />}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail Image</Label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", {
              validate: {
                // lessThan2MB: (files) => files[0]?.size < 2 * 1024 * 1024 || "Thumbnail size should be less than 2MB",
                required: (file) => file !== null || "Thumbnail is required",
              },
              onChange: handleThumbnailChange,
            })}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <div className="relative inline-block mt-2">
              <Image
                src={thumbnailPreview || "/placeholder.svg"}
                alt="Thumbnail Preview"
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeImage(0, "thumbnail")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Additional Images (4)</Label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images", {
              validate: {
                // lessThan2MB: (files) =>
                //   Array.from(files).every((file) => file.size < 2 * 1024 * 1024) ||
                //   "Each image size should be less than 2MB",
                // max4Files: (files) => files.length <= 4 || "You can upload up to 4 images",
                // must include 4 images
                required: (files) => files.length === 4 || "4 Images are required",
              },
              onChange: handleImagesChange,
            })}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {imagesPreview.map((src, index) => (
              <div key={index} className="relative w-fit">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeImage(index, "images")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {errors.images && <p className="text-red-500">{errors.images.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>List Points</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              {...register(`points.${index}.name`, {
                required: "List  is required",
              })}
              placeholder="List"
              className="flex-grow"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              disabled={index === 0}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })} className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={createServiceMutationLoading}>
        {createServiceMutationLoading ? "Creating Service..." : "Create Service"}
      </Button>
    </form>
  );
}
