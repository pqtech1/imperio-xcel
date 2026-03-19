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

export default function ClientsIndex() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      await api.delete(`/clients/${id}`);
      toast.success("Client deleted successfully");
      fetchClients();
    } catch (err) {
      toast.error("Failed to delete client");
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

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all your clients</p>
        </div>

        <Button
          onClick={() => navigate("/admin/dashboard/clients/create")}
          className="h-10 px-4 text-sm gap-2 bg-gray-900 text-white hover:bg-gray-800 rounded-none"
        >
          <Plus size={16} />
          Add Client
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
                Logo
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Client Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Company
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Email
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider py-4 pl-4">
                Phone
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
                  colSpan={7}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  Loading clients...
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  No clients found
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client, index) => (
                <TableRow
                  key={client.id}
                  className="group border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <TableCell className="text-sm text-gray-600 font-mono py-4 pl-4">
                    {(index + 1).toString().padStart(2, "0")}
                  </TableCell>

                  <TableCell className="py-4 pl-4">
                    {client.logo ? (
                      <div className="border border-gray-200 p-1 w-12 h-12 flex items-center justify-center bg-gray-50">
                        <img
                          src={`${IMG_PATH}/${client.logo}`}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No logo
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-base text-gray-900 font-medium py-4 pl-4">
                    {client.name}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4">
                    {client.company || "—"}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4">
                    {client.email || "—"}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4">
                    {client.phone || "—"}
                  </TableCell>

                  <TableCell className="py-4 pl-4 pr-4">
                    <div className="flex justify-end items-center gap-2">
                      {/* View */}
                      <ActionButton
                        icon={Eye}
                        tooltip="View"
                        color="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() =>
                          navigate(`/admin/dashboard/clients/${client.id}`)
                        }
                      />

                      {/* Edit */}
                      <ActionButton
                        icon={Pencil}
                        tooltip="Edit"
                        color="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        onClick={() =>
                          navigate(`/admin/dashboard/clients/${client.id}/edit`)
                        }
                      />

                      {/* Delete */}
                      <ActionButton
                        icon={Trash2}
                        tooltip="Delete"
                        color="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => handleDelete(client.id)}
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
      {clients.length > 0 && (
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            {clients.length} {clients.length === 1 ? "client" : "clients"} total
          </p>
        </div>
      )}
    </div>
  );
}
