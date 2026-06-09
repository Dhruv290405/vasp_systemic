import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="pt-40 pb-20 gradient-dark relative overflow-hidden min-h-screen flex items-center">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-white/10 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
