import { FC } from "react";
import { Logo } from "@/widgets";
import Menu from "../Menu/Menu";

const LayoutHeader: FC = () => {
  return (
    <>
      <header>
        <nav className="navbar bg-base-100">
          <Menu
            links={[
              { name: "Homepage", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
          <Logo logoName={"BJJ Map"} />
          <div className="navbar-end"></div>
        </nav>
      </header>
    </>
  );
};

export default LayoutHeader;
