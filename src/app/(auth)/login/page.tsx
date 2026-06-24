import type { Metadata } from "next";
import { LoginView } from "@/components/auth/LoginView";

export const metadata: Metadata = {
  title: "Client Access — LUMIÈRE",
  description:
    "Sign in to view your atelier appointments and bespoke selections.",
};

export default function LoginPage() {
  return <LoginView />;
}
