"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import gsap from "gsap";
import { Loader2 } from "lucide-react";
import { images } from "@/constants/images";
import { cn } from "@/lib/cn";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { AuthInput } from "@/components/auth/AuthInput";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { AppleGlyph, GoogleGlyph } from "@/components/auth/BrandIcons";

export function SignupView() {
  const router = useRouter();
  const { signUp, fetchStatus } = useSignUp();

  const [step, setStep] = useState<"form" | "verify">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(
    null,
  );

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const staggerRefs = useRef<HTMLElement[]>([]);
  const prevStepRef = useRef(step);
  if (prevStepRef.current !== step) {
    staggerRefs.current = [];
    prevStepRef.current = step;
  }
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
  }, [step]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signUp) return;
    setFormError(null);

    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const lastName = rest.join(" ") || undefined;

    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize();
      router.push("/");
      router.refresh();
      return;
    }

    if (signUp.unverifiedFields.includes("email_address")) {
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setFormError(sendError.longMessage ?? sendError.message);
        return;
      }
      setStep("verify");
      return;
    }

    setFormError(
      "Additional verification is required to finish creating your account.",
    );
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signUp) return;
    setFormError(null);

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize();
      router.push("/");
      router.refresh();
    } else {
      setFormError("That code didn't work. Please try again.");
    }
  }

  async function handleOAuth(strategy: "oauth_google" | "oauth_apple") {
    if (!signUp) return;
    setFormError(null);
    setOauthLoading(strategy === "oauth_google" ? "google" : "apple");

    const { error } = await signUp.sso({
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
            src={images.signupAtelier}
            alt="Atelier optician inspecting a hand-finished LUMIÈRE frame"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/20" />
        <Link
          href="/"
          className="font-display text-h3 absolute top-8 left-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
        >
          LUMIÈRE
        </Link>
      </div>

      <div
        ref={panelRef}
        className="relative flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-20 lg:h-screen lg:w-1/2 lg:px-20"
      >
        <div className="w-full max-w-md">
          {step === "form" ? (
            <>
              <p
                ref={registerStagger}
                className="text-caption font-medium uppercase tracking-[0.2em] text-neutral-500"
              >
                Establish Your Digital Identity
              </p>

              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-4 text-primary-black"
              >
                Join the Atelier
              </h1>

              <form onSubmit={handleSubmit} className="mt-12 space-y-9">
                <div ref={registerStagger}>
                  <AuthInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={setFullName}
                  />
                </div>

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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={setPassword}
                  />
                </div>

                {formError ? (
                  <p ref={registerStagger} className="text-body-sm text-error">
                    {formError}
                  </p>
                ) : null}

                <div id="clerk-captcha" />

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
                        "Create Account"
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </form>

              <div
                ref={registerStagger}
                className="my-10 flex items-center gap-4"
              >
                <span className="h-px flex-1 bg-neutral-200" />
                <span className="text-caption font-medium uppercase tracking-[0.2em] text-neutral-400">
                  Or Continue With
                </span>
                <span className="h-px flex-1 bg-neutral-200" />
              </div>

              <div ref={registerStagger} className="space-y-4">
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
              </div>

              <p
                ref={registerStagger}
                className="text-body-sm mt-12 text-center text-neutral-600"
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-black underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>

              <p
                ref={registerStagger}
                className="text-caption mt-6 text-center uppercase tracking-[0.05em] text-neutral-400"
              >
                By establishing an identity, you agree to the Terms of
                Service &amp; Privacy Policy.
              </p>
            </>
          ) : (
            <>
              <p
                ref={registerStagger}
                className="text-caption font-medium uppercase tracking-[0.2em] text-neutral-500"
              >
                Verify Your Email
              </p>

              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-4 text-primary-black"
              >
                Check your inbox
              </h1>

              <p
                ref={registerStagger}
                className="text-body-lg mt-4 text-neutral-600"
              >
                We sent a verification code to {email}. Enter it below to
                finish creating your account.
              </p>

              <form onSubmit={handleVerify} className="mt-12 space-y-9">
                <div ref={registerStagger}>
                  <AuthInput
                    id="code"
                    label="Verification Code"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    value={code}
                    onChange={setCode}
                  />
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
                        "Verify & Continue"
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </form>
            </>
          )}

          <span className="text-caption pointer-events-none absolute right-6 bottom-4 text-neutral-400">
            © {new Date().getFullYear()} LUMIÈRE
          </span>
        </div>
      </div>
    </main>
  );
}
