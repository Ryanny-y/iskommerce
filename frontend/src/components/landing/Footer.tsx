import { Link } from "react-router-dom";
import fatimaLogo from "@/assets/FatimaLogo.png";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 h-12">
          <div className="flex items-center gap-2 h-full">
            <img
              src={fatimaLogo}
              alt="Fatima Logo"
              className="object-contain h-full"
            />
            <span className="font-bold text-neutral-900">Iskommerce</span>
          </div>

          <div className="flex gap-8 text-sm text-neutral-500 font-medium">
            <Link to="#" className="hover:text-emerald-600 transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-emerald-600 transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link to="#" className="hover:text-emerald-600 transition-colors">
              About
            </Link>
          </div>

          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Iskommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
