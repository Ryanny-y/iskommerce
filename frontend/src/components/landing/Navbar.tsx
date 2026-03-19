import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fatimaLogo from "@/assets/FatimaLogo.png";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 h-20">
        <Link to="/" className="flex items-center gap-2 group h-full">
          <img
            src={fatimaLogo}
            alt="Fatima Logo"
            className="object-contain h-full"
          />
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            Iskommerce
          </span>
        </Link>

        {/* Large Screen */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
            >
              Marketplace
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-sm font-medium text-neutral-600 hover:text-emerald-600"
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm fbg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 shadow-sm">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="flex sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="w-6 h-6 text-neutral-800" />
              </button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through the app</SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 px-4 mt-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full text-neutral-600 hover:text-emerald-600 py-6"
                  >
                    Marketplace
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="w-full text-neutral-600 hover:text-emerald-600 py-6"
                  >
                    Log in
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="w-full bg-emerald-600 py-6 hover:bg-emerald-700 text-white rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
