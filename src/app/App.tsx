import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch, About, List, SignInPage, MyEvents } from "@/pages";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={process.env.VITE_CLERK_PUBLISHABLE_KEY!}
      navigate={(to) => navigate(to)}
      appearance={{
        baseTheme: dark,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/" />} />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="/MyEvents"
            element={
              <>
                <SignedIn>
                  <MyEvents />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/about" element={<About />} />
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default function App() {
  return <ClerkProviderWithRoutes />;
}
