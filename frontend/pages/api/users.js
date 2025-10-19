import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const [rows] = await pool.query('SELECT * FROM employees');
      res.status(200).json(rows);
      break;

    case 'POST':
      const { name, email, birth_date, salary, is_active, department_id } = req.body;
      await pool.query(
        'INSERT INTO employees (name, email, birth_date, salary, is_active, department_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, birth_date, salary, is_active, department_id]
      );
      res.status(201).json({ message: 'Empleado creado' });
      break;

    case 'PUT':
      const { id, ...data } = req.body;
      await pool.query(
        'UPDATE employees SET name=?, email=?, birth_date=?, salary=?, is_active=?, department_id=? WHERE id=?',
        [data.name, data.email, data.birth_date, data.salary, data.is_active, data.department_id, id]
      );
      res.status(200).json({ message: 'Empleado actualizado' });
      break;

    case 'DELETE':
      const { employeeId } = req.query;
      await pool.query('DELETE FROM employees WHERE id=?', [employeeId]);
      res.status(200).json({ message: 'Empleado eliminado' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
