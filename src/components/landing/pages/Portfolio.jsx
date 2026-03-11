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

// Organize projects by category based on your PDF content
const projectCategories = [
  {
    name: "Banking & Finance",
    icon: BuildingLibraryIcon,
    projects: [
      {
        name: "UNION BANK OF INDIA",
        locations: [
          "Jaunpur - Machhalishahar",
          "Sujanganj",
          "Uskerakat",
          "Usk Purani Bazar",
          "Maseera",
          "Varanasi - Kamalpur",
          "Sakaldiha",
          "Chakiya",
          "Goldloan Point",
        ],
        count: 9,
        images: [
          "/img/union-bank-of-india-jaunpur-machhalishahar-sujanganj-uskkerakat-usk-purani-bazar-maseera/69.jpg",
          "/img/union-bank-of-india-jaunpur-machhalishahar-sujanganj-uskkerakat-usk-purani-bazar-maseera/70.jpg",
          "/img/union-bank-of-india-jaunpur-machhalishahar-sujanganj-uskkerakat-usk-purani-bazar-maseera/71.jpg",
          "/img/union-bank-of-india-jaunpur-machhalishahar-sujanganj-uskkerakat-usk-purani-bazar-maseera/72.jpg",
        ],
      },
      {
        name: "KASHI GOMATI SAMYUKT GRAMEEN BANK",
        locations: ["40 Models across 8 Districts"],
        count: 40,
        images: [
          "/img/kashi-gomati-samyukt-grameen-bank-40-models-8-districts/75.jpg",
          "/img/kashi-gomati-samyukt-grameen-bank-40-models-8-districts/76.jpg",
        ],
      },
      {
        name: "BANK OF BARODA",
        locations: ["Uttar Pradesh"],
        count: 2,
        images: [
          "/img/bank-of-baroda-uttar-pradesh/50.jpg",
          "/img/bank-of-baroda-uttar-pradesh/51.jpg",
        ],
      },
      {
        name: "CANARA BANK",
        locations: ["Lucknow", "Lachhipur", "Gorakhpur"],
        count: 4,
        images: [
          "/img/canara-bank-circle-office-lucknow-lachhipur-gorakhpur/65.jpg",
          "/img/canara-bank-circle-office-lucknow-lachhipur-gorakhpur/66.jpg",
          "/img/canara-bank-circle-office-lucknow-lachhipur-gorakhpur/67.jpg",
          "/img/canara-bank-circle-office-lucknow-lachhipur-gorakhpur/68.jpg",
        ],
      },
      {
        name: "ICICI BANK",
        locations: ["Varanasi - Rajatalab"],
        count: 4,
        images: [
          "/img/icici-bank-rajatalab-varanasi/52.jpg",
          "/img/icici-bank-rajatalab-varanasi/53.jpg",
          "/img/icici-bank-rajatalab-varanasi/54.jpg",
          "/img/icici-bank-rajatalab-varanasi/55.jpg",
        ],
      },
      {
        name: "UCO BANK",
        locations: ["Ramnagar", "Mahraganj", "Gorakhpur", "Mehmoorganj"],
        count: 3,
        images: [
          "/img/uco-bank-ramnagar-mahraganj-gorakhpur-mehmoorganj-uttar-pradesh/59.jpg",
          "/img/uco-bank-ramnagar-mahraganj-gorakhpur-mehmoorganj-uttar-pradesh/60.jpg",
          "/img/uco-bank-ramnagar-mahraganj-gorakhpur-mehmoorganj-uttar-pradesh/61.jpg",
        ],
      },
    ],
  },
  {
    name: "Retail & Fashion",
    icon: BuildingStorefrontIcon,
    projects: [
      {
        name: "ALLEN SOLLY",
        locations: ["Rourkela"],
        count: 4,
        images: [
          "/img/allen-solly-location-rourkela/121.jpg",
          "/img/allen-solly-location-rourkela/122.jpg",
          "/img/allen-solly-location-rourkela/123.jpg",
          "/img/allen-solly-location-rourkela/124.jpg",
        ],
      },
      {
        name: "ALLEN SOLLY KID'S",
        locations: ["Rourkela"],
        count: 3,
        images: [
          "/img/allen-solly-kids-rourkela/125.jpg",
          "/img/allen-solly-kids-rourkela/127.jpg",
          "/img/allen-solly-kids-rourkela/130.jpg",
        ],
      },
      {
        name: "PETER ENGLAND",
        locations: ["Darbhanga", "Buxer"],
        count: 8,
        images: [
          "/img/peter-england-darbhanga/137.jpg",
          "/img/peter-england-darbhanga/138.jpg",
          "/img/peter-england-darbhanga/139.jpg",
          "/img/peter-england-darbhanga/142.jpg",
          "/img/peter-england-buxer/131.jpg",
          "/img/peter-england-buxer/132.jpg",
          "/img/peter-england-buxer/135.jpg",
          "/img/peter-england-buxer/136.jpg",
        ],
      },
      {
        name: "U.S. POLO ASSN.",
        locations: ["Bettiah, Bihar"],
        count: 6,
        images: [
          "/img/us-polo-assn-bettiah-bihar/143.jpg",
          "/img/us-polo-assn-bettiah-bihar/144.jpg",
          "/img/us-polo-assn-bettiah-bihar/145.jpg",
          "/img/us-polo-assn-bettiah-bihar/146.jpg",
          "/img/us-polo-assn-bettiah-bihar/147.jpg",
          "/img/us-polo-assn-bettiah-bihar/148.jpg",
        ],
      },
      {
        name: "LOUIS PHILIPPE",
        locations: ["Bettiah", "Rourkela", "Patna"],
        count: 15,
        images: [
          "/img/louis-philippe-bettiah/106.jpg",
          "/img/louis-philippe-bettiah/107.jpg",
          "/img/louis-philippe-bettiah/108.jpg",
          "/img/louis-philippe-bettiah/109.jpg",
          "/img/louis-philippe-bettiah/110.jpg",
          "/img/louis-philippe-bettiah/111.jpg",
          "/img/louis-philippe-rourkela/101.jpg",
          "/img/louis-philippe-rourkela/102.jpg",
          "/img/louis-philippe-rourkela/103.jpg",
          "/img/louis-philippe-rourkela/104.jpg",
          "/img/louis-philippe-rourkela/105.jpg",
          "/img/louis-philippe-kankarbagh-patna/112.jpg",
          "/img/louis-philippe-kankarbagh-patna/114.jpg",
          "/img/louis-philippe-kankarbagh-patna/115.jpg",
          "/img/louis-philippe-kankarbagh-patna/116.jpg",
        ],
      },
      {
        name: "VAN HEUSEN",
        locations: ["Rourkela"],
        count: 4,
        images: [
          "/img/van-heusen-rourkela/117.jpg",
          "/img/van-heusen-rourkela/118.jpg",
          "/img/van-heusen-rourkela/119.jpg",
          "/img/van-heusen-rourkela/120.jpg",
        ],
      },
      {
        name: "RAYMOND SHOWROOM",
        locations: ["Varanasi", "Bhadohi"],
        count: 4,
        images: [
          "/img/raymond-showroom-varanasi-bhadohi/77.jpg",
          "/img/raymond-showroom-varanasi-bhadohi/78.jpg",
          "/img/raymond-showroom-varanasi-bhadohi/79.jpg",
          "/img/raymond-showroom-varanasi-bhadohi/80.jpg",
        ],
      },
    ],
  },
  {
    name: "Jewelry & Lifestyle",
    icon: SparklesIcon,
    projects: [
      {
        name: "TANISHQ SHOWROOM",
        locations: ["Varanasi - Swastic City", "Deoria"],
        count: 10,
        images: [
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/81.jpg",
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/82.jpg",
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/83.jpg",
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/84.jpg",
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/85.jpg",
          "/img/tanishq-showroom-varanasi-swastic-city-center-bhelupur/86.jpg",
          "/img/tanishq-showroom-deoria-up/87.jpg",
          "/img/tanishq-showroom-deoria-up/89.jpg",
          "/img/tanishq-showroom-deoria-up/90.jpg",
          "/img/tanishq-showroom-deoria-up/91.jpg",
        ],
      },
      {
        name: "MIA BY TANISHQ",
        locations: ["Roorkee"],
        count: 4,
        images: [
          "/img/mia-by-tanishq-roorkee/42.jpg",
          "/img/mia-by-tanishq-roorkee/43.jpg",
          "/img/mia-by-tanishq-roorkee/44.jpg",
          "/img/mia-by-tanishq-roorkee/45.jpg",
        ],
      },
      {
        name: "NYKAA",
        locations: ["Haldwani, Uttarakhand"],
        count: 3,
        images: [
          "/img/nykaa-haldwani-uttarakhand/30.jpg",
          "/img/nykaa-haldwani-uttarakhand/31.jpg",
          "/img/nykaa-haldwani-uttarakhand/32.jpg",
        ],
      },
      {
        name: "TITAN WORLD",
        locations: ["Varanasi - Lahurabir"],
        count: 3,
        images: [
          "/img/titan-world-lahurabir-varanasi/30.jpg",
          "/img/titan-world-lahurabir-varanasi/31.jpg",
          "/img/titan-world-lahurabir-varanasi/32.jpg",
        ],
      },
      {
        name: "TITAN HELIOS",
        locations: ["Varanasi - Kuber Complex"],
        count: 2,
        images: [
          "/img/titan-helios-kuber-complex-durgakund-varanasi/73.jpg",
          "/img/titan-helios-kuber-complex-durgakund-varanasi/74.jpg",
        ],
      },
      {
        name: "WORLD OF TITAN",
        locations: ["Varanasi", "Bareilly", "Jaunpur", "Prayagraj"],
        count: 4,
        images: [
          "/img/world-of-titan-varanasi-bareilly-jaunpur-prayagraj/92.jpg",
          "/img/world-of-titan-varanasi-bareilly-jaunpur-prayagraj/93.jpg",
          "/img/world-of-titan-varanasi-bareilly-jaunpur-prayagraj/94.jpg",
          "/img/world-of-titan-varanasi-bareilly-jaunpur-prayagraj/95.jpg",
        ],
      },
    ],
  },
  {
    name: "Hospitality & Others",
    icon: HomeModernIcon,
    projects: [
      {
        name: "AMRITSAR",
        locations: ["Rourkela - Pulotone Mall"],
        count: 4,
        images: [
          "/img/amritsar-pulotone-mall-rourkela/46.jpg",
          "/img/amritsar-pulotone-mall-rourkela/47.jpg",
          "/img/amritsar-pulotone-mall-rourkela/48.jpg",
          "/img/amritsar-pulotone-mall-rourkela/49.jpg",
        ],
      },
      {
        name: "HOTEL SHUBHRA GRAND",
        locations: ["Ghazipur"],
        count: 2,
        images: [
          "/img/hotel-shubhra-grand-ghazipur/99.jpg",
          "/img/hotel-shubhra-grand-ghazipur/100.jpg",
        ],
      },
      {
        name: "TOP IN TOWN",
        locations: ["Varanasi", "Gorakhpur"],
        count: 3,
        images: [
          "/img/top-in-town-varanasi-gorakhpur/96.jpg",
          "/img/top-in-town-varanasi-gorakhpur/97.jpg",
          "/img/top-in-town-varanasi-gorakhpur/98.jpg",
        ],
      },
      {
        name: "MANISH CREATIONS",
        locations: ["Bettiah, Bihar"],
        count: 4,
        images: [
          "/img/manish-creations-bettiah-bihar/149.jpg",
          "/img/manish-creations-bettiah-bihar/151.jpg",
          "/img/manish-creations-bettiah-bihar/152.jpg",
          "/img/manish-creations-bettiah-bihar/153.jpg",
        ],
      },
    ],
  },
];

