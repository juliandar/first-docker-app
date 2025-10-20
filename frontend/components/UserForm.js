// import { useState, useEffect } from "react";

// export default function UserForm() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     birth_date: "",
//     salary: "",
//     is_active: true,
//     department_id: 1,
//   });

//   const fetchUsers = async () => {
//     const res = await fetch("/api/users");
//     setUsers(await res.json());
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch("/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     setForm({ name: "", email: "", birth_date: "", salary: "", is_active: true, department_id: 1 });
//     fetchUsers();
//   };

//   const handleDelete = async (id) => {
//     await fetch(`/api/users?employeeId=${id}`, { method: "DELETE" });
//     fetchUsers();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Gestión de Empleados</h1>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//         <input placeholder="Correo" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//         <input type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
//         <input type="number" placeholder="Salario" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
//         <select value={form.department_id} onChange={e => setForm({ ...form, department_id: e.target.value })}>
//           <option value="1">IT</option>
//           <option value="2">HR</option>
//           <option value="3">Finance</option>
//         </select>
//         <label>
//           Activo:
//           <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
//         </label>
//         <button type="submit">Guardar</button>
//       </form>

//       <h2>Lista de empleados</h2>
//       <ul>
//         {users.map(u => (
//           <li key={u.id}>
//             {u.name} - {u.email} - {u.salary} - {u.is_active ? "Activo" : "Inactivo"}
//             <button onClick={() => handleDelete(u.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchUsers();
    setForm({
      name: "",
      email: "",
      birth_date: "",
      salary: "",
      is_active: true,
      department_id: 1,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users?employeeId=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 tracking-tight">
          Gestión de Empleados
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="date"
            value={form.birth_date}
            onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="number"
            placeholder="Salario"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <select
            value={form.department_id}
            onChange={(e) => setForm({ ...form, department_id: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="1">IT</option>
            <option value="2">HR</option>
            <option value="3">Finance</option>
          </select>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
            <label className="text-sm font-medium">Activo</label>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
              className="accent-black w-4 h-4"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-900 transition"
          >
            Guardar Empleado
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">
          Lista de Empleados
        </h2>

        <ul className="divide-y divide-gray-200">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="font-medium">{u.name}</span>
                <span className="text-sm text-gray-600">{u.email}</span>
                <span className="text-sm text-gray-500">
                  {u.is_active ? "Activo" : "Inactivo"} — {u.salary} USD
                </span>
              </div>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-sm text-white bg-black px-3 py-1 rounded-lg hover:bg-gray-800 transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
