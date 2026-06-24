"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function AuthInput({
  id,
  label,
  type,
  autoComplete,
  value,
  onChange,
  required,
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="w-full">
      <div className="relative pt-5">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="peer text-body-lg w-full border-0 border-b border-neutral-300 bg-transparent pb-3 text-primary-black outline-none transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
        />
        <label
          htmlFor={id}
          className={cn(
            "text-caption pointer-events-none absolute left-0 origin-left font-medium uppercase transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
            isActive
              ? "top-0 translate-y-0 scale-100 tracking-[0.15em] text-neutral-600"
              : "top-1/2 -translate-y-1/2 scale-[0.82] tracking-[0.05em] text-neutral-400",
          )}
        >
          {label}
        </label>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-primary-black transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] peer-focus:scale-x-100"
        />
      </div>
    </div>
  );
}
