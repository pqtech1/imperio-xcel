import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Thumbnails,
  Fullscreen,
  Zoom,
  Counter,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  BuildingLibraryIcon,
  HomeModernIcon,
  TrophyIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useProjects } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";
import { Link } from "react-router-dom";

// Helper function to format location from address fields
const formatLocation = (project) => {
  const parts = [];

  // Add address if exists
  if (project.address && project.address.trim()) {
    parts.push(project.address.trim());
  }

  // Add district if exists
  if (project.district && project.district.trim()) {
    parts.push(project.district.trim());
  }

  // Add state if exists
  if (project.state && project.state.trim()) {
    parts.push(project.state.trim());
  }

  // Add country if exists
  if (project.country && project.country.trim()) {
    parts.push(project.country.trim());
  }

  // If no parts, return "Location not specified"
  if (parts.length === 0) {
    return "Location not specified";
  }

  // Join with comma and space
  return parts.join(", ");
};

// Categorize projects based on their names/keywords
const categorizeProjects = (projects) => {
  if (!projects) return [];

  const categories = [
    {
      name: "Banking & Finance",
      icon: BuildingLibraryIcon,
      keywords: [
        "bank",
        "finance",
        "union bank",
        "icici",
        "uco",
        "canara",
        "baroda",
      ],
    },
    {
      name: "Retail & Fashion",
      icon: BuildingStorefrontIcon,
      keywords: [
        "allen solly",
        "peter england",
        "polo",
        "louis philippe",
        "van heusen",
        "raymond",
        "retail",
      ],
    },
    {
      name: "Jewelry & Lifestyle",
      icon: SparklesIcon,
      keywords: ["tanishq", "titan", "nykaa", "jewelry", "mia", "helios"],
    },
    {
      name: "Hospitality & Others",
      icon: HomeModernIcon,
      keywords: [
        "hotel",
        "amritsar",
        "hospitality",
        "shubhra",
        "top in town",
        "mall",
      ],
    },
  ];

  const categorized = categories.map((category) => ({
    ...category,
    projects: projects
      .filter((project) =>
        category.keywords.some((keyword) =>
          project.name?.toLowerCase().includes(keyword.toLowerCase()),
        ),
      )
      .map((project) => ({
        id: project.id,
        name: project.name,
        location: formatLocation(project),
        count: project.images?.length || 0,
        images: project.images?.map((img) => img.image_path) || [],
        address: project.address,
        ongoing: project.ongoing,
        description: project.description,
      })),
  }));

  const categorizedIds = new Set(
    categorized.flatMap((c) => c.projects.map((p) => p.id)),
  );

  const otherProjects = projects
    .filter((p) => !categorizedIds.has(p.id))
    .map((project) => ({
      id: project.id,
      name: project.name,
      location: formatLocation(project),
      count: project.images?.length || 0,
      images: project.images?.map((img) => img.image_path) || [],
      address: project.address,
      ongoing: project.ongoing,
      description: project.description,
    }));

  if (otherProjects.length > 0) {
    categorized.push({
      name: "Other Projects",
      icon: HomeModernIcon,
      projects: otherProjects,
    });
  }

  return categorized.filter((c) => c.projects.length > 0);
};

const getAllProjects = (categories) => {
  return categories?.flatMap((category) => category.projects) || [];
};

const getProjectCategory = (projectName, categories) => {
  for (const category of categories) {
    const found = category.projects.find((p) => p.name === projectName);
    if (found) return category;
  }
  return null;
};

