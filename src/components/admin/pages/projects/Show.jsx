import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        toast.error("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Project not found</div>
      </div>
    );
  }

  const getStatusBadge = (ongoing) => {
    return ongoing ? (
      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium">
        Ongoing
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium">
        Completed
      </span>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard/projects")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">
            {project.name}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Project details and information
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/projects/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Project
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Basic Information */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Basic Information
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Project Name
                </dt>
                <dd className="text-base text-gray-900">{project.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Status
                </dt>
                <dd className="text-base">{getStatusBadge(project.ongoing)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </dt>
                <dd className="text-base text-gray-700 leading-relaxed">
                  {project.description || "No description provided"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Location Details */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Location Details
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Address
                </dt>
                <dd className="text-sm text-gray-700">
                  {project.address || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  District
                </dt>
                <dd className="text-sm text-gray-700">
                  {project.district || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  State
                </dt>
                <dd className="text-sm text-gray-700">
                  {project.state || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Country
                </dt>
                <dd className="text-sm text-gray-700">
                  {project.country || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Pincode
                </dt>
                <dd className="text-sm text-gray-700">
                  {project.pincode || "—"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Project Images
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((img) => (
                  <div
                    key={img.id}
                    className="border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={`${IMG_PATH}/${img.image_path}`}
                      alt={`Project ${img.id}`}
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
        <p className="text-xs text-gray-400">Project ID: {id}</p>
      </div>
    </div>
  );
}
