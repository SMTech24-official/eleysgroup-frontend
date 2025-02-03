/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useUpdateDoctorMutation } from "@/redux/features/doctorApi/doctorApi";

interface ProfileFormData {
  name: string;
  title: string;
  specialization: string;
  image: FileList;
}

export default function EditUpdateProfileForm({ profiles }: { profiles: any }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const [updateProfileMutationFn, { isLoading: updateProfileLoading }] = useUpdateDoctorMutation();

  console.log(profiles);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDoctorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctorId(event.target.value);
  };

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();

    console.log("Form data:", data);
    //   {
    //     "name": "Dr. John Doe",
    //     "title": "cardiology",
    //     "specialization": "Cardiologist"
    // }

    const reformedData = {
      name: data.name,
      title: data.title,
      specialization: data.specialization,
    };

    formData.append("data", JSON.stringify(reformedData));

    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await updateProfileMutationFn({ data: formData, id: selectedDoctorId });
      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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

  useEffect(() => {
    const selectedDoctor = profiles?.find((doctor: any) => doctor.id === selectedDoctorId);

    if (selectedDoctor) {
      reset({
        name: selectedDoctor.name,
        title: selectedDoctor.title,
        specialization: selectedDoctor.specialization,
      });

      setImagePreview(selectedDoctor.profileImage);
    }
  }, [profiles, reset, selectedDoctorId]);

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle>Update Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label htmlFor="doctor-select">Select Doctor:</label>
          <select
            id="doctor-select"
            className="  border border-gray-300 rounded-md p-2 w-full mt-2"
            value={selectedDoctorId}
            onChange={handleDoctorChange}
          >
            <option value="">Please choose a doctor</option>
            {profiles?.map((doctor: any) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full"
              disabled={!selectedDoctorId}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full"
              disabled={!selectedDoctorId}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              {...register("specialization", { required: "Specialization is required" })}
              className="w-full"
              disabled={!selectedDoctorId}
            />
            {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>}
          </div>

          <div>
            <Label htmlFor="image">Profile Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              height={200}
              width={200}
              onChange={handleImageChange}
              className="w-full"
              disabled={!selectedDoctorId}
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  height={200}
                  width={200}
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-pink-500" disabled={!selectedDoctorId}>
            {updateProfileLoading ? "Loading..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
