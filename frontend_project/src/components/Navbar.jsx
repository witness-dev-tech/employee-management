import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CircleDollarSign, 
  FilePieChart, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  ChevronDown
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Safe Parsing logic to prevent "undefined" JSON error
  const getAuthUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (error) {
      return null;
    }
  };

  const user = getAuthUser() || { name: "Admin User", role: "Manager" };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Employee", path: "/employee", icon: Users },
    { name: "Department", path: "/department", icon: Building2 },
    { name: "Salary", path: "/salary", icon: CircleDollarSign },
    { name: "Report", path: "/report", icon: FilePieChart },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* ── LEFT: LOGO SECTION ── */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-all duration-300 group-hover:rotate-3">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl text-slate-900 font-bold tracking-tight">EPMS</span>
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.15em] uppercase leading-none">Smartpack</span>
              </div>
            </Link>
          </div>

          {/* ── MIDDLE: DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    active 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: USER ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                  <UserIcon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{user.role}</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 animate-in fade-in zoom-in duration-200">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 text-slate-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE NAV MENU ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${
                  isActive(link.path) ? "bg-blue-600 text-white" : "text-slate-600 bg-slate-50"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;