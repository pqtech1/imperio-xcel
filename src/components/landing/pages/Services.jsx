import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useServices } from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import SEO from "./SEO";
import { PageLoader } from "../Layouts/Header";

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const servicePath = `/${service.slug || service.id}`;

  const handleCardClick = () => {
    navigate(servicePath);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    // Navigation will be handled by the Link component
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            !imageError && service.service_banner_img
              ? getImageUrl(service.service_banner_img)
              : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
          }
          alt={service.service_title || service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          Service
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold mb-2 text-brand-charcoal group-hover:text-brand-gold transition-colors line-clamp-2">
          {service.service_title || service.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {stripHtml(
            service.service_short_description || service.description || "",
          ).substring(0, 120)}
          ...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-brand-gold">
            <SparklesIcon className="w-4 h-4" />
            <span>Premium Service</span>
          </div>

          <Link
            to={servicePath}
            onClick={handleLinkClick}
            className={`inline-flex items-center gap-2 text-brand-gold font-medium text-sm transition-all duration-300 ${
              hovered ? "gap-3" : "gap-2"
            }`}
          >
            Learn More <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { data: services, loading } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (services) {
      // Extract unique categories from services and filter out "Other"
      const uniqueCategories = [
        "all",
        ...new Set(
          services
            .map((s) => s.category || s.service_category)
            .filter((cat) => cat && cat !== "Other"), // Remove "Other" category
        ),
      ];
      setCategories(uniqueCategories);

      // Filter services
      let filtered = [...services];

      if (searchTerm) {
        filtered = filtered.filter(
          (s) =>
            (s.service_title || s.title || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (s.service_short_description || s.description || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );
      }

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (s) => (s.category || s.service_category) === selectedCategory,
        );
      }

      setFilteredServices(filtered);
    }
  }, [services, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <>
        <SEO
          title="Our Services - Professional Interior Design Solutions"
          description="Explore our comprehensive range of interior design services including residential, commercial, retail, and more."
          keywords="interior design services, home renovation, commercial interiors"
        />
        <div className="bg-white">
          <div className="container mx-auto section-px py-16">
            <div className="flex justify-center">
              <PageLoader />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Our Services - ${services?.length || 0}+ Professional Interior Design Solutions`}
        description="Discover our comprehensive range of interior design services tailored to your needs. From residential to commercial spaces, we deliver excellence in every project."
        keywords="interior design services, home renovation, commercial interiors, office design, retail spaces"
        url="https://interioxcel.com/services"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
              alt="Our Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <h1 className="text-white mb-3">
                  Our <span className="text-brand-gold">Services</span>
                </h1>
                <p className="text-white/80 mb-0 text-lg">
                  Comprehensive interior design solutions tailored to your
                  unique needs
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gray-50">
          {/* Search and Filter Section */}
          <div className="container mx-auto section-px py-12">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all outline-none text-gray-800"
                />
              </div>

              {/* Category Filters */}
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-brand-gold text-white shadow-md"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {category === "all" ? "All Services" : category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Services Grid */}
          <div className="container mx-auto section-px pb-20">
            {filteredServices.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-heading mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="mt-6 px-6 py-2 bg-brand-gold text-white rounded-full hover:bg-brand-gold-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-brand-charcoal">
            <div className="container mx-auto section-px py-16 text-center">
              <SparklesIcon className="w-12 h-12 mx-auto text-brand-gold mb-4" />
              <h2 className="text-white mb-3">Need Custom Interior Design?</h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Let's discuss your project requirements and create something
                extraordinary together.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Get Free Consultation
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
