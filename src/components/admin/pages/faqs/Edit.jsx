import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function EditFaq() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await api.get(`/faqs/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to fetch FAQ data");
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      await api.put(`/faqs/${id}`, form);

      toast.success("FAQ updated successfully");
      navigate("/admin/dashboard/faqs");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Something went wrong");
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8">
        <div className="text-gray-500 text-base">Loading FAQ data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Edit FAQ
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Update frequently asked question
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/dashboard/faqs")}
            className="h-10 px-4 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to FAQs
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* FAQ Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              FAQ Information
            </h3>

            <div className="grid gap-6">
              {/* Question */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Question <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="e.g., What are your working hours?"
                  className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError("question")}`}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.question[0]}
                  </p>
                )}
              </div>

              {/* Answer */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Answer <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  placeholder="Provide a clear and helpful answer..."
                  rows={6}
                  className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError("answer")}`}
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.answer[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/faqs")}
              className="h-11 px-6 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-base font-medium rounded-none"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px]"
            >
              {submitting ? "Updating..." : "Update FAQ"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
