"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, resetPassword } from "@/lib/supabase/auth-actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "unauthorized") setError("Not authorized account");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setOauthLoading("google");
    const url = await signInWithGoogle(window.location.origin);
    if (url) window.location.href = url;
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    const form = new FormData(e.currentTarget);
    const result = await resetPassword(form);
    if (result.error) {
      setResetError(result.error);
    } else {
      setResetSuccess(true);
    }
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <div className="w-full max-w-sm p-8 rounded-xl bg-white border border-border shadow-sm">
        <div className="text-center mb-8">
          <Image src="/vasplogogo.png" alt="VASP Systemic" width={2560} height={748} priority style={{ imageRendering: "auto", objectFit: "contain", height: "60px", width: "auto" }} className="mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-neutral-400 mt-1">VASP Systemic Dashboard</p>
        </div>

        {showResetForm ? (
          <>
            {resetSuccess ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium mb-2">Check your email</p>
                <p className="text-sm text-neutral-400">We&apos;ve sent a password reset link to your email address.</p>
                <button onClick={() => { setShowResetForm(false); setResetSuccess(false); }} className="text-sm text-primary hover:underline mt-4">Back to Login</button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-sm text-neutral-400 mb-4">Enter your email and we&apos;ll send you a link to reset your password.</p>
                <div className="space-y-2">
                  <Label htmlFor="reset_email">Email</Label>
                  <Input id="reset_email" name="email" type="email" required placeholder="admin@vaspsystemic.com" />
                </div>
                {resetError && <p className="text-sm text-red-500">{resetError}</p>}
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={resetLoading}>
                  {resetLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : "Send Reset Link"}
                </Button>
                <button type="button" onClick={() => setShowResetForm(false)} className="flex items-center justify-center gap-1 text-sm text-neutral-400 hover:text-foreground w-full mt-2">
                  <ArrowLeft className="w-3 h-3" /> Back to Login
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center gap-3"
              disabled={oauthLoading !== null}
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Sign in with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-neutral-400">or email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="admin@vaspsystemic.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required placeholder="••••••••" />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...</> : "Sign In"}
              </Button>
            </form>

            <button onClick={() => setShowResetForm(true)} className="text-sm text-neutral-400 hover:text-primary mt-4 w-full text-center">
              Forgot Password?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
