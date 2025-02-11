"use client";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { useCreateServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { CustomLoader } from "@/components/shared/CustomLoader";

interface ServiceFormData {
  name: string;
  specialization: string;
  duration: number;
  doctorId: string;
  price: number;
  thumbnail: FileList;
  images: FileList;
  points: { name: string; price: number }[];
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
  } = useForm<ServiceFormData>({
    defaultValues: {
      points: [{ name: "", price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const { data: doctorsData, error, isLoading } = useGetAllDoctorsQuery({});
  const [createServiceFn, { isLoading: createServiceMutationLoading }] = useCreateServiceMutation();

  const allDoctors = doctorsData?.data;

  const onSubmit = async (data: ServiceFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("specialization", data.specialization);
    formData.append("duration", data.duration.toString());
    formData.append("doctorId", data.doctorId);
    formData.append("price", data.price.toString());
    formData.append("thumbnail", data.thumbnail[0]);

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    data.points.forEach((service, index) => {
      formData.append(`additionalServices[${index}][name]`, service.name);
      formData.append(`additionalServices[${index}][price]`, service.price.toString());
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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <CustomLoader size={30} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xl mx-auto ">
      <h1 className="text-2xl font-bold text-center underline ">Create a new service</h1>

      {/* Existing fields */}
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Service name is required" }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <Controller
          name="specialization"
          control={control}
          rules={{ required: "Specialization is required" }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}
      </div>

      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Controller
          name="duration"
          control={control}
          rules={{ required: "Duration is required", min: 1 }}
          render={({ field }) => <Input type="number" {...field} />}
        />
        {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
      </div>

      <div>
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

      <div>
        <Label htmlFor="price">Price</Label>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required", min: 0 }}
          render={({ field }) => <Input type="number" step="0.01" {...field} />}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      {/* New fields */}
      <div>
        <Label htmlFor="thumbnail">Thumbnail Image</Label>
        <Input
          type="file"
          accept="image/*"
          {...register("thumbnail", { required: "Thumbnail is required" })}
          onChange={handleThumbnailChange}
        />
        {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
        {thumbnailPreview && (
          <Image
            height={200}
            width={200}
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
      </div>

      <div>
        <Label htmlFor="images">Additional Images (4)</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          {...register("images", {
            required: "At least four images are required",
            validate: (value) => value.length === 4 || "Please upload 4 images",
          })}
          onChange={handleImagesChange}
        />
        {errors.images && <p className="text-red-500">{errors.images.message}</p>}
        <div className="mt-2 grid grid-cols-2 gap-2">
          {imagesPreview.map((src, index) => (
            <Image
              height={200}
              width={200}
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      </div>

      <div>
        <Label>List points</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mt-2">
            <Input
              {...register(`points.${index}.name` as const, {
                required: "Service name is required",
              })}
              placeholder="Service name"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              disabled={index === 0}
              className="flex items-center justify-center w-24 "
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ name: "", price: 0 })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      <Button type="submit" disabled={createServiceMutationLoading}>
        {createServiceMutationLoading ? "Creating Service..." : "Create Service"}
      </Button>
    </form>
  );
}
