import { SignIn } from "@clerk/clerk-react";
import { FC } from "react";

const SignInPage: FC = () => {
  return (
    <div className="flex h-[calc(100svh-148px)] w-screen items-center justify-center overscroll-none md:h-[calc(100svh-168px)]">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
