import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import TiptapEditor from "@/components/editor/TiptapEditor";

export default function WhatWeDoCreate() {
  const navigate = useNavigate();
  const { serviceId } = useParams(); // Get serviceId from URL params

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([""]);
  const [serviceName, setServiceName] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch service details to display the service name
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

  const handleServiceChange = (index, value) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);

    // Clear error for this specific service item if it exists
    if (errors[`services.${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`services.${index}`];
        return newErrors;
      });
    }
  };

  const addService = () => setServices([...services, ""]);

  const removeService = (index) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Filter out empty service items
    const filteredServices = services.filter(
      (service) => service.trim() !== "",
    );

    try {
      const res = await api.post("/what-we-do", {
        title,
        description,
        services: filteredServices,
        service_id: serviceId, // Pass the service ID from URL params
      });

      toast.success(res.data.message || "Created successfully");
      navigate(`/admin/dashboard/services/${serviceId}/what-we-do`);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
      console.error("Creation error:", err);
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
              Create What We Do
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add services and details for{" "}
              {serviceName ? `"${serviceName}"` : "your offering"}
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(`/admin/dashboard/services/${serviceId}/what-we-do`)
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

          {/* What We Do Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              What We Do Information
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
                    if (errors.title) {
                      setErrors({ ...errors, title: null });
                    }
                  }}
                  placeholder="e.g., Our Design Process"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
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
                      if (errors.description) {
                        setErrors({ ...errors, description: null });
                      }
                    }}
                  />
                </div>

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>

              {/* Services List */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Service Items <span className="text-red-500">*</span>
                </Label>

                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={service}
                        onChange={(e) =>
                          handleServiceChange(index, e.target.value)
                        }
                        placeholder={`Service item ${index + 1}`}
                        className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none flex-1 ${inputError(`services.${index}`)}`}
                      />

                      <Button
                        type="button"
                        onClick={() => removeService(index)}
                        disabled={services.length === 1}
                        className="h-11 w-11 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-300 rounded-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove service"
                      >
                        <Trash2 size={16} />
                      </Button>

                      {index === services.length - 1 && (
                        <Button
                          type="button"
                          onClick={addService}
                          className="h-11 w-11 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-none p-0"
                          title="Add service"
                        >
                          <Plus size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {errors.services && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.services[0]}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  Add individual service items that will be displayed in a list.
                  Empty items will be filtered out automatically.
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() =>
                navigate(`/admin/dashboard/services/${serviceId}/what-we-do`)
              }
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="mr-2">Creating...</span>
                  <span className="animate-spin">⚪</span>
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
