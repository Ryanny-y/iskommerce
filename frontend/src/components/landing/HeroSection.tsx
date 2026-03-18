import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fatimaLogo from "@/assets/FatimaLogo.png";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-emerald-50/50 blur-3xl -z-10 rounded-full opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <img
            src={fatimaLogo}
            alt="Fatima Logo"
            className="object-contain h-full"
          />

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
            Your Campus, <span className="text-emerald-600">Your Finds</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-5 leading-relaxed">
            Buy and sell food, school supplies, and student-made products inside
            your campus marketplace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-emerald-200 group"
              >
                Browse Marketplace{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-lg font-medium border-neutral-200 hover:bg-neutral-50"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
