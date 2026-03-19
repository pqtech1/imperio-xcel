import { useEffect, useState } from "react";
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

export default function WhyWorkWithUsEdit() {
  const navigate = useNavigate();
  const { id, whyWorkWithUsId } = useParams();

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/why-work-with-us/${whyWorkWithUsId}`);
        const data = res.data.data;

        setTitle(data.title);
        setTagline(data.tagline);
        setDescription(data.description);
      } catch (err) {
        toast.error("Failed to fetch data");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [whyWorkWithUsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      const res = await api.put(`/why-work-with-us/${whyWorkWithUsId}`, {
        title,
        tagline,
        description,
      });

      toast.success(res.data.message || "Updated successfully");
      navigate(`/admin/dashboard/services/${id}/why-work-with-us`);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8">
        <div className="text-gray-500 text-base">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Edit Why Work With Us
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Update why customers should choose your service
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(`/admin/dashboard/services/${id}/why-work-with-us`)
            }
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Why Work With Us Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Why Work With Us Information
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
                  placeholder="e.g., Expertise & Experience"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("title")}`}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Tagline <span className="text-red-500">*</span>
                </Label>

                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
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
                <Label className="text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </Label>

                <div className="border border-gray-300">
                  <TiptapEditor
                    key={description} // Force re-render when content changes
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() =>
                navigate(`/admin/dashboard/services/${id}/why-work-with-us`)
              }
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[120px]"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
