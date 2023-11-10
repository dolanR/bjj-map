import { FC } from "react";
import { LayoutFooter, LayoutHeader } from "@/widgets";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="h-screen overflow-x-hidden overscroll-none">
      <main>
        <LayoutHeader />
        <Outlet />
        <LayoutFooter />
      </main>
    </div>
  );
};

export default Layout;
