import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, Trash2, ArrowLeft } from "lucide-react";

import TiptapEditor from "@/components/editor/TiptapEditor";

export default function OverviewEdit() {
  const navigate = useNavigate();
  const { id, overviewId } = useParams();

  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOverview = async () => {
    try {
      const res = await api.get(`/services-overview/${overviewId}`);
      const data = res.data.data;

      setTitle(data.title || "");
      setIntro(data.intro || "");
      setDescription(data.description || "");
      setExistingImages(data.images || []);
    } catch (error) {
      toast.error("Failed to fetch overview");
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    const formData = new FormData();

    formData.append("services_id", id);
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("description", description);

    existingImages.forEach((img) => {
      formData.append("existing_images[]", img);
    });

    images.forEach((img) => {
      formData.append("images[]", img);
    });

    try {
      const res = await api.post(
        `/services-overview/${overviewId}?_method=PUT`,
        formData,
      );

      toast.success(res.data.message || "Overview updated successfully");
      navigate(`/admin/dashboard/services/${id}/overview`);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Update failed");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Edit Service Overview
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Update overview details for your service
            </p>
          </div>

          <Button
            onClick={() => navigate(`/admin/dashboard/services/${id}/overview`)}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Overview Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Overview Information
            </h3>

            <div className="grid gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </Label>

                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Our Design Philosophy"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Intro */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Intro <span className="text-red-500">*</span>
                </Label>

                <Textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Brief introduction to this overview section..."
                  rows={3}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("intro")}`}
                />

                {errors.intro && (
                  <p className="text-red-500 text-sm mt-1">{errors.intro[0]}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </Label>

                <div className="border border-gray-300">
                  <TiptapEditor
                    key={description}
                    content={description}
                    setContent={setDescription}
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

          {/* Images */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Images
            </h3>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-8">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Existing Images
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 bg-gray-50"
                    >
                      <img
                        src={`${IMG_PATH}/${img}`}
                        alt={`Existing ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-2 right-2 bg-white border border-gray-300 p-1.5 hover:bg-red-50 transition-colors group"
                        title="Remove image"
                      >
                        <Trash2
                          size={14}
                          className="text-gray-600 group-hover:text-red-600"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                {existingImages.length > 0
                  ? "Add More Images"
                  : "Upload Images"}
              </Label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                  errors.images ? "border-red-500" : "border-gray-300"
                }`}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />

                {imagePreviews.length > 0 ? (
                  <div className="text-center w-full">
                    <div className="flex flex-wrap gap-3 justify-center mb-3">
                      {imagePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-16 w-16 object-cover border border-gray-200"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {images.length} new{" "}
                      {images.length === 1 ? "image" : "images"} selected
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click to change or add more
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload images
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG up to 2MB each
                    </p>
                  </>
                )}

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images[0]}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                You can select multiple images
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() =>
                navigate(`/admin/dashboard/services/${id}/overview`)
              }
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {loading ? "Updating..." : "Update Overview"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
