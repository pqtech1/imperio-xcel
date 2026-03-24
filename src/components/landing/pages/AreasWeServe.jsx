import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BuildingStorefrontIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAreas } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";

// Map icons based on area title or use default
const getAreaIcon = (title, index) => {
  const icons = [
    BuildingStorefrontIcon,
    BuildingLibraryIcon,
    BuildingOffice2Icon,
    HomeModernIcon,
  ];

  if (title?.toLowerCase().includes("retail")) return BuildingStorefrontIcon;
  if (
    title?.toLowerCase().includes("finance") ||
    title?.toLowerCase().includes("bank")
  )
    return BuildingLibraryIcon;
  if (title?.toLowerCase().includes("corporate")) return BuildingOffice2Icon;
  if (
    title?.toLowerCase().includes("hospitality") ||
    title?.toLowerCase().includes("hotel")
  )
    return HomeModernIcon;

  return icons[index % icons.length];
};

// Format number with commas
const formatNumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const AreasWeServe = () => {
  const { data: areas, loading } = useAreas();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    if (areas) {
      let filtered = [...areas];

      if (searchTerm) {
        filtered = filtered.filter(
          (area) =>
            area.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            area.description?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      filtered.sort((a, b) => {
        if (sortBy === "title") {
          return a.title?.localeCompare(b.title);
        } else if (sortBy === "projects") {
          return (b.projects_done || 0) - (a.projects_done || 0);
        } else if (sortBy === "clients") {
          return (b.clients_served || 0) - (a.clients_served || 0);
        }
        return 0;
      });

      setFilteredAreas(filtered);
    }
  }, [areas, searchTerm, sortBy]);

  const totalProjects =
    areas?.reduce((sum, area) => sum + (area.projects_done || 0), 0) || 0;
  const totalClients =
    areas?.reduce((sum, area) => sum + (area.clients_served || 0), 0) || 0;
  const avgExperience = areas?.length
    ? Math.round(
        areas.reduce((sum, area) => sum + (area.years_experience || 0), 0) /
          areas.length,
      )
    : 0;

  if (loading) {
    return (
      <>
        <SEO
          title="Areas We Serve - Interior Design Expertise | InterioXcel"
          description="Explore our specialized interior design expertise across retail, banking, corporate, hospitality sectors. Over 50+ projects completed."
          keywords="areas we serve, interior design sectors, retail design, banking interiors, corporate offices, hospitality design"
          image="https://interioxcel.com/areas-og-image.jpg"
          url="https://interioxcel.com/areas-we-serve"
        />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <PageLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Areas We Serve - ${areas?.length || 0}+ Specialized Sectors | InterioXcel`}
        description={`Explore our interior design expertise across ${areas?.length || 0} specialized sectors. ${totalProjects}+ projects completed, ${totalClients}+ clients served.`}
        keywords="areas we serve, interior design sectors, retail design, banking interiors, corporate offices, hospitality design, Varanasi"
        image="https://interioxcel.com/areas-og-image.jpg"
        url="https://interioxcel.com/areas-we-serve"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-brand-charcoal">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-gold-light" />
                  <h6 className="text-brand-gold-light mb-0">WHERE WE EXCEL</h6>
                </div>
                <h1 className="text-white mb-4">Areas We Serve</h1>
                <p className="text-white/80 text-lg mb-0">
                  Delivering excellence across {areas?.length || 0} specialized
                  sectors with proven expertise and track record.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <div className="bg-bg-soft border-b border-brand-gold/10">
          <div className="container mx-auto section-px py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 text-center border border-brand-gold/10">
                <BriefcaseIcon className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal">
                  {formatNumber(totalProjects)}+
                </div>
                <h6 className="mb-0">Total Projects Completed</h6>
              </div>
              <div className="bg-white p-6 text-center border border-brand-gold/10">
                <UserGroupIcon className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal">
                  {formatNumber(totalClients)}+
                </div>
                <h6 className="mb-0">Clients Served</h6>
              </div>
              <div className="bg-white p-6 text-center border border-brand-gold/10">
                <CalendarIcon className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal">
                  {avgExperience}+
                </div>
                <h6 className="mb-0">Average Years Experience</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="container mx-auto section-px pt-12 pb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-brand-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-brand-charcoal"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-brand-charcoal/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSortBy("title")}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  sortBy === "title"
                    ? "bg-brand-gold text-white"
                    : "bg-bg-soft text-brand-charcoal/70 hover:bg-brand-gold/10"
                }`}
              >
                Sort by Name
              </button>
              <button
                onClick={() => setSortBy("projects")}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  sortBy === "projects"
                    ? "bg-brand-gold text-white"
                    : "bg-bg-soft text-brand-charcoal/70 hover:bg-brand-gold/10"
                }`}
              >
                Most Projects
              </button>
              <button
                onClick={() => setSortBy("clients")}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  sortBy === "clients"
                    ? "bg-brand-gold text-white"
                    : "bg-bg-soft text-brand-charcoal/70 hover:bg-brand-gold/10"
                }`}
              >
                Most Clients
              </button>
            </div>
          </div>
        </div>

        {/* Areas Grid */}
        <div className="container mx-auto section-px pb-16">
          {filteredAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAreas.map((area, index) => {
                const Icon = getAreaIcon(area.title, index);
                const imageUrl = area.image ? getImageUrl(area.image) : null;

                return (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-brand-gold/10"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-gold/10 to-brand-charcoal/10 flex items-center justify-center">
                          <Icon className="w-20 h-20 text-brand-gold/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-brand-gold" />
                      </div>

                      <div className="absolute bottom-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {area.projects_done || 0} Projects
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="mb-2 group-hover:text-brand-gold transition-colors">
                        {area.title}
                      </h4>

                      <p className="text-brand-charcoal/60 text-sm mb-4 line-clamp-2">
                        {area.description ||
                          "Specialized interior solutions with proven expertise."}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-bg-soft p-3 text-center border border-brand-gold/10">
                          <div className="text-lg font-heading font-bold text-brand-gold">
                            {area.projects_done || 0}+
                          </div>
                          <p className="text-xs text-brand-charcoal/60 mb-0">
                            Projects
                          </p>
                        </div>
                        <div className="bg-bg-soft p-3 text-center border border-brand-gold/10">
                          <div className="text-lg font-heading font-bold text-brand-gold">
                            {area.clients_served || 0}+
                          </div>
                          <p className="text-xs text-brand-charcoal/60 mb-0">
                            Clients
                          </p>
                        </div>
                      </div>

                      {area.years_experience && (
                        <div>
                          <div className="flex justify-between text-xs text-brand-charcoal/60 mb-1">
                            <span>Experience</span>
                            <span>{area.years_experience} years</span>
                          </div>
                          <div className="w-full bg-bg-soft rounded-full h-1.5">
                            <div
                              className="bg-brand-gold rounded-full h-1.5 transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (area.years_experience / 30) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <BuildingStorefrontIcon className="w-16 h-16 text-brand-charcoal/30 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-light text-brand-charcoal mb-2">
                No Areas Found
              </h3>
              <p className="text-brand-charcoal/60">
                No areas match your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-brand-charcoal">
          <div className="container mx-auto section-px py-16 text-center">
            <h2 className="text-white mb-4">Ready to Work With Us?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your space with our
              expertise.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Get in Touch
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AreasWeServe;
