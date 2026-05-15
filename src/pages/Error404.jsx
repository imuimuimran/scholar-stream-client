import { Link, useRouteError } from "react-router-dom";

const Error404 = () => {

  const error = useRouteError();

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="max-w-2xl text-center">

        {/* 404 TEXT */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-primary">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-base md:text-lg opacity-80">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        {/* OPTIONAL ERROR MESSAGE */}
        {error?.statusText || error?.message ? (
          <div className="mt-6 bg-base-100 shadow rounded-xl p-4 text-sm opacity-70">
            {error.statusText || error.message}
          </div>
        ) : null}

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="btn btn-primary btn-wide text-white"
          >
            Back To Home
          </Link>

          <Link
            to="/scholarships"
            className="btn btn-outline btn-wide"
          >
            Browse Scholarships
          </Link>

        </div>

        {/* IMAGE / EMOJI */}
        <div className="mt-10 text-7xl">
          🎓
        </div>

      </div>

    </section>
  );
};

export default Error404;