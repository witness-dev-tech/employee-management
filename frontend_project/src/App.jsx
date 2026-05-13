import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Department from "./components/Department";
import Salary from "./components/Salary";
import Report from "./components/Report";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── PUBLIC ROUTES (No Navbar) ── */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── PROTECTED ROUTES (With Navbar) ── */}
        <Route element={<ProtectedRoute />}>
          {/* This Route acts as a Wrapper for the Navbar + Content */}
          <Route
            element={
              <div className="min-h-screen bg-slate-50/50">
                <Navbar /> 
                {/* The main content area where pages will swap out */}
                <main className="max-w-7xl mx-auto px-4 py-8">
                   <Outlet /> {/* This is required to render the child routes */}
                </main>
              </div>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/report" element={<Report />} />
          </Route>
        </Route>

        {/* ── CATCH ALL ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;