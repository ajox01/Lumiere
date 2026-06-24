"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import gsap from "gsap";
import { Check, Loader2 } from "lucide-react";
import { images } from "@/constants/images";
import { cn } from "@/lib/cn";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { AuthInput } from "@/components/auth/AuthInput";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-4.5 w-4.5" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg
      viewBox="0 0 814 1000"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-163.9-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 2.6.6 6.8 1.3 11 1.3 45.4 0 102.5-30.4 138.1-71.3z" />
    </svg>
  );
}

export function LoginView() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(
    null,
  );

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const staggerRefs = useRef<HTMLElement[]>([]);
  const registerStagger = useCallback((el: HTMLElement | null) => {
    if (el && !staggerRefs.current.includes(el)) staggerRefs.current.push(el);
  }, []);

  const isSubmitting = fetchStatus === "fetching" && oauthLoading === null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, xPercent: -6 },
        { opacity: 1, xPercent: 0, duration: 1.3, ease: "power4.out" },
      );

      if (imageScaleRef.current) {
        gsap.fromTo(
          imageScaleRef.current,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 13,
            ease: "none",
            repeat: -1,
            yoyo: true,
          },
        );
      }

      gsap.fromTo(
        panelRef.current,
        { opacity: 0, xPercent: 4 },
        { opacity: 1, xPercent: 0, duration: 1, ease: "power3.out" },
      );

      gsap.fromTo(
        staggerRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.25,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signIn) return;
    setFormError(null);

    const { error } = await signIn.password({ identifier: email, password });
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize();
      router.push("/");
      router.refresh();
    } else {
      setFormError("Additional verification is required to finish signing in.");
    }
  }

  async function handleOAuth(strategy: "oauth_google" | "oauth_apple") {
    if (!signIn) return;
    setFormError(null);
    setOauthLoading(strategy === "oauth_google" ? "google" : "apple");

    const { error } = await signIn.sso({
      strategy,
      redirectUrl: "/",
      redirectCallbackUrl: "/sso-callback",
    });

    if (error) {
      setFormError(error.longMessage ?? error.message);
      setOauthLoading(null);
    }
  }

  return (
    <main className="flex min-h-screen w-full lg:h-screen lg:overflow-hidden">
      <div
        ref={imageWrapRef}
        className="relative hidden h-screen w-1/2 overflow-hidden lg:block"
      >
        <div ref={imageScaleRef} className="absolute inset-0">
          <Image
            src={images.authGlassAmber}
            alt="Abstract macro photograph of swirling amber acetate glass"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      </div>

      <div
        ref={panelRef}
        className="flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-20 lg:h-screen lg:w-1/2 lg:px-20"
      >
        <div className="w-full max-w-md">
          <Link
            ref={registerStagger}
            href="/"
            className="font-display text-h3 tracking-tight text-primary-black"
          >
            LUMIÈRE
          </Link>

          <h1
            ref={registerStagger}
            className="font-display text-h1 mt-10 text-primary-black"
          >
            Sign In
          </h1>

          <p ref={registerStagger} className="text-body-lg mt-4 text-neutral-600">
            Enter your details to view your atelier appointments and bespoke
            selections.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-9">
            <div ref={registerStagger}>
              <AuthInput
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={setEmail}
              />
            </div>

            <div ref={registerStagger}>
              <AuthInput
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={setPassword}
              />
            </div>

            <div
              ref={registerStagger}
              className="flex items-center justify-between"
            >
              <label className="flex cursor-pointer items-center gap-2.5 text-neutral-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-out peer-checked:border-primary-black peer-checked:bg-primary-black peer-checked:[&>svg]:opacity-100">
                  <Check
                    className="h-2.5 w-2.5 text-white opacity-0 transition-opacity duration-200"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-body-sm">Remember me</span>
              </label>

              <button
                type="button"
                className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
              >
                Forgot password?
              </button>
            </div>

            {formError ? (
              <p ref={registerStagger} className="text-body-sm text-error">
                {formError}
              </p>
            ) : null}

            <div ref={registerStagger}>
              <MagneticElement strength={0.2}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "btn--primary w-full py-4",
                    isSubmitting && "cursor-not-allowed opacity-60",
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </MagneticElement>
            </div>
          </form>

          <div ref={registerStagger} className="my-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="text-caption font-medium uppercase tracking-[0.2em] text-neutral-400">
              Or
            </span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <div ref={registerStagger} className="space-y-4">
            <SocialAuthButton
              icon={
                oauthLoading === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GoogleGlyph />
                )
              }
              label="Continue with Google"
              onClick={() => handleOAuth("oauth_google")}
              disabled={oauthLoading !== null}
            />
            <SocialAuthButton
              icon={
                oauthLoading === "apple" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <AppleGlyph />
                )
              }
              label="Continue with Apple"
              onClick={() => handleOAuth("oauth_apple")}
              disabled={oauthLoading !== null}
            />
          </div>

          <p
            ref={registerStagger}
            className="text-body-sm mt-12 text-center text-neutral-600"
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-black underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
