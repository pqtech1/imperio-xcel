import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/clients/${id}`);
        setClient(res.data);
      } catch (err) {
        toast.error("Failed to fetch client details");
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading client...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Client not found</div>
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
            onClick={() => navigate("/admin/dashboard/clients")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Clients
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">
            {client.name}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Client details and information
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/clients/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Client
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Logo Section */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Company Logo
            </h2>
          </div>
          <div className="p-6">
            {client.logo ? (
              <div className="border border-gray-200 p-4 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${client.logo}`}
                  alt={client.name}
                  className="h-24 w-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-gray-500 text-sm">No logo uploaded</div>
            )}
          </div>
        </div>

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
                  Client Name
                </dt>
                <dd className="text-base text-gray-900">{client.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Company
                </dt>
                <dd className="text-base text-gray-700">
                  {client.company || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </dt>
                <dd className="text-base text-gray-700">
                  {client.email ? (
                    <a
                      href={`mailto:${client.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {client.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Phone
                </dt>
                <dd className="text-base text-gray-700">
                  {client.phone ? (
                    <a
                      href={`tel:${client.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {client.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Client ID: {id}</p>
      </div>
    </div>
  );
}
