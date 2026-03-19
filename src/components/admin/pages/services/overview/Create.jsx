import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, ArrowLeft, X } from "lucide-react";

import TiptapEditor from "@/components/editor/TiptapEditor";

export default function OverviewCreate() {
  const navigate = useNavigate();
  const { id: serviceId } = useParams();

  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file size (2MB each)
    const validFiles = files.filter((file) => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 2MB`);
        return false;
      }
      return true;
    });

    setImages(validFiles);

    // Create preview URLs
    const previews = validFiles.map((file) => URL.createObjectURL(file));

    // Clean up old previews
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke the removed preview URL
    URL.revokeObjectURL(imagePreviews[index]);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("services_id", serviceId); // Keep as services_id to match controller
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("description", description);

    // Append multiple images
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      const res = await api.post("/services-overview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Overview created successfully");
      navigate(`/admin/dashboard/services/${serviceId}/overview`);
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

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Create Service Overview
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add overview details for {serviceName || "your service"}
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(`/admin/dashboard/services/${serviceId}/overview`)
            }
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Overviews
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Service Information */}
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

          {/* Overview Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Overview Information
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
                  placeholder="e.g., Our Approach to Interior Design"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("title")}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Intro */}
              <div className="space-y-2">
                <Label
                  htmlFor="intro"
                  className="text-sm font-medium text-gray-700"
                >
                  Intro <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="intro"
                  value={intro}
                  onChange={(e) => {
                    setIntro(e.target.value);
                    if (errors.intro) setErrors({ ...errors, intro: null });
                  }}
                  placeholder="Brief introduction to the overview..."
                  rows={3}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("intro")}`}
                />
                {errors.intro && (
                  <p className="text-red-500 text-sm mt-1">{errors.intro[0]}</p>
                )}
              </div>

              {/* Description - Tiptap Editor */}
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

              {/* Images Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="images"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload Images
                </Label>

                {imagePreviews.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative group border border-gray-200 p-1"
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-20 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer rounded-none"
                    >
                      <UploadCloud size={16} />
                      Add More Images
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                      errors.images ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="text-base font-medium text-gray-700">
                      Click to upload images
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, WebP up to 2MB each
                    </p>
                  </label>
                )}

                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.images[0]}
                  </p>
                )}

                {images.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {images.length} {images.length === 1 ? "image" : "images"}{" "}
                    selected
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
                navigate(`/admin/dashboard/services/${serviceId}/overview`)
              }
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="mr-2">Creating...</span>
                 
                </>
              ) : (
                "Create Overview"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
