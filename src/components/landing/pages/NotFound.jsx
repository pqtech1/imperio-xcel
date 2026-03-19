import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 relative"
      style={{
        backgroundImage: `url('not-found-bg.avif')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="max-w-md w-full text-center relative z-10">
        {/* 404 Text */}
        <div className="mb-6">
          <div className="text-9xl font-bold text-white/50 select-none">
            404
          </div>
         
        </div>

        {/* Message */}
        <h1 className="text-3xl font-semibold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-white/80 text-base mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Single Home Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="h-12 px-8 bg-white text-gray-900 hover:bg-white/90 text-base gap-2 rounded-none font-medium"
          >
            <Home size={18} />
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
