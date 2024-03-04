import { FC } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

const LayoutFooter: FC = () => {
  return (
    <>
      <footer className="fixed bottom-0 w-full bg-base-300 p-3 text-sm">
        <div className="m-auto flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center gap-4 pb-1">
            <a href="https://github.com/dolanR" target="_blank">
              <AiFillGithub className="h-4 w-4 lg:h-7 lg:w-7" />
            </a>
            <a href="https://dolan.dev" target="_blank">
              <BsPersonCircle className="h-4 w-4 lg:h-7 lg:w-7" />
            </a>
          </div>
          <p className="text-[11px] lg:text-base">
            © {new Date().getFullYear.toString()} by Dolan Reynolds.
          </p>
          <p className="text-[11px] lg:text-base">All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LayoutFooter;
