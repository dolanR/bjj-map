import { FC } from "react";
import { Logo } from "@/widgets";
import Menu from "../Menu/Menu";

const LayoutHeader: FC = () => {
  return (
    <>
      <header className="sticky z-10">
        <nav className="navbar bg-base-100">
          <Menu
            links={[
              { name: "Map", href: "/" },
              { name: "List", href: "/list" },
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