// Flatten all projects for the brand selector
const allProjects = projectCategories.flatMap((category) => category.projects);

// Sort projects alphabetically
const sortedProjects = [...allProjects].sort((a, b) =>
  a.name.localeCompare(b.name),
);

// Get category for a project
const getProjectCategory = (projectName) => {
  for (const category of projectCategories) {
    const found = category.projects.find((p) => p.name === projectName);
    if (found) return category;
  }
  return null;
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(
    sortedProjects[0]?.name || "",
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const currentProject = sortedProjects.find(
    (project) => project.name === activeProject,
  );

  const currentCategory = currentProject
    ? getProjectCategory(currentProject.name)
    : null;

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
    currentProject?.images.map((src) => ({
      src,
      alt: `${currentProject.name}`,
    })) || [];

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Calculate total projects and images
  const totalProjects = allProjects.length;
  const totalImages = allProjects.reduce((acc, p) => acc + p.images.length, 0);

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
                {totalProjects}+ Projects • 40+ Bank Models • 8+ Districts
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 w-full max-w-3xl">
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  {totalProjects}+
                </div>
                <div className="text-xs text-gray-600">Total Projects</div>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  {totalImages}+
                </div>
                <div className="text-xs text-gray-600">Images</div>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  40+
                </div>
                <div className="text-xs text-gray-600">Bank Models</div>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-lg">
                <div className="text-xl font-bold text-brand-gold-light">
                  8+
                </div>
                <div className="text-xs text-gray-600">Districts</div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1 ${
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

          {/* Main Content - Tabs Left, Image Right */}
          <div className="flex flex-col md:flex-row gap-4 h-[500px]">
            {/* Left Side - Project Tabs with Scroll */}
            <div className="w-full md:w-1/3 lg:w-1/4 border border-gray-200 bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-3 text-sm font-semibold text-center border-b border-gray-200 bg-white">
                <span className="text-brand-gold-light">
                  {filteredProjects.length}
                </span>{" "}
                Projects
              </div>
              <div className="h-[calc(500px-60px)] overflow-y-auto p-2">
                {filteredProjects.map((project) => {
                  const category = getProjectCategory(project.name);
                  const CategoryIcon = category?.icon;
                  return (
                    <button
                      key={project.name}
                      onClick={() => setActiveProject(project.name)}
                      className={`w-full text-left px-3 py-2 mb-1 text-xs font-medium transition-all duration-200 rounded-md ${
                        activeProject === project.name
                          ? "bg-brand-gold-light text-white shadow"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="truncate font-semibold text-xs">
                            {project.name}
                          </span>
                          <span
                            className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                              activeProject === project.name
                                ? "bg-white/20 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {project.images.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          {CategoryIcon && (
                            <CategoryIcon className="w-2.5 h-2.5" />
                          )}
                          <span className="truncate text-[10px]">
                            {project.locations[0]}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Single Image Carousel */}
            <div className="w-full md:w-2/3 lg:w-3/4 h-full">
              {currentProject && (
                <div className="h-full flex flex-col">
                  <div className="text-center mb-2">
                    <h2 className="text-base font-bold text-brand-charcoal">
                      {currentProject.name}
                    </h2>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <MapPinIcon className="w-3 h-3 text-brand-gold-light" />
                      <span>{currentProject.locations.join(" • ")}</span>
                    </div>
                    <p className="text-text-main/60 text-[10px] mt-0.5">
                      {currentProject.images.length} image
                      {currentProject.images.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
                    <Carousel
                      plugins={[autoplayPlugin.current]}
                      opts={{
                        align: "center",
                        loop: true,
                      }}
                      className="w-full h-full"
                    >
                      <CarouselContent className="h-full">
                        {currentProject.images.map((image, index) => (
                          <CarouselItem key={index} className="h-full">
                            <div className="h-full p-1">
                              <div
                                className="relative h-full rounded-md shadow bg-white overflow-hidden group cursor-pointer"
                                onClick={() => handleImageClick(index)}
                              >
                                <img
                                  src={image}
                                  alt={`${currentProject.name} - ${index + 1}`}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/800x600?text=Image+Not+Found";
                                  }}
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                  <span className="bg-white/90 text-brand-charcoal px-3 py-1.5 rounded-full text-xs font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow flex items-center gap-1">
                                    <span>Click to expand</span>
                                    <span className="text-brand-gold-light text-sm">
                                      +
                                    </span>
                                  </span>
                                </div>

                                {/* Image counter badge */}
                                <div className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
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
                  <p className="text-xs text-gray-300">
                    Major projects delivered across multiple sectors
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    40+
                  </div>
                  <div className="text-[10px] text-gray-400">Bank Models</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    8
                  </div>
                  <div className="text-[10px] text-gray-400">Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    25+
                  </div>
                  <div className="text-[10px] text-gray-400">Retail Stores</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-brand-gold-light">
                    9
                  </div>
                  <div className="text-[10px] text-gray-400">Bank Branches</div>
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
