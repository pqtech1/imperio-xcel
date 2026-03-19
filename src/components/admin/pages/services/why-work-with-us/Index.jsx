import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Eye, Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";

export default function WhyWorkWithUsIndex() {
  const navigate = useNavigate();
  const { id: serviceId } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceName, setServiceName] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fixed: changed from services_id to service_id
      const res = await api.get(`/why-work-with-us?service_id=${serviceId}`);
      setData(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch service details
  const fetchServiceDetails = async () => {
    try {
      const res = await api.get(`/services/${serviceId}`);
      setServiceName(res.data.data?.title || res.data.title || "Service");
    } catch (err) {
      console.error("Failed to fetch service details:", err);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchData();
      fetchServiceDetails();
    }
  }, [serviceId]);

  const deleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/why-work-with-us/${itemId}`);
      toast.success("Deleted successfully");
      fetchData(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
      console.error("Delete error:", error);
    }
  };

  const ActionButton = ({ icon: Icon, tooltip, onClick, color }) => (
    <span
      onClick={onClick}
      className={`inline-flex items-center justify-center h-7 w-7 cursor-pointer hover:bg-gray-100 rounded-none transition-all duration-200 ${color}`}
      title={tooltip}
    >
      <Icon size={14} />
    </span>
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
      <Button
        onClick={() => navigate("/admin/dashboard/services")}
        className="h-10 px-4 bg-white text-gray-600 hover:text-gray-900 text-sm rounded-none w-fit mb-3"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Services
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Why Work With Us {serviceName && `- ${serviceName}`}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage reasons why customers should choose{" "}
            {serviceName || "your service"}
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(
              `/admin/dashboard/services/${serviceId}/why-work-with-us/create`,
            )
          }
          className="h-10 px-4 text-sm gap-2 bg-gray-900 text-white hover:bg-gray-800 rounded-none"
        >
          <Plus size={16} />
          Add New
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4 w-[80px]">
                #
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Title
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Tagline
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Description
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4 text-right pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-16 text-gray-500 text-base"
                >
                  <div className="flex items-center justify-center gap-2">
                    Loading data...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-16 text-gray-500 text-base"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p>No records found for this service</p>
                    <Button
                      onClick={() =>
                        navigate(
                          `/admin/dashboard/services/${serviceId}/why-work-with-us/create`,
                        )
                      }
                      className="mt-2 h-9 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm rounded-none"
                    >
                      <Plus size={14} className="mr-2" />
                      Create your first item
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="group border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <TableCell className="text-sm text-gray-600 font-mono py-4 pl-4">
                    {(index + 1).toString().padStart(2, "0")}
                  </TableCell>

                  <TableCell className="text-base text-gray-900 font-medium py-4 pl-4">
                    {item.title}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4 max-w-xs">
                    <span className="truncate block" title={item.tagline}>
                      {item.tagline}
                    </span>
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4 max-w-sm">
                    <p className="truncate">
                      {item.description ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description
                                .replace(/<[^>]*>/g, "")
                                .substring(0, 80) + "...",
                          }}
                        />
                      ) : (
                        <span className="text-gray-400">No description</span>
                      )}
                    </p>
                  </TableCell>

                  <TableCell className="py-4 pl-4 pr-4">
                    <div className="flex justify-end items-center gap-2">
                      {/* View */}
                      <ActionButton
                        icon={Eye}
                        tooltip="View"
                        color="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${serviceId}/why-work-with-us/${item.id}`,
                          )
                        }
                      />

                      {/* Edit */}
                      <ActionButton
                        icon={Pencil}
                        tooltip="Edit"
                        color="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${serviceId}/why-work-with-us/${item.id}/edit`,
                          )
                        }
                      />

                      {/* Delete */}
                      <ActionButton
                        icon={Trash2}
                        tooltip="Delete"
                        color="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => deleteItem(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
