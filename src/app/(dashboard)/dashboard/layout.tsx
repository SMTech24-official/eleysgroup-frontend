import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {


  return (
    <div className="flex">
      <div className="w-fit h-screen overflow-hidden overflow-y-auto">
        <Sidebar />
      </div>
      <div className="p-4 w-full h-screen overflow-hidden overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
