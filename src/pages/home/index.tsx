import { useState, useEffect } from 'react';
import type { Producto } from '../../services/ecommerce/productos.services';
import ProductCard from '../../components/ProductCard';
import { productosService } from '../../services/ecommerce/productos.services';

const CATEGORIAS = ['smartphones', 'laptops', 'tablets', 'groceries'];

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const productosData = await productosService.obtenerProductos();
        setProductos(productosData || []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="bg-primary text-white p-5 rounded">
            <h1 className="display-4 fw-bold">Bienvenido a DummyShop</h1>
            <p className="lead">Los mejores productos a los mejores precios</p>
            <button className="btn btn-light btn-lg mt-3">Comprar Ahora</button>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <h2 className="mb-4">Categorías</h2>
          <div className="row g-3">
            {CATEGORIAS.map((categoria) => (
              <div key={categoria} className="col-md-3">
                <div className="card text-center cursor-pointer hover-effect">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{categoria}</h5>
                    <p className="card-text">Explora nuestros {categoria}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="row">
        <div className="col-lg-12">
          <h2 className="mb-4">Productos Destacados ({productos.length})</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando productos...</p>
            </div>
          ) : productos.length > 0 ? (
            <div className="row g-4">
              {productos.map((producto: Producto) => (
                <div key={producto.id} className="col-md-6 col-lg-4">
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              No hay productos disponibles en este momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

