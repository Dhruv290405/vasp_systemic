"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-white min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-primary">V</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-3">Temporarily Unavailable</h1>
          <p className="text-neutral-500 mb-6 leading-relaxed">
            Our systems are loading. Please refresh the page in a few moments.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  );
}
