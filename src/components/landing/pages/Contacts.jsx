import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import SEO from "./SEO";

const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const officeLocations = [
    {
      city: "Varanasi (Head Office)",
      address: ["Coraut Bazar, Kotwa Lohata", "Varanasi - 221107"],
      phones: ["+91-6393556220", "+91-9935550330"],
      email: "info@interioxcel.com",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "By Appointment" },
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with InterioXcel | Interior Design Experts"
        description="Contact InterioXcel for your interior design needs. We're here to help transform your space. Call, email, or visit our Varanasi office."
        keywords="contact us, interior design, Varanasi, get quote, consultation, interior designer"
        image="https://interioxcel.com/contact-og-image.jpg"
        url="https://interioxcel.com/contact"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/276663/pexels-photo-276663.jpeg"
              alt="Contact Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-px bg-brand-gold-light" />
                  <h6 className="text-brand-gold-light mb-0">GET IN TOUCH</h6>
                </div>
                <h1 className="text-white mb-3">
                  Let's Create <span className="text-brand-gold">Together</span>
                </h1>
                <p className="text-white/80 mb-0">
                  Have a project in mind? We'd love to hear about it. Reach out
                  and let's start a conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Two Column Layout */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left - Form */}
          <div className="w-full lg:w-1/2 bg-white px-6 md:px-8 lg:px-12 xl:px-16 py-16 flex flex-col justify-center">
            <div className="max-w-xl mx-auto lg:mx-0 w-full">
              <div className="mb-8">
                <h6 className="mb-2">SEND A MESSAGE</h6>
                <h2 className="mb-2">Get in Touch</h2>
                <div className="w-12 h-px bg-brand-gold opacity-70" />
              </div>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h4 className="text-brand-charcoal mb-1">Message Sent!</h4>
                  <p className="text-brand-charcoal/60">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg bg-white text-brand-charcoal outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email *"
                      className="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg bg-white text-brand-charcoal outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your Phone *"
                      className="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg bg-white text-brand-charcoal outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Your Message *"
                      className="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg bg-white text-brand-charcoal outline-none focus:border-brand-gold transition-colors resize-none"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center gap-2 group"
                    >
                      SEND MESSAGE
                      <PaperAirplaneIcon className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right - Contact Details */}
          <div className="w-full lg:w-1/2 bg-brand-charcoal px-6 md:px-8 lg:px-12 xl:px-16 py-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
              <p className="text-brand-gold tracking-widest mb-2 uppercase">
                CONTACT INFORMATION
              </p>
              <h2 className="text-white mb-6">Let's Start a Project</h2>

              {officeLocations.map((office, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex gap-3 mb-3">
                    <div className="mt-1 text-brand-gold">
                      <BuildingOfficeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white font-semibold tracking-widest uppercase mb-1">
                        {office.city}
                      </p>
                      {office.address.map((line, i) => (
                        <p key={i} className="text-white/70 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-3">
                    <div className="mt-1 text-brand-gold">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white font-semibold tracking-widest uppercase mb-1">
                        Call Us
                      </p>
                      {office.phones.map((phone, i) => (
                        <p key={i} className="text-white/70">
                          {phone}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-6">
                    <div className="mt-1 text-brand-gold">
                      <EnvelopeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white font-semibold tracking-widest uppercase mb-1">
                        Email Us
                      </p>
                      <p className="text-white/70">{office.email}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mb-6">
                <div className="mt-1 text-brand-gold">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold tracking-widest uppercase mb-2">
                    Business Hours
                  </p>
                  {businessHours.map((item, i) => (
                    <div key={i} className="flex justify-between gap-6 mb-1">
                      <span className="text-white/70">{item.day}</span>
                      <span className="text-white/70">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded border border-white/20 mb-6">
                <p className="text-white/80 text-sm">
                  <span className="text-brand-gold font-bold">⏤</span> We
                  typically respond within 24 hours on business days.
                </p>
              </div>

              <div className="flex gap-2">
                {[
                  { label: "WhatsApp", icon: "📱", href: "#" },
                  { label: "Email", icon: "✉️", href: "#" },
                  { label: "Phone", icon: "📞", href: "#" },
                ].map(({ label, icon }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                  >
                    <span className="text-sm">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-bg-soft border-b border-brand-gold/10">
          <div className="container mx-auto section-px py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-brand-gold mb-1">
                  7+
                </div>
                <h6 className="mb-0">Years Experience</h6>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-brand-gold mb-1">
                  50+
                </div>
                <h6 className="mb-0">Projects Completed</h6>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-brand-gold mb-1">
                  40+
                </div>
                <h6 className="mb-0">Bank Models</h6>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-brand-gold mb-1">
                  8+
                </div>
                <h6 className="mb-0">Districts</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] relative">
          <iframe
            title="InterioXcel Location - Varanasi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28860.88385283898!2d82.95606995!3d25.317645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f3b3f3b3f3b%3A0x1234567890abcdef!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(50%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded shadow">
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-sm font-medium text-brand-charcoal">
                Varanasi Head Office
              </span>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="bg-bg-soft py-12">
          <div className="container mx-auto section-px text-center">
            <h5 className="mb-1">Frequently Asked Questions</h5>
            <p className="text-brand-charcoal/60 mb-4">
              Find answers to common questions about our services and process
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold-light transition-colors group"
            >
              Visit our FAQ page
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
