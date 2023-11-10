import { FC } from "react";
import { LayoutFooter, LayoutHeader } from "@/widgets";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="overflow-x-hidden overscroll-none">
      <LayoutHeader />
      <main className="overscroll-none">
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
