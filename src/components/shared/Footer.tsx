import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2D] text-white py-12 md:py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <div>
            <Image src={logo} alt="logo" height={100} width={150} />
          </div>
          <p className="text-white text-base font-normal mt-4 max-w-[300px] text-center md:text-left">
            we specialize in providing personalized care to help you recover, regain strength, and achieve your goals.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center items-center md:items-center gap-4">
          <h2 className="font-semibold text-2xl text-white">Explorer</h2>
          <ul className="space-y-2 text-white">
            <li>
              <Link href="/" className="hover:text-pink-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="about-us" className="hover:text-pink-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="testimonials" className="hover:text-pink-400">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col justify-start items-center md:items-start lg:items-center gap-4 ">
          <h2 className="font-semibold text-2xl text-white mb-4">Follow Us</h2>
          <div className="flex justify-center items-center md:justify-start gap-4">
            <Link href="#" aria-label="Facebook">
              <FaSquareFacebook className="w-8 h-8 text-[#CCCCCC]" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <FaYoutube className="w-8 h-8 text-[#CCCCCC]" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitterSquare className="w-8 h-8 text-[#CCCCCC]" />
            </Link>
            <Link href={"#"} aria-label="LinkedIn">
              <FaLinkedin className="w-8 h-8 text-[#CCCCCC]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
