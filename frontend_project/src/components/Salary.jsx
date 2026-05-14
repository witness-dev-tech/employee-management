import React, { useState, useEffect } from "react";
import { Banknote, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import api from "./api/api";

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState({
    employeeNumber: "", // Ensure this matches your DB column name
    GrossSalary: "",
    TotalDeduction: "",
    NetSalary: 0,
    Month: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editId, setEditId] = useState(null);

  // 1. Fetch Salaries from Backend
  const fetchSalaries = async () => {
    try {
      const res = await api.get("/salary");
      setSalaries(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // 2. Auto-calculate Net Salary whenever Gross or Deduction changes
  useEffect(() => {
    const gross = parseFloat(formData.GrossSalary) || 0;
    const ded = parseFloat(formData.TotalDeduction) || 0;
    setFormData(prev => ({ ...prev, NetSalary: gross - ded }));
  }, [formData.GrossSalary, formData.TotalDeduction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Data (Fixes the 500 Error by formatting types)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Format data to ensure numbers are sent correctly
    const payload = {
      employeeNumber: formData.employeeNumber,
      GrossSalary: parseFloat(formData.GrossSalary),
      TotalDeduction: parseFloat(formData.TotalDeduction),
      NetSalary: parseFloat(formData.NetSalary),
      Month: formData.Month
    };

    try {
      if (editId) {
        await api.put(`/salary/${editId}`, payload);
        setMessage({ type: "success", text: "Salary record updated!" });
      } else {
        await api.post("/salary", payload);
        setMessage({ type: "success", text: "Salary processed successfully!" });
      }
      
      // Reset Form
      setFormData({ employeeNumber: "", GrossSalary: "", TotalDeduction: "", NetSalary: 0, Month: "" });
      setEditId(null);
      fetchSalaries();
    } catch (err) {
      // Log the specific error to help debug the 500
      console.error("Submission Error:", err.response?.data);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Server Error (500): Check your database columns." 
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (sal) => {
    setEditId(sal.SalaryID);
    setFormData({
      employeeNumber: sal.employeeNumber,
      GrossSalary: sal.GrossSalary,
      TotalDeduction: sal.TotalDeduction,
      NetSalary: sal.NetSalary,
      Month: sal.Month
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payroll record?")) return;
    try {
      await api.delete(`/salary/${id}`);
      fetchSalaries();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete." });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
          <Banknote size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payroll Processing</h1>
          <p className="text-slate-500 text-sm">Manage employee earnings and deductions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-4 space-y-4 bg-white p-6 rounded-3xl border shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
            {editId ? <Edit3 size={18}/> : <Plus size={18}/>} 
            {editId ? "Update Record" : "New Entry"}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Employee Number</label>
              <input name="employeeNumber" required value={formData.employeeNumber} onChange={handleChange} className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none focus:border-emerald-500 transition-all" placeholder="e.g. EMP001" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Gross Salary</label>
                <input name="GrossSalary" type="number" required value={formData.GrossSalary} onChange={handleChange} className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none" placeholder="0.00" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Deductions</label>
                <input name="TotalDeduction" type="number" required value={formData.TotalDeduction} onChange={handleChange} className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none" placeholder="0.00" />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl">
              <span className="text-xs font-bold text-emerald-600 uppercase">Net Pay</span>
              <p className="text-2xl font-black text-emerald-700">RWF {formData.NetSalary.toLocaleString()}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Payroll Month</label>
              <input name="Month" type="month" required value={formData.Month} onChange={handleChange} className="w-full mt-1 p-3 bg-slate-50 border rounded-xl outline-none" />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : null}
            {editId ? "Update Payroll" : "Save Payroll"}
          </button>

          {message.text && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${message.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {message.type === "success" ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
              {message.text}
            </div>
          )}
        </form>

        {/* List Section */}
        <div className="lg:col-span-8 bg-white border rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Emp #</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Month</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Net Salary</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {salaries.map((sal) => (
                <tr key={sal.SalaryID} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{sal.employeeNumber}</td>
                  <td className="p-4 text-slate-500">{sal.Month}</td>
                  <td className="p-4 text-right font-bold text-slate-900">{Number(sal.NetSalary).toLocaleString()}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => startEdit(sal)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18}/></button>
                    <button onClick={() => handleDelete(sal.SalaryID)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {salaries.length === 0 && <p className="p-10 text-center text-slate-400">No payroll records found.</p>}
        </div>
      </div>
    </div>
  );
}

export default Salary;