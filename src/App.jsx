import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/landing/Layouts/Layout";
import Home from "./components/landing/pages/Home";
import About from "./components/landing/pages/About";
import Portfolio from "./components/landing/pages/Portfolio";
import { Interior } from "./components/landing/pages/Interior";
import Achievement from "./components/landing/pages/Achievement";
import Blog from "./components/landing/pages/Blog";
import Contacts from "./components/landing/pages/Contacts";
import Architecture from "./components/landing/pages/Architecture";
import Turnkey from "./components/landing/pages/Turnkey";
import Competence from "./components/landing/pages/Competence";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter basename="/interioxcel">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/furniture-interior-services" element={<Interior />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/competence" element={<Competence />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/turnkey-interior" element={<Turnkey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
