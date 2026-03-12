"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  StarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  BriefcaseIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

const reviews = [
  {
    quote:
      "InterioXcel delivered exceptional work on our 40+ bank models across 8 districts. Their attention to detail, adherence to timelines, and quality of execution exceeded our expectations. The team's understanding of banking requirements and security protocols was impressive.",
    author: {
      name: "Regional Manager",
      title: "Kashi Gomati Samyukt Grameen Bank",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
      project: "40+ Bank Models",
      location: "8 Districts, UP",
      year: "2021-2023",
    },
  },
  {
    quote:
      "We partnered with InterioXcel for multiple Union Bank of India branches across Jaunpur and Varanasi. Their turnkey solutions made the process seamless. From design to execution, everything was handled professionally. Highly recommended for banking infrastructure.",
    author: {
      name: "Chief Manager",
      title: "Union Bank of India",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      project: "9 Bank Branches",
      location: "Jaunpur, Varanasi",
      year: "2022-2023",
    },
  },
  {
    quote:
      "The team at InterioXcel transformed our Tanishq showroom in Varanasi into a stunning retail space. Their understanding of jewelry retail requirements - lighting, security, customer flow - was exceptional. The project was completed on time and within budget.",
    author: {
      name: "Store Director",
      title: "Tanishq - Swastic City Center",
      avatarUrl: "https://i.pravatar.cc/150?img=13",
      project: "Jewelry Showroom",
      location: "Varanasi",
      year: "2023",
    },
  },
  {
    quote:
      "Our Allen Solly store in Rourkela was designed and executed by InterioXcel. They perfectly captured our brand essence while creating a functional retail space. The team's project management skills and attention to detail are commendable.",
    author: {
      name: "Regional Retail Head",
      title: "Allen Solly - Rourkela",
      avatarUrl: "https://i.pravatar.cc/150?img=14",
      project: "Retail Store",
      location: "Rourkela",
      year: "2022",
    },
  },
  {
    quote:
      "We're extremely satisfied with the work done by InterioXcel on our Nykaa store in Haldwani. The team understood our brand aesthetics and delivered a beautiful, functional space. Their post-completion support has been excellent.",
    author: {
      name: "Store Operations Manager",
      title: "NYKAA - Haldwani",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
      project: "Beauty Retail",
      location: "Haldwani, Uttarakhand",
      year: "2023",
    },
  },
];

const StarRatingIcon = () => <StarIcon className="h-4 w-4 text-yellow-400" />;

const PaginationDot = ({ page, total, size = "lg", onPageChange }) => {
  const dotSize = size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5";
  return (
    <div
      className="flex items-center gap-1.5"
      role="tablist"
      aria-label="Reviews pagination"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          role="tab"
          aria-selected={page === index + 1}
          aria-label={`Review ${index + 1}`}
          onClick={() => onPageChange(index + 1)}
          className={`rounded-full transition-all duration-300 ${dotSize} ${
            page === index + 1
              ? "bg-brand-gold-light scale-110"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

// Hook to manage fade-out → swap content → fade-in on index change
function useSlideAnimation(index) {
  const [visible, setVisible] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(index);
  const prevIndex = useRef(index);

  useEffect(() => {
    if (index === prevIndex.current) return;
    setVisible(false);
    const timeout = setTimeout(() => {
      setDisplayIndex(index);
      prevIndex.current = index;
      setVisible(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, [index]);

  return { visible, displayIndex };
}

const Testimonial = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const { visible, displayIndex } = useSlideAnimation(currentReviewIndex);

  // Autoplay: advance every 5 seconds, reset timer on manual dot click
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const review = reviews[displayIndex];

  return (
    <section >
      <div >
        {/* Section Header */}
        <div className="text-center mb-8">
          <h6 className="text-brand-gold-light !mb-1">CLIENT TESTIMONIALS</h6>
          <h2 className="!text-2xl md:!text-3xl !mb-2">What Our Clients Say</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <figure className="flex max-w-4xl flex-col gap-6 text-center">
            {/* Quote with animation */}
            <blockquote
              className={`origin-bottom text-base md:text-lg font-light text-gray-700 leading-relaxed transition-all duration-500 will-change-transform ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-3 scale-[0.98]"
              }`}
            >
              <span className="text-2xl text-brand-gold-light font-serif mr-1">
                "
              </span>
              {review.quote}
              <span className="text-2xl text-brand-gold-light font-serif ml-1">
                "
              </span>
            </blockquote>

            {/* Author and Project Details */}
            <figcaption
              className={`flex origin-bottom flex-col items-center gap-4 will-change-transform transition-all duration-500 delay-100 ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-3 scale-[0.98]"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-16 w-16 ring-2 ring-brand-gold-light ring-offset-2">
                  <AvatarImage
                    src={review.author.avatarUrl}
                    alt={review.author.name}
                  />
                  <AvatarFallback className="bg-brand-gold-light/10 text-brand-gold-light text-xs">
                    {review.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-0.5">
                  <p className="text-base font-semibold text-gray-900">
                    {review.author.name}
                  </p>
                  <cite className="text-xs text-gray-500 not-italic">
                    {review.author.title}
                  </cite>
                </div>

                {/* Project Badge */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-gold-light/10 rounded-full  text-brand-gold-light">
                    <BriefcaseIcon className="w-3 h-3" />
                    {review.author.project}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full  text-gray-600">
                    <MapPinIcon className="w-3 h-3" />
                    {review.author.location}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full  text-gray-600">
                    <CalendarIcon className="w-3 h-3" />
                    {review.author.year}
                  </span>
                </div>
              </div>

              {/* Stars with staggered delay */}
              <div aria-hidden="true" className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={`${displayIndex}-${index}`}
                    className={`transition-all duration-300 will-change-transform ${
                      visible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-1 scale-90"
                    }`}
                    style={{
                      transitionDelay: visible
                        ? `${120 + index * 50}ms`
                        : "0ms",
                    }}
                  >
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>

          {/* Pagination Dots */}
          <PaginationDot
            page={currentReviewIndex + 1}
            total={reviews.length}
            size="lg"
            onPageChange={(page) => setCurrentReviewIndex(page - 1)}
          />

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200 w-full max-w-3xl">
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">50+</div>
              <div className=" text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">40+</div>
              <div className=" text-gray-500">Bank Models</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">8+</div>
              <div className=" text-gray-500">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">
                100%
              </div>
              <div className=" text-gray-500">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
