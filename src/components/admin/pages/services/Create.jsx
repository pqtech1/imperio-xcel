import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    service_title: "",
    service_tagline: "",
    service_intro_title: "",
    service_short_description: "",
    slug: "",
    title: "",
    description: "",
    keyword: "",
    service_banner_img: null,
  });

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };

        // Auto slug generation
        if (name === "service_title" && !prev.slug) {
          updated.slug = generateSlug(value);
        }

        return updated;
      });
    }

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const loading = toast.loading("Creating service...");

      await api.post("/services", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss(loading);
      toast.success("Service created successfully");

      navigate("/admin/dashboard/services");

      setErrors({});

      setFormData({
        service_title: "",
        service_tagline: "",
        service_intro_title: "",
        service_short_description: "",
        slug: "",
        title: "",
        description: "",
        keyword: "",
        service_banner_img: null,
      });
    } catch (error) {
      toast.dismiss();

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix the form errors");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6 space-y-4">
        <Button
          onClick={() => navigate("/admin/dashboard/services")}
          className="h-10 px-4 bg-white text-gray-600 hover:text-gray-900  text-sm rounded-none w-fit"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Services
        </Button>

        <div className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Create Service
          </CardTitle>
          <p className="text-sm text-gray-600">
            Add a new service to your portfolio
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SERVICE DETAILS */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Service Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="service_title"
                  placeholder="Premium Interior Design"
                  value={formData.service_title}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("service_title")}`}
                />
                {errors.service_title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_title[0]}
                  </p>
                )}
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service Tagline <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="service_tagline"
                  placeholder="Transforming spaces beautifully"
                  value={formData.service_tagline}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("service_tagline")}`}
                />
                {errors.service_tagline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_tagline[0]}
                  </p>
                )}
              </div>

              {/* Intro Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Intro Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="service_intro_title"
                  placeholder="Why Choose Our Service"
                  value={formData.service_intro_title}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("service_intro_title")}`}
                />
                {errors.service_intro_title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_intro_title[0]}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-500 mb-1">
                  Auto-generates from title (edit if needed)
                </p>
                <Input
                  name="slug"
                  placeholder="premium-interior-design"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("slug")}`}
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>
                )}
              </div>

              {/* Short Description */}
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Short Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  rows={4}
                  name="service_short_description"
                  placeholder="Describe your service in a few sentences..."
                  value={formData.service_short_description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("service_short_description")}`}
                />
                {errors.service_short_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_short_description[0]}
                  </p>
                )}
              </div>

              {/* IMAGE UPLOAD */}
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service Banner Image <span className="text-red-500">*</span>
                </Label>
                <label
                  className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                    errors.service_banner_img
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  {formData.service_banner_img ? (
                    <p className="text-gray-900 font-medium">
                      {formData.service_banner_img.name}
                    </p>
                  ) : (
                    <>
                      <p className="text-base font-medium text-gray-700">
                        Click to upload image
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    name="service_banner_img"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </label>
                {errors.service_banner_img && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service_banner_img[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* SEO SECTION */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              SEO Information
            </h3>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Meta Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="title"
                  placeholder="Premium Interior Design Services"
                  value={formData.title}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("title")}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Meta Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  rows={4}
                  name="description"
                  placeholder="SEO description for search engines..."
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("description")}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Keywords <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="keyword"
                  placeholder="interior design, luxury interiors, home decor"
                  value={formData.keyword}
                  onChange={handleChange}
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("keyword")}`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
                {errors.keyword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.keyword[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200"></div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/services")}
              className="h-12 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none"
            >
              Save Service
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default Create;
