import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  LayoutDashboard 
} from "lucide-react";
import api from "./api/api"; // Ensure this path matches your folder structure

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to backend
      const response = await api.post("/login", formData);

      if (response.data.token) {
        // Store the JWT token for future requests
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect to Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle the 500 or 401 errors from backend
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100">
      
      {/* ── LEFT: BRAND PANEL ── */}
      <aside className="hidden lg:flex lg:w-1/2 relative bg-slate-950 flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b_0%,#020617_100%)]" />
        
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
              <span className="text-blue-400 text-[11px] font-bold tracking-[0.25em] uppercase">Get Access</span>
            </div>
            <h1 className="font-serif text-7xl text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Employee Payroll <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Management</span> <br />
              System.
            </h1>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: FORM PANEL ── */}
      <main className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50/30 px-8 py-12">
        <div className="w-full max-w-[420px] space-y-8">
          
          <div className="space-y-3">
            <h2 className="font-serif text-4xl text-slate-900 tracking-tight">Login</h2>
            <p className="text-slate-500 text-sm">Sign in to your payroll dashboard.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-pulse">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Username</label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focused === "user" ? "text-blue-600" : "text-slate-400"}`}>
                  <User size={19} />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  onFocus={() => setFocused("user")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2.5">
              <div className="flex justify-between px-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Password</label>
              </div>
              <div className="relative">
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

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-blue-600/20 group disabled:opacity-70"
              >
                {loading ? "Authenticating..." : "Sign In"}
                {!loading && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          </form>

          {/* Register Redirect */}
          <div className="pt-4 flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">New to Smartpack?</span>
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;