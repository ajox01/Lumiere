import type { Metadata } from "next";
import { SignupView } from "@/components/auth/SignupView";

export const metadata: Metadata = {
  title: "Join the Atelier — LUMIÈRE",
  description:
    "Establish your digital identity to access bespoke eyewear, atelier appointments, and the virtual try-on experience.",
};

export default function SignupPage() {
  return <SignupView />;
}
