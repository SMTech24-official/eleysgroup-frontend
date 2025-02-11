/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EditUpdateProfileForm from "@/components/dashboard/editProfile/EditUpdateProfileForm";
import { CustomLoader } from "@/components/shared/CustomLoader";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";

const EditProfile = () => {
  const { data, error, isLoading } = useGetAllDoctorsQuery(undefined);

  if (isLoading)
    return (
      <div>
        {" "}
        <CustomLoader />
      </div>
    );
  if (error) return <div>Error loading doctors</div>;

  return (
    <div>
      <div>
        <EditUpdateProfileForm profiles={data?.data} />
      </div>
    </div>
  );
};

export default EditProfile;
