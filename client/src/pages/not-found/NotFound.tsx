import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Error Code with a gentle bounce effect */}
        <p className="text-6xl font-black text-primary animate-bounce  sm:text-7xl">
          404
        </p>

        {/* Main Error Message */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        {/* Supporting Description */}
        <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
          >
            Go back home
          </Link>

          <Link
            to="/support"
            className="text-sm font-semibold text-gray-900 hover:text-primary transition"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
