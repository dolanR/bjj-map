import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch, About, List } from "@/pages";

const App: FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/about" element={<About />} />
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
