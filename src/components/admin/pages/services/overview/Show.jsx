import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowLeft, Pencil } from "lucide-react";

export default function OverviewShow() {
  const navigate = useNavigate();
  const { id, overviewId } = useParams();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await api.get(`/services-overview/${overviewId}`);
      setOverview(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch overview");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading overview...</div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Overview not found</div>
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
            onClick={() => navigate(`/admin/dashboard/services/${id}/overview`)}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Overviews
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">
            {overview.title}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Overview details and information
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(
              `/admin/dashboard/services/${id}/overview/${overviewId}/edit`,
            )
          }
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Overview
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
            <p className="text-base text-gray-900">{overview.title}</p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Intro</h2>
          </div>
          <div className="p-6">
            <p className="text-base text-gray-700 leading-relaxed">
              {overview.intro}
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
                __html: overview.description,
              }}
            />
          </div>
        </div>

        {/* Images Section */}
        {overview.images && overview.images.length > 0 && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Images</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {overview.images.map((img, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={`${IMG_PATH}${img}`}
                      alt={`Overview image ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Overview ID: {overviewId}</p>
      </div>
    </div>
  );
}
