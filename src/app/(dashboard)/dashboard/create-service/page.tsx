"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { CustomLoader } from "@/components/shared/CustomLoader";
import { useCreateServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ServiceFormData {
  name: string;
  specialization: string;
  duration: number;
  doctorId: string;
  price: number;
  thumbnail: File[] | null;
  images: File[];
  points: { name: string }[];
  description: string;
}

export default function ServiceForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    // setValue,
  } = useForm<ServiceFormData>({
    defaultValues: {
      points: [],
      thumbnail: null,
      images: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "points",
  });

  const { data: doctorsData, error, isLoading } = useGetAllDoctorsQuery({});
  const [createServiceFn, { isLoading: createServiceMutationLoading }] = useCreateServiceMutation();

  const allDoctors = doctorsData?.data;

  const onSubmit = async (data: ServiceFormData) => {
    const formData = new FormData();

    console.log(data);
    // return;

    //   {
    //     "name": "Menstal Hseadsfdlth Counsesddfling",
    //     "specialization": "Psychsaosdlodgy,mental health,coundsseling",
    //     "duration": 50,
    //     "doctorId": "67a0c0c87860ee0d4360ecae",
    //     "price": 200.0,
    //     "description": "A comprehensive consultation with our experienced general physician.",
    //     "serviceList": [
    //         "Initial check-up",
    //         "Basic health screening",
    //         "Prescription if needed"
    //     ]
    // }

    const reformedData = {
      name: data.name,
      specialization: data.specialization,
      duration: Number(data.duration),
      doctorId: data.doctorId,
      price: Number(data.price),
      description: data.description,
      serviceList: data.points.map((point) => point.name),
    };

    console.log(reformedData);
    // return;

    formData.append("data", JSON.stringify(reformedData));
    if (data.thumbnail) {
      console.log(data.thumbnail);
      formData.append("thumbImage", data?.thumbnail[0]);
    }

    // if (Array.isArray(data.images) && data.images.length > 0) {
    //   data.images.forEach((image) => {
    //     formData.append("galleryImages", image);
    //   });
    // }

    for (let i = 0; i < data.images.length; i++) {
      formData.append("galleryImages", data.images[i]);
    }

    try {
      const response = await createServiceFn(formData).unwrap();
      console.log(response);
      toast.success("Service created successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // console.log(doctorsData);

  // useEffect()

  //   {
  //     "success": true,
  //     "statusCode": 200,
  //     "message": "Doctors fetched successfully",
  //     "data": [
  //         {
  //             "id": "67a0c0c87860ee0d4360ecae",
  //             "name": "Dr. John Doe",
  //             "title": "MD",
  //             "specialization": "Cardiologist",
  //             "profileImage": "https://nyc3.digitaloceanspaces.com/smtech-space/iheb-ab-OBufvGMaBaQ-unsplash.jpg",
  //             "createdAt": "2025-02-03T13:12:40.756Z",
  //             "updatedAt": "2025-02-03T13:53:25.908Z"
  //         }
  //     ]
  // }

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
            {...register("thumbnail")}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

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
                required: (files) => files.length === 4 || "4 Images are required",
              },
            })}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {errors.images && <p className="text-red-500">{errors.images.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
          className="block w-full p-2 border border-gray-300 rounded-lg"
          rows={4}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
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
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })} className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" /> Add List
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={createServiceMutationLoading}>
        {createServiceMutationLoading ? "Creating Service..." : "Create Service"}
      </Button>
    </form>
  );
}
