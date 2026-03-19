import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function WhyWorkWithUsShow() {
  const navigate = useNavigate();
  const { id, whyWorkWithUsId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`/why-work-with-us/${whyWorkWithUsId}`);
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Record not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() =>
              navigate(`/admin/dashboard/services/${id}/why-work-with-us`)
            }
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to List
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">{data.title}</h1>
          <p className="text-base text-gray-600 mt-1">
            Why work with us details
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(
              `/admin/dashboard/services/${id}/why-work-with-us/${whyWorkWithUsId}/edit`,
            )
          }
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Title Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Title</h2>
          </div>
          <div className="p-6">
            <p className="text-base text-gray-900">{data.title}</p>
          </div>
        </div>

        {/* Tagline Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Tagline</h2>
          </div>
          <div className="p-6">
            <p className="text-base text-gray-700 leading-relaxed">
              {data.tagline}
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Description
            </h2>
          </div>
          <div className="p-6">
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Record ID: {whyWorkWithUsId}</p>
      </div>
    </div>
  );
}
