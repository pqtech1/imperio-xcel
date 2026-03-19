import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", form);

      // saving token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-900 h-full">
        <img
          src="login-banner.avif"
          alt="login"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <h1 className="text-4xl font-light mb-2 text-white">Welcome Back</h1>
          <p className="text-gray-200 text-sm">
            Sign in to access your admin dashboard
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          {/* LOGO */}
          <div className="mb-8 text-center">
            <img
              src="interio-xcel-logo.png"
              alt="logo"
              className="h-12 mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-900">
              Admin Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-11 px-4 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0 rounded-none w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gray-900 text-white hover:bg-gray-800 text-base font-medium rounded-none mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer with credit */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              © {currentYear} InterioXcel.
              <br className="hidden sm:inline" />
              Design & Developed by{" "}
              <a
                href="https://positivequadrant.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-700 transition-colors"
              >
                Positive Quadrant Technologies LLP
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
