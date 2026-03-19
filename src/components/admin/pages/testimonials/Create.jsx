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

export default function CreateTestimonial() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    client_testimonial_text: "",
    client_name: "",
    client_post: "",
    client_image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
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
    setForm({ ...form, client_image: file });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }

    if (errors.client_image) {
      setErrors({ ...errors, client_image: null });
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
      await api.post("/testimonials", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Testimonial created successfully");
      navigate("/admin/dashboard/testimonials");
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
              Create Testimonial
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add a new client testimonial to your website
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/testimonials")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Testimonials
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Testimonial Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Testimonial Information
            </h3>

            <div className="grid gap-6">
              {/* Testimonial Text */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Testimonial <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name="client_testimonial_text"
                  value={form.client_testimonial_text}
                  onChange={handleChange}
                  placeholder="What did the client say about your services?"
                  rows={5}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("client_testimonial_text")}`}
                />
                {errors.client_testimonial_text && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.client_testimonial_text[0]}
                  </p>
                )}
              </div>

              {/* Client Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Client Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="client_name"
                  value={form.client_name}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("client_name")}`}
                />
                {errors.client_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.client_name[0]}
                  </p>
                )}
              </div>

              {/* Client Post */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Client Position
                </Label>
                <Input
                  name="client_post"
                  value={form.client_post}
                  onChange={handleChange}
                  placeholder="e.g., CEO, Acme Corporation"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("client_post")}`}
                />
                {errors.client_post && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.client_post[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Client Image */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Client Photo
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Client Image
              </Label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                  errors.client_image ? "border-red-500" : "border-gray-300"
                }`}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />

                {imagePreview ? (
                  <div className="text-center w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover mx-auto mb-3 border border-gray-200"
                    />
                    <p className="text-sm text-gray-600">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload client photo
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

              {errors.client_image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.client_image[0]}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Recommended: Square image, at least 200×200 pixels
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/testimonials")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {loading ? "Creating..." : "Create Testimonial"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
