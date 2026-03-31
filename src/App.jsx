import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Landing */
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
import Services from "./components/landing/pages/Services";

/* Admin */
import AdminLayout from "./components/admin/layout/Layout";
import Dashboard from "./components/admin/pages/Dashboard";

import ScrollToTop from "./components/ScrollToTop";
import Create from "./components/admin/pages/services/Create";

import ServicesIndex from "./components/admin/pages/services/Index";
import ServicesCreate from "./components/admin/pages/services/Create";
import ServicesEdit from "./components/admin/pages/services/Edit";
import ServicesShow from "./components/admin/pages/services/Show";

import OverviewIndex from "./components/admin/pages/services/overview/Index";
import OverviewCreate from "./components/admin/pages/services/overview/Create";
import OverviewShow from "./components/admin/pages/services/overview/Show";
import OverviewEdit from "./components/admin/pages/services/overview/Edit";

import WhyWorkWithUsIndex from "./components/admin/pages/services/why-work-with-us/Index";
import WhyWorkWithUsCreate from "./components/admin/pages/services/why-work-with-us/Create";
import WhyWorkWithUsShow from "./components/admin/pages/services/why-work-with-us/Show";
import WhyWorkWithUsEdit from "./components/admin/pages/services/why-work-with-us/Edit";

import WhatWeDoIndex from "./components/admin/pages/services/what-we-do/Index";
import WhatWeDoCreate from "./components/admin/pages/services/what-we-do/Create";
import WhatWeDoShow from "./components/admin/pages/services/what-we-do/Show";
import WhatWeDoEdit from "./components/admin/pages/services/what-we-do/Edit";

import ProjectsIndex from "./components/admin/pages/projects/Index";
import CreateProject from "./components/admin/pages/projects/Create";
import ShowProject from "./components/admin/pages/projects/Show";
import EditProject from "./components/admin/pages/projects/Edit";

import ClientsIndex from "./components/admin/pages/clients/Index";
import CreateClient from "./components/admin/pages/clients/Create";
import ShowClient from "./components/admin/pages/clients/Show";
import EditClient from "./components/admin/pages/clients/Edit";

import BlogsIndex from "./components/admin/pages/blogs/Index";
import CreateBlog from "./components/admin/pages/blogs/Create";
import ShowBlog from "./components/admin/pages/blogs/Show";
import EditBlog from "./components/admin/pages/blogs/Edit";

import TestimonialsIndex from "./components/admin/pages/testimonials/Index";
import CreateTestimonial from "./components/admin/pages/testimonials/Create";
import ShowTestimonial from "./components/admin/pages/testimonials/Show";
import EditTestimonial from "./components/admin/pages/testimonials/Edit";

import AchievementsIndex from "./components/admin/pages/achievements/Index";
import CreateAchievement from "./components/admin/pages/achievements/Create";
import ShowAchievement from "./components/admin/pages/achievements/Show";
import EditAchievement from "./components/admin/pages/achievements/Edit";

import FaqIndex from "./components/admin/pages/faqs/Index";
import CreateFaq from "./components/admin/pages/faqs/Create";
import EditFaq from "./components/admin/pages/faqs/Edit";

import AreasIndex from "./components/admin/pages/areas/Index";
import CreateArea from "./components/admin/pages/areas/Create";
import ShowArea from "./components/admin/pages/areas/Show";
import EditArea from "./components/admin/pages/areas/Edit";

import TeamsIndex from "./components/admin/pages/teams/Index";
import CreateTeam from "./components/admin/pages/teams/Create";
import ShowTeam from "./components/admin/pages/teams/Show";
import EditTeam from "./components/admin/pages/teams/Edit";
import Login from "./components/admin/auth/Login";
import ProtectedRoute from "./components/admin/auth/ProtectedRoute";
import NotFound from "./components/landing/pages/NotFound";
import ServiceDetail from "./components/landing/pages/ServiceDetail";
import BlogDetail from "./components/landing/pages/BlogDetail";
import AreasWeServe from "./components/landing/pages/AreasWeServe";


