import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logoipsum",
  description: "Recover Stronger, Live Better",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default CommonLayout;
