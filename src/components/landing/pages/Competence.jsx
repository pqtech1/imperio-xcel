import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  WrenchIcon,
  SwatchIcon,
  HomeModernIcon,
  PencilIcon,
  PaintBrushIcon,
  Square3Stack3DIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  CubeIcon,
  ComputerDesktopIcon,
  BoltIcon,
  WifiIcon,
  SunIcon,
  BeakerIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const competenceData = [
  {
    category: "Civil Work",
    items: ["Masonary", "Floors", "Concrete"],
    icon: BuildingOfficeIcon,
  },
  {
    category: "Draperies",
    items: ["Curtains", "Blinds"],
    icon: SwatchIcon,
  },
  {
    category: "Floor Coverings",
    items: ["PVC", "Synthetic", "Uppite", "Carpets"],
    icon: Square3Stack3DIcon,
  },
  {
    category: "Furniture",
    items: ["Fixed", "Loose", "Modular"],
    icon: CubeIcon,
  },
  {
    category: "Painting",
    items: ["Interior", "Exterior"],
    icon: PaintBrushIcon,
  },
  {
    category: "Partition",
    items: ["Wooden", "Aluminum", "IDL Block", "Gypsum"],
    icon: Square3Stack3DIcon,
  },
  {
    category: "False Ceiling",
    items: ["POP", "Gypsum", "Modular", "Grid"],
    icon: HomeModernIcon,
  },
  {
    category: "Polishing",
    items: ["Wood", "Metal", "Stone"],
    icon: SparklesIcon,
  },
  {
    category: "Chairs",
    items: ["Sofa", "Upholstery"],
    icon: CubeIcon,
  },
  {
    category: "Wall Coverings",
    items: ["Wallpaper", "Panels", "Cladding"],
    icon: SwatchIcon,
  },
  {
    category: "Fabrication",
    items: ["M.S.", "S.S.", "Aluminium"],
    icon: WrenchIcon,
  },
  {
    category: "Signages",
    items: ["Glow", "Neon", "Metal"],
    icon: ComputerDesktopIcon,
  },
  {
    category: "Flooring",
    items: ["Raised Access", "Tiles", "Wooden"],
    icon: Square3Stack3DIcon,
  },
  {
    category: "Plumbing",
    items: ["Water Supply", "Drainage", "Fixtures"],
    icon: BeakerIcon,
  },
  {
    category: "Electrical Installations",
    items: ["Wiring", "Lighting", "Panels"],
    icon: BoltIcon,
  },
  {
    category: "Acoustics Systems",
    items: ["Sound Proofing", "Panels", "Insulation"],
    icon: SunIcon,
  },
  {
    category: "Networking",
    items: ["Data / Voice", "Cabling", "WiFi"],
    icon: WifiIcon,
  },
  {
    category: "Air Conditioning",
    items: ["HVAC", "Ducting", "Controls"],
    icon: CpuChipIcon,
  },
];

const Competence = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
          alt="Competence Hero"
          className="w-full object-cover h-64 sm:h-72 md:h-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">OUR EXPERTISE</h6>
              </div>
              <h1 className="text-white !mb-2">What We Do Best</h1>
              <p className="text-gray-200 !mb-0">
                Comprehensive interior solutions across 18+ specialized domains
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Competence Grid Section */}
      <div className="section-px pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h6 className="text-brand-gold-light !mb-2">OUR COMPETENCE</h6>
            <h2 className="!text-3xl md:!text-4xl !mb-3">
              Complete Interior Solutions
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              From civil work to final finishes, we handle every aspect of your
              interior project with precision and expertise
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="text-center bg-amber-50/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-brand-gold-light">
                18+
              </div>
              <div className="text-base text-gray-600">Specialized Domains</div>
            </div>
            <div className="text-center bg-amber-50/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-brand-gold-light">
                50+
              </div>
              <div className="text-base text-gray-600">Expert Craftsmen</div>
            </div>
            <div className="text-center bg-amber-50/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-brand-gold-light">
                100%
              </div>
              <div className="text-base text-gray-600">Quality Assured</div>
            </div>
            <div className="text-center bg-amber-50/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-brand-gold-light">7+</div>
              <div className="text-base text-gray-600">Years Experience</div>
            </div>
          </div>

          {/* Competence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {competenceData.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative bg-white border border-gray-100 rounded-lg p-5 hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  {/* Accent Line */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-brand-gold-light rounded-t-lg transition-transform duration-300 origin-left ${
                      isHovered ? "scale-x-100" : "scale-x-0"
                    }`}
                  />

                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg bg-brand-gold-light/10 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? "bg-brand-gold-light scale-110" : ""
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isHovered ? "text-white" : "text-brand-gold-light"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                          isHovered ? "text-brand-gold-light" : "text-gray-900"
                        }`}
                      >
                        {item.category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item.items.map((subItem, idx) => (
                          <span
                            key={idx}
                            className=" px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {subItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect - Bottom Border */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-px bg-brand-gold-light/30 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50/50 px-6 py-3 rounded-full border border-gray-200">
              <span className=" text-gray-700">
                Need a specific service?
              </span>
              <button className="text-brand-gold-light hover:text-brand-gold text-lg font-medium transition-colors">
                Let's discuss your project →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <div className="bg-gray-50 section-px py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-2">OUR APPROACH</h6>
            <h2 className="!text-2xl md:!text-3xl !mb-2">
              How We Deliver Excellence
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Consultation & Planning",
                desc: "Understanding your requirements, site assessment, and detailed project planning",
              },
              {
                step: "02",
                title: "Execution & Management",
                desc: "Coordinating all trades, quality control, and timely project execution",
              },
              {
                step: "03",
                title: "Handover & Support",
                desc: "Final inspection, client walkthrough, and post-completion support",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-4xl font-light text-brand-gold-light/20 absolute top-4 right-4">
                  {item.step}
                </span>
                <h3 className="text-base font-bold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Competence;
