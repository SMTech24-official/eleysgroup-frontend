import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logoipsum",
  description: "Recover Stronger, Live Better",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
     <div className="grid grid-cols-[]" >
     <Navbar />
      <div>{children}</div>
      <Footer />
     </div>
    </>
  );
};

export default CommonLayout;
