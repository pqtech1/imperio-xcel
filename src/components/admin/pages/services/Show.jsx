import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api, { API_URL, IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data.data);
      } catch {
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="text-gray-500 text-base">Loading service...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="text-gray-500 text-base">Service not found</div>
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
            onClick={() => navigate("/admin/dashboard/services")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">
            {service.service_title}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Service details and information
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(`/admin/dashboard/services/${service.id}/edit`)
          }
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Service
        </Button>
      </div>

      {/* Banner */}
      {service.service_banner_img && (
        <div className="mb-10 border border-gray-200 bg-gray-50">
          <img
            src={`${IMG_PATH}/${service.service_banner_img}`}
            alt={service.service_title}
            className="w-full max-h-[320px] object-cover"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            Service Details
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Service Title
              </p>
              <p className="text-base text-gray-900">{service.service_title}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Slug
              </p>
              <p className="text-base text-gray-600">{service.slug}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Tagline
              </p>
              <p className="text-base text-gray-900">
                {service.service_tagline}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Intro Title
              </p>
              <p className="text-base text-gray-900">
                {service.service_intro_title}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Short Description
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                {service.service_short_description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-8 border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            SEO Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Meta Title
              </p>
              <p className="text-base text-gray-900">{service.title}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Keywords
              </p>
              <p className="text-base text-gray-600">{service.keyword}</p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Meta Description
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Service ID: {service.id}</p>
      </div>
    </div>
  );
};

export default Show;
