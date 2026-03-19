import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, ArrowLeft } from "lucide-react";

export default function CreateAchievement() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    count: "",
    icon: null,
  });

  const [iconPreview, setIconPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, icon: file });

    if (file) {
      setIconPreview(URL.createObjectURL(file));
    } else {
      setIconPreview(null);
    }

    if (errors.icon) {
      setErrors({ ...errors, icon: null });
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    try {
      await api.post("/achievements", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Achievement created successfully");
      navigate("/admin/dashboard/achievements");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Something went wrong");
      }
      console.error(err);
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
              Create Achievement
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add a new achievement or milestone to showcase
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/achievements")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Achievements
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Achievement Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Achievement Information
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
                  placeholder="e.g., Projects Completed"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Count */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Count <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="count"
                  type="number"
                  value={form.count}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("count")}`}
                />
                {errors.count && (
                  <p className="text-red-500 text-sm mt-1">{errors.count[0]}</p>
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
                  placeholder="Describe this achievement..."
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

          {/* Icon Upload */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Achievement Icon
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Icon Image
              </Label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                  errors.icon ? "border-red-500" : "border-gray-300"
                }`}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />

                {iconPreview ? (
                  <div className="text-center w-full">
                    <img
                      src={iconPreview}
                      alt="Preview"
                      className="h-24 w-24 object-contain mx-auto mb-3 border border-gray-200 p-2"
                    />
                    <p className="text-sm text-gray-600">
                      Click to change icon
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload icon
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, SVG up to 2MB
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

              {errors.icon && (
                <p className="text-red-500 text-sm mt-1">{errors.icon[0]}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Recommended: Square icon, at least 100×100 pixels
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() =>
                navigate("/admin/dashboard/achievements")
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
              {loading ? "Creating..." : "Create Achievement"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
