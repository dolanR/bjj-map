import { FC } from "react";
import { Logo } from "@/widgets/LayoutHeader/model/types";

const Logo: FC<Logo> = ({ logoName }: Logo) => {
  return (
    <div className="navbar-center">
      <a
        className="text-2xl font-semibold normal-case placeholder:text-xl"
        href="/"
      >
        {logoName}
      </a>
    </div>
  );
};

export default Logo;
