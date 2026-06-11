import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-primary">
              <a href="#">ScholarStream</a>
            </h2>

            <p className="mt-3 max-w-md opacity-80">
              Discover global scholarships, apply easily,
              and build your academic future with confidence.
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline text-primary hover:text-white hover:btn-primary"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline text-primary hover:text-white hover:btn-primary"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline text-primary hover:text-white hover:btn-primary"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline text-primary hover:text-white hover:btn-primary"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-circle btn-outline text-primary hover:text-white hover:btn-primary"
            >
              <FaYoutube size={18} />
            </a>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="divider my-8"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">

          <p>
            © {new Date().getFullYear()} ScholarStream —
            All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-primary transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-primary transition"
            >
              Terms & Conditions
            </a>

            <a
              href="#"
              className="hover:text-primary transition"
            >
              Contact
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
