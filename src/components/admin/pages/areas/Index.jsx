import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
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

import { Eye, Pencil, Trash2, Plus } from "lucide-react";

export default function AreasIndex() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get("/areas");
      setData(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch areas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this area?")) return;

    try {
      await api.delete(`/areas/${id}`);
      toast.success("Area deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete area");
      console.error(err);
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

  // Format numbers with commas
  const formatNumber = (num) => {
    if (!num && num !== 0) return "—";
    return Number(num).toLocaleString();
  };

  // Truncate description
  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Service Areas
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage all service areas and locations
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/dashboard/areas/create")}
          className="h-10 px-4 text-sm gap-2 bg-gray-900 text-white hover:bg-gray-800 rounded-none"
        >
          <Plus size={16} />
          Add Area
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
                Image
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Title
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Description
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Projects
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Clients
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Years
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
                  colSpan={8}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  Loading areas...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  No areas found
                </TableCell>
              </TableRow>
            ) : (
              data.map((area, index) => (
                <TableRow
                  key={area.id}
                  className="group border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <TableCell className="text-sm text-gray-600 font-mono py-4 pl-4">
                    {(index + 1).toString().padStart(2, "0")}
                  </TableCell>

                  <TableCell className="py-4 pl-4">
                    {area.image ? (
                      <div className="border border-gray-200 p-1 w-12 h-12 flex items-center justify-center bg-gray-50">
                        <img
                          src={`${IMG_PATH}/${area.image}`}
                          alt={area.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-base text-gray-900 font-medium py-4 pl-4">
                    {area.title}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4 max-w-xs">
                    {truncateText(area.description, 50)}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-gray-900 py-4 pl-4">
                    {formatNumber(area.projects_done)}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-gray-900 py-4 pl-4">
                    {formatNumber(area.clients_served)}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-gray-900 py-4 pl-4">
                    {formatNumber(area.years_experience)}
                  </TableCell>

                  <TableCell className="py-4 pl-4 pr-4">
                    <div className="flex justify-end items-center gap-2">
                      {/* View */}
                      <ActionButton
                        icon={Eye}
                        tooltip="View"
                        color="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() =>
                          navigate(`/admin/dashboard/areas/${area.id}`)
                        }
                      />

                      {/* Edit */}
                      <ActionButton
                        icon={Pencil}
                        tooltip="Edit"
                        color="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        onClick={() =>
                          navigate(`/admin/dashboard/areas/${area.id}/edit`)
                        }
                      />

                      {/* Delete */}
                      <ActionButton
                        icon={Trash2}
                        tooltip="Delete"
                        color="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => handleDelete(area.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with count */}
      {data.length > 0 && (
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            {data.length} {data.length === 1 ? "area" : "areas"} total
          </p>
        </div>
      )}
    </div>
  );
}
