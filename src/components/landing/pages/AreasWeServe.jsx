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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useAreas } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";

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
  const [sortBy, setSortBy] = useState("title"); // 'title', 'projects', 'clients'

  useEffect(() => {
    if (areas) {
      let filtered = [...areas];

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (area) =>
            area.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            area.description?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      // Apply sorting
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

  // Calculate total stats
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
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="w-full relative bg-gradient-to-r from-brand-charcoal to-black text-white max py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto section-px py-20 relative z-10">
          

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-brand-gold-light" />
              <h6 className="text-brand-gold-light font-semibold tracking-wider !mb-0">
                WHERE WE EXCEL
              </h6>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white !mb-4">
              Areas We Serve
            </h1>
            <p className="text-xl text-gray-300 !mb-0">
              Delivering excellence across {areas?.length || 0} specialized
              sectors with proven expertise and track record.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto section-px py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-amber-50/50 p-6 rounded-lg text-center">
              <BriefcaseIcon className="w-8 h-8 text-brand-gold-light mx-auto mb-3" />
              <div className="text-3xl font-bold text-brand-charcoal">
                {formatNumber(totalProjects)}+
              </div>
              <div className="text-gray-600">Total Projects Completed</div>
            </div>
            <div className="bg-amber-50/50 p-6 rounded-lg text-center">
              <UserGroupIcon className="w-8 h-8 text-brand-gold-light mx-auto mb-3" />
              <div className="text-3xl font-bold text-brand-charcoal">
                {formatNumber(totalClients)}+
              </div>
              <div className="text-gray-600">Clients Served</div>
            </div>
            <div className="bg-amber-50/50 p-6 rounded-lg text-center">
              <CalendarIcon className="w-8 h-8 text-brand-gold-light mx-auto mb-3" />
              <div className="text-3xl font-bold text-brand-charcoal">
                {avgExperience}+
              </div>
              <div className="text-gray-600">Average Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="container mx-auto section-px py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold-light focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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

          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("title")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "title"
                  ? "bg-brand-gold-light text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Sort by Name
            </button>
            <button
              onClick={() => setSortBy("projects")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "projects"
                  ? "bg-brand-gold-light text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Most Projects
            </button>
            <button
              onClick={() => setSortBy("clients")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "clients"
                  ? "bg-brand-gold-light text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-gold-light/20 to-brand-charcoal/20 flex items-center justify-center">
                        <Icon className="w-20 h-20 text-brand-gold-light/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Icon Overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-brand-gold-light" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-4 right-4 bg-brand-gold-light text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {area.projects_done || 0} Projects
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-gold-light transition-colors">
                      {area.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {area.description ||
                        "Specialized interior solutions with proven expertise."}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-brand-gold-light">
                          {area.projects_done || 0}+
                        </div>
                        <div className="text-xs text-gray-500">Projects</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-brand-gold-light">
                          {area.clients_served || 0}+
                        </div>
                        <div className="text-xs text-gray-500">Clients</div>
                      </div>
                    </div>

                    {/* Experience Bar */}
                    {area.years_experience && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Experience</span>
                          <span>{area.years_experience} years</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-brand-gold-light rounded-full h-2 transition-all duration-500"
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
            <BuildingStorefrontIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Areas Found
            </h3>
            <p className="text-gray-500">
              No areas match your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-charcoal to-black text-white">
        <div className="container mx-auto section-px py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Let's discuss how we can help transform your space with our
              expertise.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gold-light hover:bg-brand-gold text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Get in Touch
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreasWeServe;