const Portfolio = () => {
  const { data: projects, loading } = useProjects();
  const [projectCategories, setProjectCategories] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (projects && projects.length > 0) {
      const categories = categorizeProjects(projects);
      setProjectCategories(categories);

      const all = getAllProjects(categories);
      setAllProjects(all);

      const sorted = [...all].sort((a, b) => a.name.localeCompare(b.name));
      setSortedProjects(sorted);

      if (sorted.length > 0) {
        setActiveProject(sorted[0].name);
      }
    }
  }, [projects]);

  const currentProject = sortedProjects.find(
    (project) => project.name === activeProject,
  );

  const filteredProjects =
    selectedCategory === "All"
      ? sortedProjects
      : projectCategories.find((c) => c.name === selectedCategory)?.projects ||
        [];

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  const lightboxSlides =
    currentProject?.images.map((imagePath) => ({
      src: getImageUrl(imagePath) || "",
      alt: `${currentProject.name}`,
    })) || [];

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const totalProjects = allProjects.length;
  const totalImages = allProjects.reduce((acc, p) => acc + p.images.length, 0);
  const bankProjects = allProjects.filter(
    (p) =>
      p.name.toLowerCase().includes("bank") ||
      p.name.toLowerCase().includes("finance"),
  ).length;

  // Get unique locations
  const locations = new Set(
    allProjects
      .map((p) => p.location)
      .filter((loc) => loc !== "Location not specified"),
  );
  const totalLocations = locations.size;

  if (loading) {
    return (
      <>
        <SEO
          title="Portfolio - Our Interior Design Projects | InterioXcel"
          description="Explore our portfolio of interior design projects including banking, retail, hospitality, and residential spaces."
          keywords="portfolio, interior design projects, bank interiors, retail design"
          image="https://interioxcel.com/portfolio-og-image.jpg"
          url="https://interioxcel.com/portfolio"
        />
        <div className="bg-white">
          <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
                alt="Portfolio Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto section-px">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px bg-brand-gold-light" />
                    <h6 className="text-brand-gold-light mb-0">OUR WORK</h6>
                  </div>
                  <h1 className="text-white mb-1">Portfolio</h1>
                  <p className="text-white/80 mb-0">Loading projects...</p>
                </div>
              </div>
            </div>
          </section>
          <div className="container mx-auto section-px py-16">
            <div className="flex justify-center">
              <PageLoader />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <>
        <SEO
          title="Portfolio - Our Interior Design Projects | InterioXcel"
          description="Explore our portfolio of interior design projects."
          keywords="portfolio, interior design projects"
          image="https://interioxcel.com/portfolio-og-image.jpg"
          url="https://interioxcel.com/portfolio"
        />
        <div className="bg-white">
          <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
                alt="Portfolio Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto section-px">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px bg-brand-gold-light" />
                    <h6 className="text-brand-gold-light mb-0">OUR WORK</h6>
                  </div>
                  <h1 className="text-white mb-1">Portfolio</h1>
                  <p className="text-white/80 mb-0">No projects found</p>
                </div>
              </div>
            </div>
          </section>
          <div className="container mx-auto section-px py-16 text-center">
            <p className="text-brand-charcoal/60">
              No projects available at the moment.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Portfolio - ${totalProjects}+ Interior Design Projects | InterioXcel`}
        description={`Explore our portfolio of ${totalProjects}+ interior design projects across ${totalLocations}+ locations.`}
        keywords="portfolio, interior design projects, bank interiors, retail design"
        image="https://interioxcel.com/portfolio-og-image.jpg"
        url="https://interioxcel.com/portfolio"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
              alt="Portfolio Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-px bg-brand-gold-light" />
                  <h6 className="text-brand-gold-light mb-0">OUR PORTFOLIO</h6>
                </div>
                <h1 className="text-white mb-3">
                  We Let Our Work
                  <br />
                  <span className="text-brand-gold">Speak for Itself</span>
                </h1>
                <p className="text-white/80 mb-0">
                  {totalProjects}+ Projects • {totalLocations}+ Locations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Content */}
        <div className="container mx-auto section-px py-16">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-bg-soft p-6 text-center border border-brand-gold/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                {totalProjects}+
              </div>
              <h6 className="mb-0">Total Projects</h6>
            </div>
            <div className="bg-bg-soft p-6 text-center border border-brand-gold/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                {totalImages}+
              </div>
              <h6 className="mb-0">Images</h6>
            </div>
            <div className="bg-bg-soft p-6 text-center border border-brand-gold/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                {totalLocations}+
              </div>
              <h6 className="mb-0">Locations</h6>
            </div>
          </div>

          {/* Category Filters */}
          {projectCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-brand-gold text-white"
                    : "bg-bg-soft text-brand-charcoal/70 hover:bg-brand-gold/10"
                }`}
              >
                All Projects
              </button>
              {projectCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.name
                        ? "bg-brand-gold text-white"
                        : "bg-bg-soft text-brand-charcoal/70 hover:bg-brand-gold/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 min-h-[550px]">
            {/* Left Side - Project Tabs */}
            <div className="w-full lg:w-1/3 bg-bg-soft border border-brand-gold/10 overflow-hidden">
              <div className="p-4 text-center border-b border-brand-gold/10 bg-white">
                <h5 className="mb-0">
                  <span className="text-brand-gold">
                    {filteredProjects.length}
                  </span>{" "}
                  Projects
                </h5>
              </div>
              <div className="h-[450px] overflow-y-auto p-2">
                {filteredProjects.map((project) => {
                  const category = getProjectCategory(
                    project.name,
                    projectCategories,
                  );
                  const CategoryIcon = category?.icon;

                  return (
                    <button
                      key={project.id || project.name}
                      onClick={() => setActiveProject(project.name)}
                      className={`w-full text-left p-3 mb-1 transition-all duration-200 ${
                        activeProject === project.name
                          ? "bg-brand-gold text-white"
                          : "bg-white text-brand-charcoal hover:bg-brand-gold/5 border border-brand-gold/10"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <h5
                            className={`mb-0 ${activeProject === project.name ? "text-white" : "text-brand-charcoal"}`}
                          >
                            {project.name}
                          </h5>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              activeProject === project.name
                                ? "bg-white/20 text-white"
                                : project.ongoing === 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {project.ongoing === 1
                              ? "Ongoing"
                              : project.images.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {CategoryIcon && (
                            <CategoryIcon
                              className={`w-3 h-3 ${activeProject === project.name ? "text-white/80" : "text-brand-gold"}`}
                            />
                          )}
                          <span
                            className={`truncate ${
                              activeProject === project.name
                                ? "text-white/80"
                                : "text-brand-charcoal/60"
                            }`}
                            title={project.location}
                          >
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Image Carousel */}
            <div className="w-full lg:w-2/3">
              {currentProject && (
                <div className="flex flex-col h-full">
                  <div className="text-center mb-4">
                    <h3 className="mb-1">{currentProject.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-brand-charcoal/60">
                      <MapPinIcon className="w-4 h-4 text-brand-gold" />
                      <span>{currentProject.location}</span>
                      {currentProject.ongoing === 1 && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Ongoing
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative bg-bg-soft rounded-lg overflow-hidden h-[450px]">
                    {currentProject.images.length > 0 ? (
                      <Carousel
                        plugins={[autoplayPlugin.current]}
                        opts={{
                          align: "center",
                          loop: true,
                        }}
                        className="w-full h-full"
                      >
                        <CarouselContent className="h-full">
                          {currentProject.images.map((imagePath, index) => (
                            <CarouselItem key={index} className="h-full">
                              <div className="h-full p-2">
                                <div
                                  className="relative h-full rounded-md bg-white overflow-hidden group cursor-pointer"
                                  onClick={() => handleImageClick(index)}
                                >
                                  <img
                                    src={getImageUrl(imagePath)}
                                    alt={`${currentProject.name} - ${index + 1}`}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/800x600?text=Image+Not+Found";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <span className="bg-white text-brand-charcoal px-3 py-1.5 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow flex items-center gap-1">
                                      <span>Click to expand</span>
                                      <span className="text-brand-gold text-lg">
                                        +
                                      </span>
                                    </span>
                                  </div>
                                  <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                                    {index + 1} / {currentProject.images.length}
                                  </div>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-brand-gold hover:text-white border-0 shadow w-8 h-8" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-brand-gold hover:text-white border-0 shadow w-8 h-8" />
                      </Carousel>
                    ) : (
                      <div className="h-full flex items-center justify-center text-brand-charcoal/40">
                        No images available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Projects Highlight */}
          <div className="mt-12 bg-brand-charcoal p-6 border-l-4 border-brand-gold">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <TrophyIcon className="w-10 h-10 text-brand-gold" />
                <div>
                  <h4 className="text-white mb-1">Key Achievements</h4>
                  <p className="text-white/60 mb-0">
                    Projects delivered across multiple sectors
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-brand-gold mb-1">
                    {totalLocations}
                  </div>
                  <p className="text-white/60 mb-0">Locations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-brand-gold mb-1">
                    {allProjects.filter((p) => p.ongoing === 1).length}
                  </div>
                  <p className="text-white/60 mb-0">Ongoing Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-brand-gold mb-1">
                    {bankProjects}
                  </div>
                  <p className="text-white/60 mb-0">Bank Models</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <h3 className="mb-2">Ready to Start Your Project?</h3>
            <p className="text-brand-charcoal/60 mb-6 max-w-2xl mx-auto">
              Let's create something amazing together. Contact us today to
              discuss your interior design requirements.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Schedule a Consultation
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Lightbox Gallery */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Thumbnails, Fullscreen, Zoom, Counter]}
          thumbnails={{
            position: "bottom",
            width: 60,
            height: 40,
            border: 1,
            borderRadius: 4,
            padding: 2,
            gap: 4,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
          }}
          counter={{
            container: {
              style: {
                top: 12,
                right: 12,
                background: "rgba(184, 138, 68, 0.9)",
                color: "white",
                padding: "2px 8px",
                borderRadius: 16,
                fontSize: 12,
              },
            },
          }}
          styles={{
            container: { backgroundColor: "rgba(0,0,0,0.95)" },
            thumbnail: { borderColor: "#b88a44" },
          }}
        />
      </div>
    </>
  );
};

export default Portfolio;
