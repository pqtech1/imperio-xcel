import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await api.get(`/teams/${id}`);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to fetch team member details");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMember();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading team member...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Team member not found</div>
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
            onClick={() => navigate("/admin/dashboard/teams")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Team
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">{data.name}</h1>
          <p className="text-base text-gray-600 mt-1">Team member profile</p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/teams/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Member
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Profile Photo Section */}
        {data.image && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Profile Photo
              </h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 p-2 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${data.image}`}
                  alt={data.name}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Personal Information
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </dt>
                <dd className="text-base text-gray-900">{data.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Designation
                </dt>
                <dd className="text-base text-gray-700">
                  {data.designation || "—"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Biography */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Biography</h2>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 p-6 border border-gray-200">
              <p className="text-gray-700 text-base leading-relaxed">
                {data.bio || "No biography provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Card (optional visual enhancement) */}
        {data.bio && (
          <div className="border border-gray-200 bg-gray-50">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl text-gray-300 font-serif">"</div>
                <div className="flex-1">
                  <p className="text-gray-700 text-lg italic">
                    {data.bio.length > 100
                      ? data.bio.substring(0, 100) + "..."
                      : data.bio}
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="w-8 h-px bg-gray-300 mr-3"></div>
                    <span className="text-sm font-medium text-gray-600">
                      {data.name}
                    </span>
                    {data.designation && (
                      <>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-500">
                          {data.designation}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Member ID: {id}</p>
      </div>
    </div>
  );
}
