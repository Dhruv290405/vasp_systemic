"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-primary">V</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-3">Something went wrong</h1>
        <p className="text-neutral-500 mb-6 leading-relaxed">
          Please try refreshing the page or come back later.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg border border-border text-neutral-600 text-sm font-semibold hover:bg-neutral transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
