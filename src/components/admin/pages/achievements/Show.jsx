import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowAchievement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const res = await api.get(`/achievements/${id}`);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to fetch achievement details");
      } finally {
        setLoading(false);
      }
    };
    fetchAchievement();
  }, [id]);

  // Format count with commas for thousands
  const formatCount = (count) => {
    if (!count) return "0";
    return Number(count).toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading achievement...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Achievement not found</div>
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
            onClick={() => navigate("/admin/dashboard/achievements")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Achievements
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">{data.title}</h1>
          <p className="text-base text-gray-600 mt-1">
            Achievement details and information
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/achievements/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Achievement
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Icon Section */}
        {data.icon && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Achievement Icon
              </h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 p-4 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${data.icon}`}
                  alt={data.title}
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Achievement Information */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Achievement Information
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Title
                </dt>
                <dd className="text-base text-gray-900">{data.title}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Count
                </dt>
                <dd className="text-3xl font-bold text-gray-900">
                  {formatCount(data.count)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </dt>
                <dd className="text-base text-gray-700 leading-relaxed">
                  {data.description || "No description provided"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Card (optional visual enhancement) */}
        <div className="border border-gray-200 bg-gray-50">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Achievement Value
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {formatCount(data.count)}+
                </p>
              </div>
              {data.icon && (
                <div className="w-16 h-16 bg-white border border-gray-200 p-2">
                  <img
                    src={`${IMG_PATH}/${data.icon}`}
                    alt={data.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Achievement ID: {id}</p>
      </div>
    </div>
  );
}
