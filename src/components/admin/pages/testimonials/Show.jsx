import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await api.get(`/testimonials/${id}`);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to fetch testimonial details");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonial();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading testimonial...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Testimonial not found</div>
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
            onClick={() => navigate("/admin/dashboard/testimonials")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Testimonials
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">
            {data.client_name}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Client testimonial details
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/testimonials/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Testimonial
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Client Photo */}
        {data.client_image && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Client Photo
              </h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 p-2 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${data.client_image}`}
                  alt={data.client_name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Client Information */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Client Information
            </h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Client Name
                </dt>
                <dd className="text-base text-gray-900">{data.client_name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Position
                </dt>
                <dd className="text-base text-gray-700">
                  {data.client_post || "—"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Testimonial */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Testimonial
            </h2>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 p-6 border border-gray-200">
              <p className="text-gray-700 text-lg italic leading-relaxed">
                "{data.client_testimonial_text}"
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-px bg-gray-300 mr-3"></div>
                <span className="text-sm font-medium text-gray-600">
                  {data.client_name}
                </span>
                {data.client_post && (
                  <>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-sm text-gray-500">
                      {data.client_post}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Testimonial ID: {id}</p>
      </div>
    </div>
  );
}
