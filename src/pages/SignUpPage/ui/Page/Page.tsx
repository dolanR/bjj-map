import { SignUp } from "@clerk/clerk-react";
import { FC } from "react";

const SignUpPage: FC = () => {
  return (
    <div className="flex h-[calc(100svh-148px)] w-screen items-center justify-center overscroll-none md:h-[calc(100svh-168px)]">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
