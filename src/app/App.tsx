import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch, About, List } from "@/pages";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// function ClerkProviderWithRoutes() {
//   const navigate = useNavigate();

//   return (
//     <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route
//             path="/sign-in/*"
//             element={<SignIn routing="path" path="/sign-in" />}
//           />
//           <Route
//             path="/sign-up/*"
//             element={<SignUp routing="path" path="/sign-up" />}
//           />
//           <Route
//             path="/MyEvents"
//             element={
//               <>
//                 <SignedIn>
//                   <MyEvents />
//                 </SignedIn>
//                 <SignedOut>
//                   <RedirectToSignIn />
//                 </SignedOut>
//               </>
//             }
//           />
//         </Route>
//       </Routes>
//     </ClerkProvider>
//   );
// }

const App: FC = () => {
  return (
    // <ClerkProvider publishableKey={clerkPubKey}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/about" element={<About />} />
        <Route path="/list" element={<List />} />
      </Route>
    </Routes>
    // </ClerkProvider>
  );
};

export default App;
