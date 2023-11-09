import { FC } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const LayoutFooter: FC = () => {
  return (
    <>
      <footer className="absolute bottom-0 w-full bg-base-300 p-3 text-sm">
        <div className="m-auto flex flex-col items-center justify-center gap-1">
          <div className="flex flex-row items-center justify-center gap-4 pb-1">
            <a
              href="https://github.com/dolanR"
              target="_blank"
              data-tooltip-id="github"
              data-tooltip-content="My Github"
            >
              <AiFillGithub className="h-7 w-7" />
              <Tooltip id="github" place="top" />
            </a>
            <a
              href="https://dolan.dev"
              target="_blank"
              data-tooltip-id="website"
              data-tooltip-content="My Website"
            >
              <BsPersonCircle className="h-7 w-7" />
              <Tooltip id="website" place="top" />
            </a>
          </div>
          <p>
            © 2023 by Dolan Reynolds.<a></a>
          </p>
          <p>All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LayoutFooter;
