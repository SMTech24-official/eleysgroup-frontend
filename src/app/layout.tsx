import ReduxProvider from "@/redux/provider/ReduxProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TOTAL PHISIO LTD",
  description: "Recover Stronger, Live Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="bottom-right" richColors />
        <ReduxProvider>
          {/* <ReactLenis root>  */}
          {children}
          {/* </ReactLenis> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
