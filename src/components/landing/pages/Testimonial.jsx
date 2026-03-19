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
import { useTestimonials } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/imageUtils";

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
  const { data: testimonials, loading } = useTestimonials();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const { visible, displayIndex } = useSlideAnimation(currentReviewIndex);

  // Format testimonials data
  const formattedTestimonials =
    testimonials?.map((testimonial) => ({
      quote: testimonial.client_testimonial_text || "",
      author: {
        name: testimonial.client_name || "Client",
        title: testimonial.client_post || "Customer",
        avatarUrl: testimonial.client_image
          ? getImageUrl(testimonial.client_image)
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.client_name || "Client")}&background=b88a44&color=fff&bold=true`,
        project: testimonial.project || "Project",
        location: testimonial.location || "Location",
        year:
          testimonial.year ||
          new Date(testimonial.created_at).getFullYear().toString(),
      },
    })) || [];

  // Use formatted testimonials or fallback to empty array
  const reviews = formattedTestimonials.length > 0 ? formattedTestimonials : [];

  // Autoplay: advance every 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Reset index when reviews change
  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [reviews.length]);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto section-px">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-1">CLIENT TESTIMONIALS</h6>
            <h2 className="!text-2xl md:!text-3xl !mb-2">
              What Our Clients Say
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-brand-gold border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto section-px">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-1">CLIENT TESTIMONIALS</h6>
            <h2 className="!text-2xl md:!text-3xl !mb-2">
              What Our Clients Say
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>
          <div className="text-center py-12 text-gray-500">
            No testimonials available yet.
          </div>
        </div>
      </section>
    );
  }

  const review = reviews[displayIndex];

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto section-px">
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
                    {getInitials(review.author.name)}
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

                {/* Project Badge - Using dynamic data from API if available, otherwise hide */}
                {(review.author.project !== "Project" ||
                  review.author.location !== "Location" ||
                  review.author.year !==
                    new Date().getFullYear().toString()) && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                    {review.author.project !== "Project" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-gold-light/10 rounded-full text-brand-gold-light">
                        <BriefcaseIcon className="w-3 h-3" />
                        {review.author.project}
                      </span>
                    )}
                    {review.author.location !== "Location" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        <MapPinIcon className="w-3 h-3" />
                        {review.author.location}
                      </span>
                    )}
                    {review.author.year !==
                      new Date().getFullYear().toString() && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        <CalendarIcon className="w-3 h-3" />
                        {review.author.year}
                      </span>
                    )}
                  </div>
                )}
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
          {reviews.length > 1 && (
            <PaginationDot
              page={currentReviewIndex + 1}
              total={reviews.length}
              size="lg"
              onPageChange={(page) => setCurrentReviewIndex(page - 1)}
            />
          )}

          {/* Stats Summary - You can make this dynamic from your achievements API */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200 w-full max-w-3xl">
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">50+</div>
              <div className="text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">40+</div>
              <div className="text-gray-500">Bank Models</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">8+</div>
              <div className="text-gray-500">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">
                100%
              </div>
              <div className="text-gray-500">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
