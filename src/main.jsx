import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <>
    <HelmetProvider>
      <TooltipProvider delayDuration={200}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#fff",
            },
          }}
        />
      </TooltipProvider>
    </HelmetProvider>
  </>,
);
