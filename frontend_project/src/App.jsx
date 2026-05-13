import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employee from "./components/Employee";
import Department from "./components/Department";
import Salary from "./components/Salary";
import Report from "./components/Report";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/department" element={<Department />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/report" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 