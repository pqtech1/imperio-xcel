import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMG_PATH } from "@/lib/api";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ShowBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Loading blog post...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-screen">
        <div className="text-gray-500 text-base">Blog post not found</div>
      </div>
    );
  }

  const getStatusBadge = (isPublished) => {
    return isPublished ? (
      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium">
        Published
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium">
        Draft
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
            onClick={() => navigate("/admin/dashboard/blogs")}
            className="mb-4 px-0 text-gray-600 hover:text-gray-900 hover:bg-transparent rounded-none text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Button>

          <h1 className="text-3xl font-semibold text-gray-900">{blog.title}</h1>
          <p className="text-base text-gray-600 mt-1">
            Blog post details and content
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/dashboard/blogs/${id}/edit`)}
          className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 text-sm gap-2 rounded-none"
        >
          <Pencil size={16} />
          Edit Post
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Featured Image */}
        {blog.image && (
          <div className="border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Featured Image
              </h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 p-2 inline-block bg-gray-50">
                <img
                  src={`${IMG_PATH}/${blog.image}`}
                  alt={blog.title}
                  className="h-48 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

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
                  Title
                </dt>
                <dd className="text-base text-gray-900">{blog.title}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Slug
                </dt>
                <dd className="text-base text-gray-600">{blog.slug}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Status
                </dt>
                <dd className="text-base">
                  {getStatusBadge(blog.is_published)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Content */}
        <div className="border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Content</h2>
          </div>
          <div className="p-6">
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="mt-6 text-right">
        <p className="text-xs text-gray-400">Post ID: {id}</p>
      </div>
    </div>
  );
}
