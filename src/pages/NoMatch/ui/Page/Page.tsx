import { FC } from "react";
import { Link } from "react-router-dom";

const NoMatch: FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2  flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 text-center">
      <h1 className="bg-gradient-to-l from-primary-content via-secondary to-primary bg-clip-text text-8xl font-bold text-transparent">
        404
      </h1>
      <p className="text-3xl font-medium text-neutral">Page not found</p>
      <p className="text-center text-lg font-medium text-neutral md:w-[60%] md:text-2xl">
        This likely happened if you tried to sign in without signing up, try
        clicking the sign up button in the lower portion of the Clerk sign in
        popup
      </p>
      <Link className="btn-primary-content btn mt-2 px-16" to="/">
        Go back
      </Link>
    </div>
  );
};

export default NoMatch;
