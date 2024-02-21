import { FC } from "react";
import { Logo } from "@/widgets";
import Menu from "../Menu/Menu";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const LayoutHeader: FC = () => {
  return (
    <>
      <header className="sticky z-10">
        <nav className="navbar bg-base-100">
          <Menu
            links={[
              { name: "Map", href: "/" },
              { name: "List", href: "/list" },
              { name: "My Events", href: "/MyEvents" },
              { name: "About", href: "/about" },
            ]}
          />
          <Logo logoName={"BJJ Map"} />
          <div className="navbar-end">
            <SignedIn>
              <div className="btn btn-circle btn-ghost">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <a className="btn btn-ghost rounded-btn btn-sm" href="/sign-up">
                Sign up
              </a>
            </SignedOut>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LayoutHeader;
