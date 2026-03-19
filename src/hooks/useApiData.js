import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export const useApiData = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(endpoint);
        setData(res.data.data || res.data);
        setError(null);
      } catch (err) {
        setError(err);
        toast.error(`Failed to fetch data from ${endpoint}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export const useServices = () => useApiData("/services");
export const useAreas = () => useApiData("/areas");
export const useProjects = () => useApiData("/projects");
export const useTeams = () => useApiData("/teams");
export const useClients = () => useApiData("/clients");
export const useTestimonials = () => useApiData("/testimonials");
export const useBlogs = () => useApiData("/blogs?is_published=1");
export const useFAQs = () => useApiData("/faqs");
export const useAchievements = () => useApiData("/achievements");
