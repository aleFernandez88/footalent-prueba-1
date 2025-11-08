// 1. Convertimos este componente en un "Componente de Cliente"
// Esto nos permite usar 'useState' y 'useEffect' para el fetch.
"use client";

// 2. Importamos los "Hooks" de React que necesitamos
import { useState, useEffect } from "react";


interface User {
  id: number;
  name: string;
  email: string;
}


export default function UserList() {// 3.  nuevo componente
  
  //  'useState' para guardar nuestros 3 estados clave:
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);


  // 'useEffect' ejecuta esto UNA SOLA VEZ cuando el componente se carga
  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        // 1. INTENTAR: Ir a buscar los datos de la API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Falló la carga de datos');
        }
        
        // 2. Convertir la respuesta a JSON
        const data: User[] = await response.json();
        
        // 3. caso de exito Guardar los datos
        setUsers(data);

      } catch (err: any) {
        // 4. caso de error Guardar el mensaje de error
        setError(err.message);

      } finally {
        // 5.  Dejar de cargar
        setLoading(false);
      }
    };

    fetchUsers();

  }, []); // "correr solo una vez"

  // ==========================================================
  // RENDERIZAR LOS DATOS 
  // ==========================================================

 
  if (loading) { // Estado 1: Cargando...
    return <p className="mt-5">Cargando usuarios...</p>;
  }


  if (error) {  // Estado 2: Error
    return <p className="mt-5 text-red-500">Error: {error}</p>;
  }
  
  
  if (users.length === 0) {// Estado 3: Éxito (pero "empty")
    return <p className="mt-5">No se encontraron usuarios.</p>;
  }

 // Estado 4: Éxito
  return (
    <div className="mt-5 text-left w-full max-w-lg"> {/* <-- CAMBIO PRINCIPAL */}
      <h2 className="text-xl font-semibold mb-2">Lista de Usuarios (desde API)</h2> {/* (Añadí un estilo al h2 también) */}
      <ul>
        {users.map(user => (
          <li key={user.id} className="border-b border-gray-200 py-2"> {/* (Añadí estilos a la lista para que se vea mejor) */}
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}