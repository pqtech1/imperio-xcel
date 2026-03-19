import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, ArrowLeft } from "lucide-react";

export default function CreateClient() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });

    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoPreview(null);
    }

    if (errors.logo) {
      setErrors({ ...errors, logo: null });
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
      await api.post("/clients", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Client created successfully");
      navigate("/admin/dashboard/clients");
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
              Create Client
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add a new client to your portfolio
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/clients")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Clients
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Client Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Client Information
            </h3>

            <div className="grid gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Client Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("name")}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Company
                </Label>
                <Input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g., Acme Corporation"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("company")}`}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="client@example.com"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("email")}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("phone")}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Logo Upload */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Client Logo
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Company Logo
              </Label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer hover:bg-gray-50 transition ${
                  errors.logo ? "border-red-500" : "border-gray-300"
                }`}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />

                {logoPreview ? (
                  <div className="text-center w-full">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-24 w-24 object-contain mx-auto mb-3 border border-gray-200"
                    />
                    <p className="text-sm text-gray-600">
                      Click to change logo
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">
                      Click to upload logo
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

              {errors.logo && (
                <p className="text-red-500 text-sm mt-1">{errors.logo[0]}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Upload your client's company logo (optional)
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/clients")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {loading ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
