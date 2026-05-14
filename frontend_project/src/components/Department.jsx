import React, { useState } from "react";
import { Building2, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import api from "./api/api"; 

function Department() {
  const [formData, setFormData] = useState({
    DepartmentCode: "",
    DepartmentName: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post("/department", formData);
      setMessage({ type: "success", text: response.data.message });
      setFormData({ DepartmentCode: "", DepartmentName: "" }); 
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to add department" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* ── HEADER (Centered) ── */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/20">
          <Building2 className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="font-serif text-4xl text-slate-900 tracking-tight">Departments</h1>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Manage organization structure and administrative units.
          </p>
        </div>
      </div>

      {/* ── FORM CONTAINER (Centered) ── */}
      <div className="flex justify-center items-start px-4">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
            <h2 className="font-bold text-slate-900 mb-8 flex items-center justify-center gap-2 text-xl">
              <Plus size={22} className="text-blue-600" />
              Add New Department
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Code */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
                  Department Code
                </label>
                <input
                  name="DepartmentCode"
                  type="text"
                  required
                  value={formData.DepartmentCode}
                  onChange={handleChange}
                  placeholder="e.g. FIN-01"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-sm bg-slate-50/30"
                />
              </div>

              {/* Department Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
                  Department Name
                </label>
                <input
                  name="DepartmentName"
                  type="text"
                  required
                  value={formData.DepartmentName}
                  onChange={handleChange}
                  placeholder="e.g. Finance & Accounts"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-sm bg-slate-50/30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 rounded-2xl bg-slate-950 hover:bg-blue-600 text-white font-bold text-[15px] transition-all duration-300 disabled:opacity-50 shadow-lg shadow-slate-950/10 flex items-center justify-center gap-2"
              >
                {loading ? (
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                {loading ? "Processing..." : "Register Department"}
              </button>
            </form>

            {/* Status Messages */}
            {message.text && (
              <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in zoom-in duration-300 ${
                message.type === "success" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;