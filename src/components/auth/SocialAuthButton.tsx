"use client";

import { MagneticElement } from "@/components/ui/MagneticElement";

interface SocialAuthButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function SocialAuthButton({
  icon,
  label,
  onClick,
  disabled,
}: SocialAuthButtonProps) {
  return (
    <MagneticElement strength={0.2} className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="text-button flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-primary-black uppercase transition-colors duration-200 ease-out hover:bg-silk-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {icon}
        {label}
      </button>
    </MagneticElement>
  );
}
