import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* Decorative Brand Icon */}
      <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6 animate-bounce">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30" />
      </div>

      {/* Main Message */}
      <h1 className="font-serif text-5xl md:text-6xl text-slate-900 tracking-tight leading-tight">
        Welcome to the <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          Employee Payroll Management
        </span>
      </h1>
      
      <p className="mt-6 text-slate-500 text-lg font-medium tracking-wide uppercase">
        Smartpack - Rubavu Portal
      </p>

      {/* Subtle Bottom Accent */}
      <div className="mt-10 w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-blue-600 rounded-full" />
      </div>
    </div>
  );
}

export default Dashboard;