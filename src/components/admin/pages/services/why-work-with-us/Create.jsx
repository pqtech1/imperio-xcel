import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

import TiptapEditor from "@/components/editor/TiptapEditor";

export default function WhyWorkWithUsCreate() {
  const navigate = useNavigate();
  const { id: serviceId } = useParams(); // Renamed to serviceId for clarity

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [serviceName, setServiceName] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${serviceId}`);
        setServiceName(res.data.data?.title || res.data.title || "Service");
      } catch (err) {
        console.error("Failed to fetch service:", err);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await api.post("/why-work-with-us", {
        service_id: serviceId, // Fixed: changed from services_id to service_id
        title,
        tagline,
        description,
      });

      toast.success(res.data.message || "Created successfully");
      navigate(`/admin/dashboard/services/${serviceId}/why-work-with-us`);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      console.error("Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Create Why Work With Us
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add details explaining why customers should choose{" "}
              {serviceName || "your service"}
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(
                `/admin/dashboard/services/${serviceId}/why-work-with-us`,
              )
            }
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to List
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Service Information (read-only) */}
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Service:
              </span>
              <span className="text-sm text-gray-900">
                {serviceName || "Loading..."}
              </span>
            </div>
          </div>

          {/* Why Work With Us Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Why Work With Us Information
            </h3>

            <div className="grid gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({ ...errors, title: null });
                  }}
                  placeholder="e.g., Expertise & Experience"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label
                  htmlFor="tagline"
                  className="text-sm font-medium text-gray-700"
                >
                  Tagline <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => {
                    setTagline(e.target.value);
                    if (errors.tagline) setErrors({ ...errors, tagline: null });
                  }}
                  placeholder="Short supporting statement"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("tagline")}`}
                />

                {errors.tagline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tagline[0]}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </Label>

                <div
                  className={`border ${errors.description ? "border-red-500" : "border-gray-300"}`}
                >
                  <TiptapEditor
                    content={description}
                    setContent={(html) => {
                      setDescription(html);
                      if (errors.description)
                        setErrors({ ...errors, description: null });
                    }}
                  />
                </div>

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/dashboard/services/${serviceId}/why-work-with-us`,
                )
              }
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[120px] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="mr-2">Creating...</span>
                  
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
