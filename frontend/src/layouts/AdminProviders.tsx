import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import type { ReactNode } from "react";

export default function AdminProviders({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
