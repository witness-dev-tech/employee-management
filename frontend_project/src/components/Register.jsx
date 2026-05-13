import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  UserPlus, 
  LayoutDashboard,
  ShieldCheck // Icon for confirm password
} from "lucide-react";
import api from "./api/api"; // Assuming your axios instance is in api.js

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      // 2. API Call
      const response = await api.post("/register", {
        username: formData.username,
        password: formData.password
      });

      if (response.data.message) {
        alert("Registration Successful!");
        navigate("/"); // Redirect to login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100">
      
      {/* ── LEFT: BRAND PANEL (Unchanged) ── */}
      <aside className="hidden lg:flex lg:w-1/2 relative bg-slate-950 flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b_0%,#020617_100%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="relative z-10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-blue-400/20">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-[0.3em] uppercase">EPMS</p>
            <p className="text-slate-500 text-[10px] tracking-widest uppercase mt-0.5">Smartpack - Rubavu</p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="w-10 h-[2px] bg-blue-500" />
              <span className="text-blue-400 text-[11px] font-bold tracking-[0.25em] uppercase">Human Resource</span>
            </div>
            <h1 className="font-serif text-7xl text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Employee Payroll <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Management</span> <br />
              System
            </h1>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: FORM PANEL ── */}
      <main className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50/30 px-8 py-12">
        <div className="w-full max-w-[420px] space-y-8">
          
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-serif text-4xl text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 text-sm">Join the Smartpack ecosystem today.</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-bounce">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Username</label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focused === "user" ? "text-blue-600" : "text-slate-400"}`}>
                  <User size={19} />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. admin_pro"
                  onFocus={() => setFocused("user")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Password</label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focused === "pass" ? "text-blue-600" : "text-slate-400"}`}>
                  <Lock size={19} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  onFocus={() => setFocused("pass")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Confirm Password</label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focused === "confirm" ? "text-blue-600" : "text-slate-400"}`}>
                  <ShieldCheck size={19} />
                </div>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused("")}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-white text-slate-900 focus:outline-none focus:ring-4 transition-all shadow-sm ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? "border-red-300 focus:ring-red-500/10 focus:border-red-500" 
                    : "border-slate-200 focus:ring-blue-500/10 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200">
              <button 
                type="submit" 
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-blue-600/20 group"
              >
                Create Account
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="pt-4 flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">Already have an account?</span>
            <Link to="/" className="text-blue-600 font-bold hover:underline">Log in</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;