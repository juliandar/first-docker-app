import { useState, useEffect } from "react";

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    birth_date: "",
    salary: "",
    is_active: true,
    department_id: 1,
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", birth_date: "", salary: "", is_active: true, department_id: 1 });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users?employeeId=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Empleados</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Correo" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
        <input type="number" placeholder="Salario" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
        <select value={form.department_id} onChange={e => setForm({ ...form, department_id: e.target.value })}>
          <option value="1">IT</option>
          <option value="2">HR</option>
          <option value="3">Finance</option>
        </select>
        <label>
          Activo:
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
        </label>
        <button type="submit">Guardar</button>
      </form>

      <h2>Lista de empleados</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} - {u.email} - {u.salary} - {u.is_active ? "Activo" : "Inactivo"}
            <button onClick={() => handleDelete(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
