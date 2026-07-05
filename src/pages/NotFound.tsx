import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Compass, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-emerald-100 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 right-10 w-12 h-12 bg-cyan-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 py-20">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full blur-lg opacity-40 scale-110"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full mx-auto shadow-xl border-4 border-white ring-4 ring-teal-100">
              <Compass size={40} className="text-teal-600" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            404
          </h1>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl text-gray-800 font-semibold">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back on track.
            </p>
            <p className="text-sm text-gray-500">
              Requested path:{" "}
              <code className="px-2 py-1 bg-white rounded-md border border-teal-100 text-teal-700 font-mono break-all">
                {location.pathname}
              </code>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 inline-flex items-center gap-2 justify-center"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-600 hover:to-cyan-600 hover:text-white hover:border-transparent transition-all duration-200 inline-flex items-center gap-2 justify-center"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          {/* Help note */}
          <p className="text-sm text-gray-500 pt-4">
            Think this is a mistake?{" "}
            <a
              href="mailto:shoaibrayeen.me@gmail.com"
              className="inline-flex items-center gap-1 text-teal-600 font-medium hover:text-teal-700 hover:underline"
            >
              <Mail size={14} />
              Let me know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
