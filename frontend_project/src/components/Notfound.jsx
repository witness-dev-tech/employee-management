import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, LayoutDashboard } from "lucide-react";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex items-center justify-center p-6">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-slate-50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
        {/* Logo / Brand Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center shadow-xl shadow-slate-900/20">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <p className="text-slate-900 font-bold text-xs tracking-[0.3em] uppercase">EPMS</p>
        </div>

        {/* 404 Visual */}
        <div className="relative inline-block">
          <h1 className="font-serif text-[12rem] md:text-[16rem] leading-none text-slate-900 opacity-[0.03] select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900">Lost in Space</h2>
            <p className="text-slate-500 max-w-xs mx-auto">
              The page you are looking for has been moved, deleted, or never existed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-xs text-slate-400 uppercase tracking-widest pt-8">
          Smartpack - Rubavu EPMS Support
        </p>
      </div>
    </div>
  );
};

export default Notfound;