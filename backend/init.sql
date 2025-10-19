CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  birth_date DATE,
  salary DECIMAL(10,2),
  is_active BOOLEAN,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Insertar datos iniciales
INSERT INTO departments (name) VALUES ('IT'), ('HR'), ('Finance');

INSERT INTO employees (name, email, birth_date, salary, is_active, department_id)
VALUES
('Carlos Pérez', 'carlos@empresa.com', '1990-05-12', 3500.00, TRUE, 1),
('Ana Gómez', 'ana@empresa.com', '1988-07-20', 4200.00, TRUE, 2);
