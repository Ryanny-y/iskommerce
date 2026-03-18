import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import fatimaLogo from '@/assets/FatimaLogo.png'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src={fatimaLogo}
            alt="Fatima Logo"
            className="object-contain h-16 mb-2"
          />

          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Iskommerce
          </h1>
          <p className="text-neutral-500 text-sm">Your campus marketplace</p>
        </div>

        <Outlet />

        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Iskommerce. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
