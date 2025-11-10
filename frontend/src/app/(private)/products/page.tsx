// en frontend/src/app/(private)/products/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SpinnerMini from "@/src/components/SpinnerMini";

// Definimos la "forma" de nuestros datos de Producto
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

// Definimos cuántos items mostrar por página
const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  // Estados para el feedback visual
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);

  //  Estado para la Búsqueda
  const [query, setQuery] = useState("");

  // Consumir el endpoint cuando el componente carga
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }
        const data: Product[] = await response.json();
        setProducts(data); // <-- Guarda la lista de productos
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  // Lógica de Búsqueda
  //  Filtramos los productos basándonos en el 'query'
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  // Lógica de Paginación
  // Calculamos las páginas basándonos en los productos filtrados
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // "Rebanamos" los productos filtrados para la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Funciones para manejar los clics de los botones
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  //  Función para manejar la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1); // <-- Resetea a la página 1 en cada búsqueda
  };


  // Mostrar loaders o mensajes de error
  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <SpinnerMini />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  // Mostrar datos en la tabla
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Link 
          href="/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Crear Producto
        </Link>
      </div>

      {/*  Barra de Búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos por título..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          value={query}
          onChange={handleSearchChange}
        />
      </div>

      {/* Mensaje de vacío (ahora revisa 'filteredProducts') */}
      {filteredProducts.length === 0 && !loading ? (
        <p>No se encontraron productos{query && ` que coincidan con "${query}"`}.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Imagen</th>
                  <th scope="col" className="px-6 py-3">Título</th>
                  <th scope="col" className="px-6 py-3">Categoría</th>
                  <th scope="col" className="px-6 py-3">Precio</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapea sobre 'currentProducts' (los productos ya filtrados y paginados) */}
                {currentProducts.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-16 h-16 object-contain" 
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-6 py-4">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      ${product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de Paginación (ahora se basan en 'filteredProducts') */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-700">
              Mostrando {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
            </span>
            <div className="flex gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}