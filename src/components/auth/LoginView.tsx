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
import { AppleGlyph, GoogleGlyph } from "@/components/auth/BrandIcons";

type Step = "form" | "forgot-email" | "forgot-code" | "forgot-new-password";

export function LoginView() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();

  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(null);
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
    if (!signIn) return;
    setFormError(null);

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });
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

  function handleForgotPasswordClick() {
    setFormError(null);
    setFormNotice(null);
    setResetEmail(email);
    setStep("forgot-email");
  }

  async function handleBackToSignIn() {
    setFormError(null);
    setFormNotice(null);
    setResetCode("");
    setNewPassword("");

    if (signIn) {
      const { error } = await signIn.reset();
      if (error) {
        setFormError(error.longMessage ?? error.message);
        return;
      }
    }

    setStep("form");
  }

  async function handleSendResetCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signIn) return;
    setFormError(null);
    setFormNotice(null);

    const { error: createError } = await signIn.create({
      identifier: resetEmail,
    });
    if (createError) {
      setFormError(createError.longMessage ?? createError.message);
      return;
    }

    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendError) {
      setFormError(sendError.longMessage ?? sendError.message);
      return;
    }

    setStep("forgot-code");
  }

  async function handleResendCode() {
    if (!signIn) return;
    setFormError(null);
    setFormNotice(null);

    const { error } = await signIn.resetPasswordEmailCode.sendCode();
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }
    setFormNotice("A new code is on its way.");
  }

  async function handleVerifyResetCode(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (!signIn) return;
    setFormError(null);
    setFormNotice(null);

    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: resetCode,
    });
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    if (signIn.status === "needs_new_password") {
      setStep("forgot-new-password");
    } else {
      setFormError("That code didn't work. Please try again.");
    }
  }

  async function handleSubmitNewPassword(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (!signIn) return;
    setFormError(null);

    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: newPassword,
      signOutOfOtherSessions: true,
    });
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize();
      router.push("/");
      router.refresh();
    } else {
      setFormError("Something went wrong. Please try again.");
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

          {step === "form" ? (
            <>
              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-10 text-primary-black"
              >
                Sign In
              </h1>

              <p
                ref={registerStagger}
                className="text-body-lg mt-4 text-neutral-600"
              >
                Enter your details to view your atelier appointments and
                bespoke selections.
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
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
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
                    onClick={handleForgotPasswordClick}
                    className="cursor-pointer text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
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

              <div
                ref={registerStagger}
                className="my-10 flex items-center gap-4"
              >
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
                  href="/signup"
                  className="font-medium text-primary-black underline-offset-4 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </>
          ) : null}

          {step === "forgot-email" ? (
            <>
              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-10 text-primary-black"
              >
                Reset Password
              </h1>

              <p
                ref={registerStagger}
                className="text-body-lg mt-4 text-neutral-600"
              >
                Enter your email and we&apos;ll send you a code to reset your
                password.
              </p>

              <form
                onSubmit={handleSendResetCode}
                className="mt-12 space-y-9"
              >
                <div ref={registerStagger}>
                  <AuthInput
                    id="resetEmail"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={setResetEmail}
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
                        "Send Reset Code"
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </form>

              <button
                ref={registerStagger}
                type="button"
                onClick={handleBackToSignIn}
                className="text-body-sm mt-8 block w-full text-center text-neutral-600 underline-offset-4 hover:text-primary-black hover:underline"
              >
                Back to sign in
              </button>
            </>
          ) : null}

          {step === "forgot-code" ? (
            <>
              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-10 text-primary-black"
              >
                Check your inbox
              </h1>

              <p
                ref={registerStagger}
                className="text-body-lg mt-4 text-neutral-600"
              >
                We sent a code to {resetEmail}. Enter it below to continue.
              </p>

              <form
                onSubmit={handleVerifyResetCode}
                className="mt-12 space-y-9"
              >
                <div ref={registerStagger}>
                  <AuthInput
                    id="resetCode"
                    label="Verification Code"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    value={resetCode}
                    onChange={setResetCode}
                  />
                </div>

                {formNotice ? (
                  <p
                    ref={registerStagger}
                    className="text-body-sm text-neutral-600"
                  >
                    {formNotice}
                  </p>
                ) : null}

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
                        "Verify Code"
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </form>

              <div
                ref={registerStagger}
                className="mt-8 flex items-center justify-center gap-6"
              >
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={fetchStatus === "fetching"}
                  className={cn(
                    "text-body-sm text-neutral-600 underline-offset-4 hover:text-primary-black hover:underline",
                    fetchStatus === "fetching" && "cursor-not-allowed opacity-60",
                  )}
                >
                  Resend code
                </button>
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="text-body-sm text-neutral-600 underline-offset-4 hover:text-primary-black hover:underline"
                >
                  Back to sign in
                </button>
              </div>
            </>
          ) : null}

          {step === "forgot-new-password" ? (
            <>
              <h1
                ref={registerStagger}
                className="font-display text-h1 mt-10 text-primary-black"
              >
                Set a New Password
              </h1>

              <p
                ref={registerStagger}
                className="text-body-lg mt-4 text-neutral-600"
              >
                Choose a new password for {resetEmail}.
              </p>

              <form
                onSubmit={handleSubmitNewPassword}
                className="mt-12 space-y-9"
              >
                <div ref={registerStagger}>
                  <AuthInput
                    id="newPassword"
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={setNewPassword}
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
                        "Reset Password"
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
