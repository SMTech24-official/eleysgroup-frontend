import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOTAL PHISIO LTD",
  description: "Recover Stronger, Live Better",
};
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Navbar />
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CommonLayout;
