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
import { UploadCloud, ArrowLeft } from "lucide-react";

export default function EditArea() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    projects_done: "",
    clients_served: "",
    years_experience: "",
    image: null,
  });

  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const res = await api.get(`/areas/${id}`);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          projects_done: res.data.projects_done || "",
          clients_served: res.data.clients_served || "",
          years_experience: res.data.years_experience || "",
          image: null,
        });
        if (res.data.image) {
          setExistingImage(res.data.image);
        }
      } catch (err) {
        toast.error("Failed to fetch area data");
      } finally {
        setLoading(false);
      }
    };
    fetchArea();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setExistingImage(null); // Hide existing image when new one is selected
    } else {
      setImagePreview(null);
    }

    if (errors.image) {
      setErrors({ ...errors, image: null });
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        fd.append(key, form[key]);
      }
    });

    try {
      await api.post(`/areas/${id}?_method=PUT`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Area updated successfully");
      navigate("/admin/dashboard/areas");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Something went wrong");
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8">
        <div className="text-gray-500 text-base">Loading area data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Edit Area
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Update service area information
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/areas")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Areas
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Area Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Area Information
            </h3>

            <div className="grid gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Interior Design"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe this service area..."
                  rows={4}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("description")}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Statistics */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Statistics
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Projects Done */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Projects Done
                </Label>
                <Input
                  name="projects_done"
                  type="number"
                  value={form.projects_done}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("projects_done")}`}
                />
                {errors.projects_done && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projects_done[0]}
                  </p>
                )}
              </div>

              {/* Clients Served */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Clients Served
                </Label>
                <Input
                  name="clients_served"
                  type="number"
                  value={form.clients_served}
                  onChange={handleChange}
                  placeholder="e.g., 350"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("clients_served")}`}
                />
                {errors.clients_served && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clients_served[0]}
                  </p>
                )}
              </div>

              {/* Years Experience */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Years Experience
                </Label>
                <Input
                  name="years_experience"
                  type="number"
                  value={form.years_experience}
                  onChange={handleChange}
                  placeholder="e.g., 15"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("years_experience")}`}
                />
                {errors.years_experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.years_experience[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Area Image */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Area Image
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Image</Label>

              {/* Show existing image if available and no new image selected */}
              {existingImage && !imagePreview && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                  <div className="border border-gray-200 p-2 inline-block bg-gray-50">
                    <img
                      src={`${IMG_PATH}/${existingImage}`}
                      alt="Current area"
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                </div>
              )}

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />

                {imagePreview ? (
                  <div className="text-center w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-auto object-contain mx-auto mb-3 border border-gray-200 p-2"
                    />
                    <p className="text-sm text-gray-600">
                      New image selected - click to change
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      {existingImage
                        ? "Click to replace image"
                        : "Click to upload area image"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
              )}
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/areas")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {submitting ? "Updating..." : "Update Area"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
