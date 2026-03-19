import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pencil,
  Trash2,
  Eye,
  LayoutDashboard,
  Briefcase,
  Boxes,
  Images,
  Star,
  Workflow,
  Plus,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.get("/services");

        setServices(res.data.data);
      } catch {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);

      toast.success("Service deleted");

      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const ActionButton = ({ icon: Icon, tooltip, onClick, color }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          onClick={onClick}
          className={`inline-flex items-center justify-center h-9 w-9 cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-200 ${color}`}
        >
          <Icon size={18} />
        </span>
      </TooltipTrigger>

      <TooltipContent
        side="top"
        className="bg-gray-900 text-white border-gray-800 px-3 py-1.5"
      >
        <p className="text-sm text-white font-medium">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Services
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage all your services from here
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/dashboard/services/create")}
          className="h-10 px-4 text-sm gap-2 bg-gray-900 text-white hover:bg-gray-800 rounded-none"
        >
          <Plus size={18} />
          Create Service
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-sm font-semibold text-gray-700 py-4 pl-4 w-[60px]">
                #
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-700 py-4 pl-4">
                Service Title
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-700 py-4 pl-4">
                Slug
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-700 py-4 pl-4 text-right pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  Loading services...
                </TableCell>
              </TableRow>
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <TableRow
                  key={service.id}
                  className="group border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-200"
                >
                  <TableCell className="text-sm text-gray-600 font-medium py-4 pl-4">
                    {index + 1}
                  </TableCell>

                  <TableCell className="text-base text-gray-900 font-medium py-4 pl-4">
                    {service.service_title}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600 py-4 pl-4">
                    {service.slug}
                  </TableCell>

                  <TableCell className="py-4 pl-4 pr-4">
                    <div className="flex justify-end items-center gap-1">
                      <ActionButton
                        icon={Eye}
                        tooltip="View"
                        color="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() =>
                          navigate(`/admin/dashboard/services/${service.id}`)
                        }
                      />

                      <ActionButton
                        icon={Pencil}
                        tooltip="Edit"
                        color="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${service.id}/edit`,
                          )
                        }
                      />

                      <ActionButton
                        icon={LayoutDashboard}
                        tooltip="Overview"
                        color="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${service.id}/overview`,
                          )
                        }
                      />

                      <ActionButton
                        icon={Briefcase}
                        tooltip="Why Work With Us"
                        color="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${service.id}/why-work-with-us`,
                          )
                        }
                      />
                      <ActionButton
                        icon={Boxes}
                        tooltip="What We Do"
                        color="text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/services/${service.id}/what-we-do`,
                          )
                        }
                      />

                      <ActionButton
                        icon={Trash2}
                        tooltip="Delete"
                        color="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => deleteService(service.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-16 text-gray-500 text-base pl-4"
                >
                  No services created yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with count */}
      {services.length > 0 && (
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            {services.length} {services.length === 1 ? "service" : "services"}{" "}
            total
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
