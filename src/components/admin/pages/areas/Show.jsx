import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowArea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const res = await api.get(`/areas/${id}`);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to fetch area details");
      } finally {
        setLoading(false);
      }
    };
    fetchArea();
  }, [id]);

  // Format numbers with commas
  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    return Number(num).toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading area details...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Area not found</div>
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
            onClick={() => navigate("dashboard/areas")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Areas
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">{data.title}</h1>
          <p className="text-base text-gray-600 mt-1">
            Service area details and statistics
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/areas/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Area
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Image Section */}
        {data.image && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Area Image
              </h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 p-2 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${data.image}`}
                  alt={data.title}
                  className="h-48 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Description
            </h2>
          </div>
          <div className="p-6">
            <p className="text-base text-gray-700 leading-relaxed">
              {data.description || "No description provided"}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Statistics
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 p-4 bg-gray-50">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Projects Done
                </dt>
                <dd className="text-3xl font-bold text-gray-900">
                  {formatNumber(data.projects_done)}+
                </dd>
              </div>
              <div className="border border-gray-200 p-4 bg-gray-50">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Clients Served
                </dt>
                <dd className="text-3xl font-bold text-gray-900">
                  {formatNumber(data.clients_served)}+
                </dd>
              </div>
              <div className="border border-gray-200 p-4 bg-gray-50">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Years Experience
                </dt>
                <dd className="text-3xl font-bold text-gray-900">
                  {formatNumber(data.years_experience)}+
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Summary Card */}
        <div className="border border-gray-200 bg-gray-50">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Total Impact
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatNumber(
                    Number(data.projects_done || 0) +
                      Number(data.clients_served || 0),
                  )}
                  + combined
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Projects and clients served
                </p>
              </div>
              {data.image && (
                <div className="w-16 h-16 bg-white border border-gray-200 p-2">
                  <img
                    src={`${IMG_PATH}/${data.image}`}
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
        <p className="text-xs text-gray-400">Area ID: {id}</p>
      </div>
    </div>
  );
}
