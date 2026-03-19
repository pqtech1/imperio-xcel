import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CreateFaq() {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ADD FIELD
  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  // REMOVE FIELD
  const removeFaq = (index) => {
    if (faqs.length === 1) {
      toast.error("You need at least one FAQ");
      return;
    }
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
  };

  // HANDLE CHANGE
  const handleChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);

    // Clear errors for this field
    if (errors[`faqs.${index}.${field}`]) {
      setErrors({ ...errors, [`faqs.${index}.${field}`]: null });
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await api.post("/faqs", { faqs });

      toast.success("FAQs created successfully");
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
      setLoading(false);
    }
  };

  const inputError = (field) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Create FAQs
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add frequently asked questions for your website
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
          {/* FAQs Section */}
          <div>
            <div className="flex items-center justify-between mb-6 ">
              <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-200 flex-1">
                Frequently Asked Questions
              </h3>
              <Button
                type="button"
                onClick={addFaq}
                className="h-9 px-3 bg-gray-900 text-white hover:bg-gray-800 text-xs gap-1 rounded-none ml-4"
              >
                <Plus size={14} />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-6 bg-white"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Question #{index + 1}
                    </h4>
                    <Button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="h-8 w-8 bg-white text-gray-500 hover:bg-red-50 hover:text-red-600 border border-gray-300 rounded-none p-0"
                      title="Remove question"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Question */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Question <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          handleChange(index, "question", e.target.value)
                        }
                        placeholder="e.g., What are your working hours?"
                        className={`h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full ${inputError(`faqs.${index}.question`)}`}
                      />
                      {errors[`faqs.${index}.question`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`faqs.${index}.question`][0]}
                        </p>
                      )}
                    </div>

                    {/* Answer */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Answer <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) =>
                          handleChange(index, "answer", e.target.value)
                        }
                        placeholder="Provide a clear and helpful answer..."
                        rows={4}
                        className={`w-full px-4 py-3 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none ${inputError(`faqs.${index}.answer`)}`}
                      />
                      {errors[`faqs.${index}.answer`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`faqs.${index}.answer`][0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {faqs.length === 0 && (
              <div className="text-center py-12 border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">No FAQs added yet</p>
                <Button
                  type="button"
                  onClick={addFaq}
                  className="mt-4 h-9 px-4 bg-gray-900 text-white hover:bg-gray-800 text-xs gap-1 rounded-none"
                >
                  <Plus size={14} />
                  Add Your First Question
                </Button>
              </div>
            )}
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
              disabled={loading || faqs.length === 0}
              className="h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save FAQs"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
