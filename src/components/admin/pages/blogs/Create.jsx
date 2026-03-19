import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, ArrowLeft } from "lucide-react";

import TiptapEditor from "@/components/editor/TiptapEditor";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    is_published: false,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
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
    fd.append("title", form.title);
    fd.append("slug", form.slug);
    fd.append("content", form.content);
    fd.append("is_published", form.is_published ? 1 : 0);

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    try {
      await api.post("/blogs", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog created successfully");
      navigate("/admin/dashboard/blogs");
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

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Create Blog Post
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add a new blog post to your website
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/blogs")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Blog Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Blog Information
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
                  placeholder="e.g., 10 Interior Design Trends for 2024"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="10-interior-design-trends-2024"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("slug")}`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-generated from title, but you can edit it manually
                </p>
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>
                )}
              </div>

              {/* Content - Tiptap Editor */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Content <span className="text-red-500">*</span>
                </Label>
                <div className="border border-gray-300">
                  <TiptapEditor
                    content={form.content}
                    setContent={(html) => setForm({ ...form, content: html })}
                  />
                </div>
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content[0]}
                  </p>
                )}
              </div>

              {/* Published Checkbox */}
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="is_published"
                  name="is_published"
                  checked={form.is_published}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, is_published: checked })
                  }
                  className="rounded-none border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                />
                <Label
                  htmlFor="is_published"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Publish immediately
                </Label>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Featured Image */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Featured Image
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Blog Image
              </Label>

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
                      className="h-32 w-auto object-contain mx-auto mb-3 border border-gray-200"
                    />
                    <p className="text-sm text-gray-600">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload featured image
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, WebP up to 2MB
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
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 1200×630 pixels
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/blogs")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {submitting ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
