import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, ArrowLeft } from "lucide-react";

export default function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    ongoing: false,
    address: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    if (errors.images) {
      setErrors({ ...errors, images: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("ongoing", form.ongoing ? 1 : 0);
    formData.append("address", form.address);
    formData.append("district", form.district);
    formData.append("state", form.state);
    formData.append("country", form.country);
    formData.append("pincode", form.pincode);

    for (let i = 0; i < form.images.length; i++) {
      formData.append("images[]", form.images[i]);
    }

    try {
      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project created successfully");
      navigate("/admin/dashboard/projects");
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

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Create Project
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add a new project to your portfolio
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/projects")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Project Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Project Information
            </h3>

            <div className="grid gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Luxury Villa Renovation"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("name")}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the project..."
                  rows={4}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("description")}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>

              {/* Ongoing Checkbox */}
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="ongoing"
                  name="ongoing"
                  checked={form.ongoing}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, ongoing: checked })
                  }
                  className="rounded-none border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                />
                <Label
                  htmlFor="ongoing"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  This project is currently ongoing
                </Label>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Location Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Location Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("address")}`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address[0]}
                  </p>
                )}
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  District
                </Label>
                <Input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="District"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("district")}`}
                />
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.district[0]}
                  </p>
                )}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  State
                </Label>
                <Input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("state")}`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state[0]}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("country")}`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country[0]}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Pincode
                </Label>
                <Input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("pincode")}`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Images */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Project Images
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Upload Images
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
                          className="h-20 w-20 object-cover border border-gray-200"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {form.images.length}{" "}
                      {form.images.length === 1 ? "image" : "images"} selected
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click to change or add more
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload project images
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
              onClick={() => navigate("/admin/dashboard/projects")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
