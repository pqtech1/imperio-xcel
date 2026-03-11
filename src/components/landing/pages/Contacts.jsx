import React, { useState } from "react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ClockIcon,
  UserIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", form);
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "", projectType: "" });
    }, 3000);
  };

  const projectTypes = [
    "Banking/Finance",
    "Retail Store",
    "Corporate Office",
    "Hospitality",
    "Residential",
    "Other",
  ];

  const officeLocations = [
    {
      city: "Varanasi (Head Office)",
      address: ["Coraut Bazar, Kotwa Lohata", "Varanasi - 221107"],
      phones: ["+91-6393556220", "+91-9935550330"],
      email: "kkentp2018@gmail.com",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "By Appointment" },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/276663/pexels-photo-276663.jpeg"
          alt="Contact Hero"
          className="w-full object-cover h-64 sm:h-72 md:h-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">GET IN TOUCH</h6>
              </div>
              <h1 className="text-white !mb-2">
                Let's Create{" "}
                <span className="text-brand-gold-light">Together</span>
              </h1>
              <p className="text-gray-200 !mb-0">
                Have a project in mind? We'd love to hear about it. Reach out
                and let's start a conversation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Two Column Layout */}
      <div className="section-px flex flex-col lg:flex-row w-full min-h-[600px]">
        {/* Left - Form */}
        <div className="w-full lg:w-1/2 bg-white px-5 sm:px-8 py-10 sm:py-12 flex flex-col justify-center">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <div className="mb-6">
              <h6 className="text-brand-gold-light !mb-2">SEND A MESSAGE</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-2">Get in Touch</h2>
              <div className="w-16 h-[2px] bg-brand-gold-light" />
            </div>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  Message Sent!
                </h3>
                <p className="text-xs text-gray-600">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full border-b border-gray-300 bg-transparent text-xs text-gray-700 py-2.5 outline-none focus:border-brand-gold-light transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-0 text-[10px] tracking-widest text-gray-500 transition-all duration-300 ${
                      activeField === "name" || form.name
                        ? "-top-4 text-[10px] text-brand-gold-light"
                        : "top-2.5 text-xs"
                    }`}
                  >
                    YOUR NAME *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full border-b border-gray-300 bg-transparent text-xs text-gray-700 py-2.5 outline-none focus:border-brand-gold-light transition-colors"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-0 text-[10px] tracking-widest text-gray-500 transition-all duration-300 ${
                      activeField === "email" || form.email
                        ? "-top-4 text-[10px] text-brand-gold-light"
                        : "top-2.5 text-xs"
                    }`}
                  >
                    YOUR EMAIL *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full border-b border-gray-300 bg-transparent text-xs text-gray-700 py-2.5 outline-none focus:border-brand-gold-light transition-colors"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-0 text-[10px] tracking-widest text-gray-500 transition-all duration-300 ${
                      activeField === "phone" || form.phone
                        ? "-top-4 text-[10px] text-brand-gold-light"
                        : "top-2.5 text-xs"
                    }`}
                  >
                    YOUR PHONE *
                  </label>
                </div>

                <div className="relative">
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    onFocus={() => setActiveField("projectType")}
                    onBlur={() => setActiveField(null)}
                    className="w-full border-b border-gray-300 bg-transparent text-xs text-gray-700 py-2.5 outline-none focus:border-brand-gold-light transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden></option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label
                    className={`absolute left-0 text-[10px] tracking-widest text-gray-500 transition-all duration-300 ${
                      activeField === "projectType" || form.projectType
                        ? "-top-4 text-[10px] text-brand-gold-light"
                        : "top-2.5 text-xs"
                    }`}
                  >
                    PROJECT TYPE *
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    rows={3}
                    required
                    className="w-full border-b border-gray-300 bg-transparent text-xs text-gray-700 py-2.5 outline-none focus:border-brand-gold-light transition-colors resize-none"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-0 text-[10px] tracking-widest text-gray-500 transition-all duration-300 ${
                      activeField === "message" || form.message
                        ? "-top-4 text-[10px] text-brand-gold-light"
                        : "top-2.5 text-xs"
                    }`}
                  >
                    YOUR MESSAGE *
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="group bg-brand-gold-light hover:bg-brand-gold text-white text-[10px] font-bold tracking-widest px-6 py-3 transition-all duration-300 flex items-center gap-2"
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
        <div className="w-full lg:w-1/2 bg-gray-900 px-5 sm:px-8 py-10 sm:py-12 flex flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
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
            <p className="text-brand-gold-light text-[10px] tracking-widest mb-2 uppercase">
              CONTACT INFORMATION
            </p>
            <h2 className="text-white !text-2xl md:!text-3xl !mb-6">
              Let's Start a Project
            </h2>

            {/* Office Location */}
            {officeLocations.map((office, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex gap-3 mb-3">
                  <div className="mt-1 text-brand-gold-light">
                    <BuildingOfficeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">
                      {office.city}
                    </p>
                    {office.address.map((line, i) => (
                      <p
                        key={i}
                        className="text-gray-300 text-xs leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 mb-3">
                  <div className="mt-1 text-brand-gold-light">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">
                      Call Us
                    </p>
                    {office.phones.map((phone, i) => (
                      <p key={i} className="text-gray-300 text-xs">
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 mb-6">
                  <div className="mt-1 text-brand-gold-light">
                    <EnvelopeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">
                      Email Us
                    </p>
                    <p className="text-gray-300 text-xs">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="flex gap-3 mb-6">
              <div className="mt-1 text-brand-gold-light">
                <ClockIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-2">
                  Business Hours
                </p>
                {businessHours.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-6 text-xs mb-1"
                  >
                    <span className="text-gray-300">{item.day}</span>
                    <span className="text-gray-300">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Guarantee */}
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded border border-white/20 mb-6">
              <p className="text-white text-xs">
                <span className="text-brand-gold-light font-bold">⏤</span> We
                typically respond within 24 hours on business days.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {[
                { label: "WhatsApp", icon: "📱", href: "#" },
                { label: "Email", icon: "✉️", href: "#" },
                { label: "Phone", icon: "📞", href: "#" },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold-light hover:border-brand-gold-light transition-all duration-300"
                >
                  <span className="text-sm">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto section-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">7+</div>
              <div className="text-[10px] text-gray-500">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">50+</div>
              <div className="text-[10px] text-gray-500">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">40+</div>
              <div className="text-[10px] text-gray-500">Bank Models</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-brand-gold-light">8+</div>
              <div className="text-[10px] text-gray-500">Districts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[350px] relative">
        <iframe
          title="ImperioXcel Location - Varanasi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28860.88385283898!2d82.95606995!3d25.317645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f3b3f3b3f3b%3A0x1234567890abcdef!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(50%)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Map Overlay Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded shadow">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="w-3.5 h-3.5 text-brand-gold-light" />
            <span className="text-[10px] font-medium">
              Varanasi Head Office
            </span>
          </div>
        </div>
      </div>

      {/* FAQ CTA */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto section-px text-center">
          <h3 className="text-sm font-bold mb-1">Frequently Asked Questions</h3>
          <p className="text-xs text-gray-600 mb-3">
            Find answers to common questions about our services and process
          </p>
          <button className="text-brand-gold-light hover:text-brand-gold text-xs font-medium inline-flex items-center gap-1">
            Visit our FAQ page
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Contacts;
