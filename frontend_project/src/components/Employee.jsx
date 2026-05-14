import React, { useState } from "react";
import { UserPlus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import api from "./api/api"; 

function Employee() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    hiredDate: "",
    DepartmentCode: "", // User will now type this manually
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
      const response = await api.post("/employee", formData);
      setMessage({ type: "success", text: response.data.message });
      
      // Reset form
      setFormData({
        FirstName: "", LastName: "", Position: "", Address: "",
        Telephone: "", Gender: "", hiredDate: "", DepartmentCode: ""
      });
    } catch (err) {
      // If the code doesn't exist in the Department table, this catches the error
      const errorMsg = err.response?.data?.message || "Check if Department Code exists";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
          <UserPlus className="text-white w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-slate-900 font-bold tracking-tight">Add New Employee</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input fields as before... */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">First Name</label>
              <input name="FirstName" required value={formData.FirstName} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
              <input name="LastName" required value={formData.LastName} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm" />
            </div>

            {/* --- UPDATED: MANUAL DEPARTMENT CODE INPUT --- */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-blue-600 uppercase tracking-wider ml-1">Department Code</label>
              <input 
                name="DepartmentCode" 
                required 
                value={formData.DepartmentCode} 
                onChange={handleChange}
                placeholder="e.g., FIN, HR, IT"
                className="w-full px-4 py-3.5 rounded-2xl border border-blue-100 bg-blue-50/30 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Position</label>
              <input name="Position" required value={formData.Position} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Gender</label>
              <select name="Gender" required value={formData.Gender} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm bg-white cursor-pointer">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Hired Date</label>
              <input type="date" name="hiredDate" required value={formData.hiredDate} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm" />
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Telephone</label>
              <input name="Telephone" required value={formData.Telephone} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Address</label>
              <textarea name="Address" required value={formData.Address} onChange={handleChange} rows="2" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-blue-600 text-white font-bold transition-all duration-300 flex justify-center items-center gap-3">
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? "Saving..." : "Add Employee"}
          </button>
        </form>

        {message.text && (
          <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in zoom-in ${
            message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;