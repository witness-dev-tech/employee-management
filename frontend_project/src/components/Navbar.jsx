import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>Employee payroll Management System</h1>
            <Link to="/">Employee</Link>
            <Link to="/department">Department</Link>
            <Link to="/salary">Salary</Link>
            <Link to="/report">Report</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
}
export default Navbar;