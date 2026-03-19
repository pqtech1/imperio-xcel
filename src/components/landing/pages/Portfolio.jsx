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
  CalendarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useProjects } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/imageUtils";

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
      keywords: ["tanishq", "titan", "nykaa", "jewelry", "mia"],
    },
    {
      name: "Hospitality & Others",
      icon: HomeModernIcon,
      keywords: ["hotel", "amritsar", "hospitality", "shubhra", "top in town"],
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
        locations:
          [project.district, project.state, project.country]
            .filter(Boolean)
            .join(", ") || "Location",
        count: project.images?.length || 0,
        images: project.images?.map((img) => img.image_path) || [],
        address: project.address,
        ongoing: project.ongoing,
        description: project.description,
      })),
  }));

  // Add "Other Projects" category for uncategorized projects
  const categorizedIds = new Set(
    categorized.flatMap((c) => c.projects.map((p) => p.id)),
  );

  const otherProjects = projects
    .filter((p) => !categorizedIds.has(p.id))
    .map((project) => ({
      id: project.id,
      name: project.name,
      locations:
        [project.district, project.state, project.country]
          .filter(Boolean)
          .join(", ") || "Location",
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

// Flatten all projects
const getAllProjects = (categories) => {
  return categories?.flatMap((category) => category.projects) || [];
};

// Get category for a project
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

  // Process projects when data loads
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

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? sortedProjects
      : projectCategories.find((c) => c.name === selectedCategory)?.projects ||
        [];

  // Autoplay plugin for carousel
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  // Prepare slides for lightbox
  const lightboxSlides =
    currentProject?.images.map((imagePath) => ({
      src: getImageUrl(imagePath) || "",
      alt: `${currentProject.name}`,
    })) || [];

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Calculate stats
  const totalProjects = allProjects.length;
  const totalImages = allProjects.reduce((acc, p) => acc + p.images.length, 0);
  const bankProjects = allProjects.filter(
    (p) =>
      p.name.toLowerCase().includes("bank") ||
      p.name.toLowerCase().includes("finance"),
  ).length;
  const districts = new Set(
    allProjects.flatMap((p) => p.locations.split(",").map((l) => l.trim())),
  ).size;

  if (loading) {
    return (
      <>
        {/* Hero Section */}
        <div className="w-full relative">
          <img
            src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
            alt="Portfolio Hero"
            className="w-full object-cover h-64 sm:h-72 md:h-120"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-[2px] bg-brand-gold-light" />
                  <h6 className="!text-brand-gold-light !mb-0">OUR WORK</h6>
                </div>
                <h1 className="text-white !mb-1">Portfolio</h1>
                <p className="text-gray-200 !mb-0">Loading projects...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="section-px pt-10 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-brand-gold border-t-transparent rounded-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <div className="w-full relative">
          <img
            src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
            alt="Portfolio Hero"
            className="w-full object-cover h-64 sm:h-72 md:h-120"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-[2px] bg-brand-gold-light" />
                  <h6 className="!text-brand-gold-light !mb-0">OUR WORK</h6>
                </div>
                <h1 className="text-white !mb-1">Portfolio</h1>
                <p className="text-gray-200 !mb-0">No projects found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="section-px pt-10 pb-12">
          <div className="max-w-7xl mx-auto text-center py-12">
            <p className="text-gray-500">
              No projects available at the moment.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section with Gradient */}
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
          alt="Portfolio Hero"
          className="w-full object-cover h-64 sm:h-72 md:h-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">OUR WORK</h6>
              </div>
              <h1 className="text-white !mb-1">Portfolio</h1>
              <p className="text-gray-200 !mb-0">
                {totalProjects} Projects  •{" "}
                {districts}+ Locations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="section-px pt-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Stats */}
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <h6 className="text-brand-gold-light">OUR PORTFOLIO</h6>
            <h1 className="!text-2xl md:!text-3xl font-light tracking-tight !mb-0">
              We let our work speak for itself
            </h1>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-brand-gold-light"
                  style={{ opacity: 0.3 + i * 0.03 }}
                />
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 w-full max-w-3xl">
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  {totalProjects}+
                </div>
                <div className="text-gray-600">Total Projects</div>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  {totalImages}+
                </div>
                <div className="text-gray-600">Images</div>
              </div>
             
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  {districts}+
                </div>
                <div className="text-gray-600">Locations</div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          {projectCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1.5 font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-brand-gold-light text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    className={`px-3 py-1.5 font-medium rounded-full transition-all duration-300 flex items-center gap-1 ${
                      selectedCategory === category.name
                        ? "bg-brand-gold-light text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Content - Tabs Left, Image Right */}
          <div className="flex flex-col md:flex-row gap-4 h-[500px]">
            {/* Left Side - Project Tabs with Scroll */}
            <div className="w-full md:w-1/3 lg:w-1/4 border border-gray-200 bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-3 text-base font-semibold text-center border-b border-gray-200 bg-white">
                <span className="text-brand-gold-light">
                  {filteredProjects.length}
                </span>{" "}
                Projects
              </div>
              <div className="h-[calc(500px-60px)] overflow-y-auto p-2">
                {filteredProjects.map((project) => {
                  const category = getProjectCategory(
                    project.name,
                    projectCategories,
                  );
                  const CategoryIcon = category?.icon;
                  const isOngoing = project.ongoing === 1;

                  return (
                    <button
                      key={project.id || project.name}
                      onClick={() => setActiveProject(project.name)}
                      className={`w-full text-left px-3 py-2 mb-1 font-medium transition-all duration-200 rounded-md ${
                        activeProject === project.name
                          ? "bg-brand-gold-light text-white shadow"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="truncate font-semibold">
                            {project.name}
                          </span>
                          <span
                            className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                              activeProject === project.name
                                ? "bg-white/20 text-white"
                                : project.ongoing === 1
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {project.ongoing === 1
                              ? "Ongoing"
                              : project.images.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-80 text-xs">
                          {CategoryIcon && (
                            <CategoryIcon className="w-2.5 h-2.5" />
                          )}
                          <span className="truncate">{project.locations}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Image Carousel */}
            <div className="w-full md:w-2/3 lg:w-3/4 h-full">
              {currentProject && (
                <div className="h-full flex flex-col">
                  <div className="text-center mb-2">
                    <h2 className="text-base font-bold text-brand-charcoal">
                      {currentProject.name}
                    </h2>
                    <div className="flex items-center justify-center gap-1 text-gray-500">
                      <MapPinIcon className="w-3 h-3 text-brand-gold-light" />
                      <span>{currentProject.locations}</span>
                      {currentProject.ongoing === 1 && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                          Ongoing
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
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
                              <div className="h-full p-1">
                                <div
                                  className="relative h-full rounded-md shadow bg-white overflow-hidden group cursor-pointer"
                                  onClick={() => handleImageClick(index)}
                                >
                                  <img
                                    src={getImageUrl(imagePath)}
                                    alt={`${currentProject.name} - ${index + 1}`}
                                    className="w-full h-full object-contain p-1"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/800x600?text=Image+Not+Found";
                                    }}
                                  />

                                  {/* Hover overlay */}
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <span className="bg-white/90 text-brand-charcoal px-3 py-1.5 rounded-full font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow flex items-center gap-1">
                                      <span>Click to expand</span>
                                      <span className="text-brand-gold-light text-base">
                                        +
                                      </span>
                                    </span>
                                  </div>

                                  {/* Image counter badge */}
                                  <div className="absolute top-1 right-1 bg-black/60 text-white px-1.5 py-0.5 rounded-full text-xs">
                                    {index + 1} / {currentProject.images.length}
                                  </div>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-brand-gold-light hover:text-white border-0 shadow w-6 h-6" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-brand-gold-light hover:text-white border-0 shadow w-6 h-6" />
                      </Carousel>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        No images available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Projects Highlight */}
          <div className="mt-8 bg-gradient-to-r from-brand-charcoal to-black text-white p-5 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <TrophyIcon className="w-8 h-8 text-brand-gold-light" />
                <div>
                  <h3 className="text-base font-bold mb-1">Key Achievements</h3>
                  <p className="text-gray-300">
                    Projects delivered across multiple sectors
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    {districts}
                  </div>
                  <div className="text-gray-400">Locations</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    {allProjects.filter((p) => p.ongoing === 1).length}
                  </div>
                  <div className="text-gray-400">Ongoing</div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
};

export default Portfolio;
