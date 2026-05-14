-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2026 at 07:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epms`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `DepartmentCode` varchar(10) NOT NULL,
  `DepartmentName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`DepartmentCode`, `DepartmentName`) VALUES
('ADMS', 'Administration Staff'),
('csh', 'carwash'),
('CW', 'Carwash'),
('MC', 'Mechanic'),
('ST', 'Stock');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeNumber` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Position` varchar(50) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `DepartmentCode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeNumber`, `FirstName`, `LastName`, `Position`, `Address`, `Telephone`, `Gender`, `hiredDate`, `DepartmentCode`) VALUES
(101, 'John', 'Doe', 'Cleaner', 'Kigali', '0788000001', 'Male', '2023-01-10', 'CW'),
(102, 'Alice', 'Smith', 'Store Keeper', 'Musanze', '0788000002', 'Female', '2023-03-12', 'ST'),
(103, 'David', 'Mike', 'Technician', 'Huye', '0788000003', 'Male', '2022-06-15', 'MC'),
(104, 'Grace', 'Uwase', 'Manager', 'Rubavu', '0788000004', 'Female', '2021-08-20', 'ADMS'),
(105, 'fabrice', 'witness', 'manager', 'kigali', '+250789344402', 'Male', '2026-05-29', 'csh');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `SalaryID` int(11) NOT NULL,
  `GrossSalary` decimal(10,2) NOT NULL,
  `TotalDeduction` decimal(10,2) NOT NULL,
  `NetSalary` decimal(10,2) NOT NULL,
  `Month` varchar(20) DEFAULT NULL,
  `employeeNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`SalaryID`, `GrossSalary`, `TotalDeduction`, `NetSalary`, `Month`, `employeeNumber`) VALUES
(4, 600000.00, 70000.00, 530000.00, '2026-06', 104),
(21, 29000.00, 10900.00, 18100.00, '2026-07', 104);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`) VALUES
(1, 'witbri', '$2b$10$SdLBw/1bzstAIz5kX4DkqefMhEtAFIPtQpaCI3.sndg5czsN38N0K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`DepartmentCode`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeNumber`),
  ADD KEY `DepartmentCode` (`DepartmentCode`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`SalaryID`),
  ADD KEY `employeeNumber` (`employeeNumber`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `SalaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`DepartmentCode`) REFERENCES `department` (`DepartmentCode`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`employeeNumber`) REFERENCES `employee` (`employeeNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
