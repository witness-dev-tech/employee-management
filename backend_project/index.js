const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

/* =====================================
   DATABASE CONNECTION
===================================== */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "EPMS"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed");
    } else {
        console.log("✅ Database connected");
    }
});

/* =====================================
   JWT SECRET
===================================== */
const SECRET_KEY = "epms_secret_key";

/* =====================================
   TOKEN MIDDLEWARE
===================================== */
function verifyToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
}

/* =====================================
   AUTH: REGISTER
===================================== */
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user(username, password) VALUES(?, ?)";

    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error("DATABASE ERROR:", err); // This prints the real error to your terminal
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json({ message: "User registered successfully" });
    });
});
/* =====================================
   AUTH: LOGIN
===================================== */
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM user WHERE username = ?";

    db.query(sql, [username], async (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });

    });

});

/* =====================================
   DEPARTMENT INSERT
===================================== */
app.post("/department", verifyToken, (req, res) => {

    const { DepartmentCode, DepartmentName } = req.body;

    const sql = `
        INSERT INTO Department(DepartmentCode, DepartmentName)
        VALUES (?, ?)
    `;

    db.query(sql, [DepartmentCode, DepartmentName], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Department added successfully" });

    });

});

/* EMPLOYEE INSERT (Optimized)
===================================== */
app.post("/employee", verifyToken, (req, res) => {
    // We exclude employeeID because it is AUTO_INCREMENT in the DB
    const {
        FirstName,
        LastName,
        Position,
        Address,
        Telephone,
        Gender,
        hiredDate,
        DepartmentCode // Used as the Foreign Key link
    } = req.body;

    const sql = `
        INSERT INTO Employee 
        (FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        FirstName, 
        LastName, 
        Position, 
        Address, 
        Telephone, 
        Gender, 
        hiredDate, 
        DepartmentCode
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            
            // Error 1452 is MySQL's code for a Foreign Key constraint failure
            if (err.errno === 1452) {
                return res.status(400).json({ 
                    message: "Selected Department Code does not exist." 
                });
            }
            
            return res.status(500).json({ message: "Internal Server Error" });
        }

        res.json({ 
            message: "Employee added successfully", 
            id: result.insertId // The auto-generated ID from the DB
        });
    });
});
/* =====================================
   SALARY INSERT
===================================== */
app.post("/salary", verifyToken, (req, res) => {
    const {
        GrossSalary,
        TotalDeduction,
        NetSalary,
        Month,
        employeeNumber // Make sure this matches what the frontend sends
    } = req.body;

    // Check if any value is undefined
    if (!employeeNumber || !GrossSalary || !Month) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `
        INSERT INTO Salary 
        (GrossSalary, TotalDeduction, NetSalary, Month, employeeNumber) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [GrossSalary, TotalDeduction, NetSalary, Month, employeeNumber], (err, result) => {
        if (err) {
            // CRITICAL: Look at your Node.js terminal/command prompt 
            // after the 500 error happens to see this log!
            console.error("DEBUG - SQL Error Details:", err.sqlMessage);
            console.error("DEBUG - Full Error Object:", err);
            
            return res.status(500).json({ 
                message: "Database Error", 
                error: err.sqlMessage 
            });
        }
        res.json({ message: "Salary added successfully", id: result.insertId });
    });
});


/* =====================================
   SALARY RETRIEVE
===================================== */
app.get("/salary", verifyToken, (req, res) => {

    db.query("SELECT * FROM Salary", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});

/* =====================================
   SALARY UPDATE
===================================== */
app.put("/salary/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    const {
        GrossSalary,
        TotalDeduction,
        NetSalary,
        Month
    } = req.body;

    const sql = `
        UPDATE Salary
        SET GrossSalary=?, TotalDeduction=?, NetSalary=?, Month=?
        WHERE SalaryID=?
    `;

    db.query(sql, [
        GrossSalary,
        TotalDeduction,
        NetSalary,
        Month,
        id
    ], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Salary updated successfully" });

    });

});

/* =====================================
   SALARY DELETE
===================================== */
app.delete("/salary/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM Salary WHERE SalaryID=?", [id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Salary deleted successfully" });

    });

});

/* =====================================
   MONTHLY PAYROLL REPORT
===================================== */
app.get("/payroll/:month", verifyToken, (req, res) => {

    const month = req.params.month;

    const sql = `
        SELECT 
            e.FirstName,
            e.LastName,
            e.Position,
            d.DepartmentName,
            s.Month,
            s.NetSalary
        FROM Employee e
        JOIN Department d 
            ON e.DepartmentCode = d.DepartmentCode
        JOIN Salary s 
            ON e.employeeNumber = s.employeeNumber
        WHERE s.Month = ?
    `;

    db.query(sql, [month], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json({
            month,
            payroll: result
        });

    });

});

/* =====================================
   SERVER START
===================================== */
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});