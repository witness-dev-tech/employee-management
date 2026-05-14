import React, { useState } from "react";
import { FileText, Download, Search, Printer, AlertCircle, Loader2 } from "lucide-react";
import api from "./api/api";

function Report() {
  const [month, setMonth] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    if (!month) return setError("Please select a month first");
    
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/payroll/${month}`);
      setReportData(res.data.payroll);
      if (res.data.payroll.length === 0) {
        setError("No payroll records found for this month.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch report. Ensure the month format is YYYY-MM.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header - Hidden on Print */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Payroll Report</h1>
          <p className="text-slate-500">Generate and review monthly financial summaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="month" 
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white shadow-sm"
          />
          <button 
            onClick={fetchReport}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Search size={18}/>}
            Generate
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-2 animate-shake print:hidden">
          <AlertCircle size={18} />
          <span className="text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Report Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Table Header / Branding for Print */}
        <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Smartpack - Rubavu</h2>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">
              Monthly Payroll: {month || "---"}
            </p>
          </div>
          <button 
            onClick={handlePrint}
            className="p-3 bg-white border rounded-xl hover:bg-slate-50 transition-all text-slate-600 print:hidden"
            title="Print Report"
          >
            <Printer size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Employee Name</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Position</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Net Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-800">{row.FirstName} {row.LastName}</div>
                  </td>
                  <td className="p-5 text-sm text-slate-600">{row.Position}</td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase">
                      {row.DepartmentName}
                    </span>
                  </td>
                  <td className="p-5 text-right font-mono font-bold text-emerald-600">
                    RWF {Number(row.NetSalary).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            {reportData.length > 0 && (
              <tfoot className="bg-slate-900 text-white">
                <tr>
                  <td colSpan="3" className="p-5 font-bold text-right uppercase text-xs tracking-widest">Grand Total</td>
                  <td className="p-5 text-right font-mono font-bold text-lg">
                    RWF {reportData.reduce((acc, curr) => acc + Number(curr.NetSalary), 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          
          {reportData.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
              <FileText size={48} className="opacity-20" />
              <p>Select a month and click generate to view data.</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer for Print */}
      <div className="hidden print:block mt-12 border-t pt-8">
        <div className="flex justify-between">
          <div className="text-center">
            <div className="w-40 border-b border-slate-950 mb-2"></div>
            <p className="text-xs font-bold uppercase">Prepared By (HR)</p>
          </div>
          <div className="text-center">
            <div className="w-40 border-b border-slate-950 mb-2"></div>
            <p className="text-xs font-bold uppercase">Approved By (Manager)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;