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
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