const App = () => {
  return (
    <BrowserRouter basename="/interioxcel">
      <ScrollToTop />

      <Routes>
        {/* ================= WEBSITE ================= */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="furniture-interior-services" element={<Interior />} />
          <Route path="areas-we-serve" element={<AreasWeServe />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="achievement" element={<Achievement />} />
          <Route path="competence" element={<Competence />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />{" "}
          <Route path="contact" element={<Contacts />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="turnkey-interior" element={<Turnkey />} />
          <Route path="services" element={<Services />} />
          <Route path=":slug" element={<ServiceDetail />} />
          {/* Website Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>

        {/* ================= ADMIN ================= */}
        <Route path="admin">
          {/* Login */}
          <Route index element={<Login />} />

          {/* Dashboard Protected */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* ================= SERVICES ================= */}
            <Route path="services">
              <Route index element={<ServicesIndex />} />
              <Route path="create" element={<ServicesCreate />} />
              <Route path=":id" element={<ServicesShow />} />
              <Route path=":id/edit" element={<ServicesEdit />} />

              {/* Overview */}
              <Route path=":id/overview">
                <Route index element={<OverviewIndex />} />
                <Route path="create" element={<OverviewCreate />} />
                <Route path=":overviewId" element={<OverviewShow />} />
                <Route path=":overviewId/edit" element={<OverviewEdit />} />
              </Route>

              {/* Why Work With Us */}
              <Route path=":id/why-work-with-us">
                <Route index element={<WhyWorkWithUsIndex />} />
                <Route path="create" element={<WhyWorkWithUsCreate />} />
                <Route
                  path=":whyWorkWithUsId"
                  element={<WhyWorkWithUsShow />}
                />
                <Route
                  path=":whyWorkWithUsId/edit"
                  element={<WhyWorkWithUsEdit />}
                />
              </Route>

              {/* What We Do */}
              <Route path=":id/what-we-do">
                <Route index element={<WhatWeDoIndex />} />
                <Route path="create" element={<WhatWeDoCreate />} />
                <Route path=":whatWeDoId" element={<WhatWeDoShow />} />
                <Route path=":whatWeDoId/edit" element={<WhatWeDoEdit />} />
              </Route>
            </Route>

            {/* ================= PROJECTS ================= */}
            <Route path="projects">
              <Route index element={<ProjectsIndex />} />
              <Route path="create" element={<CreateProject />} />
              <Route path=":id" element={<ShowProject />} />
              <Route path=":id/edit" element={<EditProject />} />
            </Route>

            {/* ================= CLIENTS ================= */}
            <Route path="clients">
              <Route index element={<ClientsIndex />} />
              <Route path="create" element={<CreateClient />} />
              <Route path=":id" element={<ShowClient />} />
              <Route path=":id/edit" element={<EditClient />} />
            </Route>

            {/* ================= BLOGS ================= */}
            <Route path="blogs">
              <Route index element={<BlogsIndex />} />
              <Route path="create" element={<CreateBlog />} />
              <Route path=":id" element={<ShowBlog />} />
              <Route path=":id/edit" element={<EditBlog />} />
            </Route>

            {/* ================= TESTIMONIALS ================= */}
            <Route path="testimonials">
              <Route index element={<TestimonialsIndex />} />
              <Route path="create" element={<CreateTestimonial />} />
              <Route path=":id" element={<ShowTestimonial />} />
              <Route path=":id/edit" element={<EditTestimonial />} />
            </Route>

            {/* ================= ACHIEVEMENTS ================= */}
            <Route path="achievements">
              <Route index element={<AchievementsIndex />} />
              <Route path="create" element={<CreateAchievement />} />
              <Route path=":id" element={<ShowAchievement />} />
              <Route path=":id/edit" element={<EditAchievement />} />
            </Route>

            {/* ================= FAQ ================= */}
            <Route path="faqs">
              <Route index element={<FaqIndex />} />
              <Route path="create" element={<CreateFaq />} />
              <Route path=":id/edit" element={<EditFaq />} />
            </Route>

            {/* ================= AREAS ================= */}
            <Route path="areas">
              <Route index element={<AreasIndex />} />
              <Route path="create" element={<CreateArea />} />
              <Route path=":id" element={<ShowArea />} />
              <Route path=":id/edit" element={<EditArea />} />
            </Route>

            {/* ================= TEAMS ================= */}
            <Route path="teams">
              <Route index element={<TeamsIndex />} />
              <Route path="create" element={<CreateTeam />} />
              <Route path=":id" element={<ShowTeam />} />
              <Route path=":id/edit" element={<EditTeam />} />
            </Route>

            {/* Admin Not Found */}
          </Route>

          {/* Admin fallback */}
        </Route>

        {/* GLOBAL FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
