import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store } from "lucide-react";

interface StartSellingHeroProps {
  onActivate: () => void;
  isLoading?: boolean;
}

export const StartSellingHero = ({
  onActivate,
  isLoading,
}: StartSellingHeroProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100 mb-4"
        >
          <Store className="w-4 h-4" />
          <span>Join 500+ student sellers</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 leading-[1.1]"
        >
          Start Selling on <span className="text-emerald-600">Iskommerce</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed"
        >
          Turn your extra items, textbooks, and skills into cash within your
          campus community. It's fast, easy, and secure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            onClick={onActivate}
            disabled={isLoading}
            className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 gap-2"
          >
            {isLoading ? "Activating..." : "Start Selling Now"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
