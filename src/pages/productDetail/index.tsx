import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import type { Producto } from '../../services/ecommerce/productos.services';
import { productosService } from '../../services/ecommerce/productos.services';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const productosData = await productosService.obtenerProductos();
        const foundProducto = productosData?.find(p => p.id === Number(id));
        setProducto(foundProducto || null);
      } catch (error) {
        console.error('Error al obtener producto:', error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddCart = () => {
    if (producto) {
      console.log(`Agregado ${quantity} de: ${producto.nombre}`);
      // Aquí puedes implementar la lógica de carrito
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(producto?.stock || 1, Number(e.target.value)));
    setQuantity(value);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Producto no encontrado</h4>
          <p>El producto que buscas no existe.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Botón de volver */}
      <div className="mb-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>

      {/* Detalle del producto */}
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6 mb-4">
          <div style={{ height: '400px', overflow: 'hidden', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            {!imageError && producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                onError={handleImageError}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <span className="text-muted">Sin imagen disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          {/* Categoría y stock */}
          <div className="mb-3">
            <span className="badge bg-info text-capitalize me-2">{producto.categoria || 'Sin categoría'}</span>
            <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'}
            </span>
          </div>

          {/* Nombre */}
          <h1 className="mb-2">{producto.nombre}</h1>

          {/* Descripción */}
          <p className="text-muted mb-4">{producto.descripcion}</p>

          {/* Precio */}
          <h3 className="text-primary mb-4">${producto.precio.toFixed(2)}</h3>

          {/* Información adicional */}
          <div className="mb-4">
            <h5>Detalles del producto:</h5>
            <ul className="list-unstyled">
              <li><strong>ID:</strong> {producto.id}</li>
              <li><strong>Categoría:</strong> {producto.categoria}</li>
              <li><strong>Precio:</strong> ${producto.precio.toFixed(2)}</li>
              <li><strong>Stock disponible:</strong> {producto.stock} unidades</li>
              {producto.rating && <li><strong>Calificación:</strong> {producto.rating} ⭐</li>}
            </ul>
          </div>

          {/* Cantidad */}
          {producto.stock > 0 && (
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label">Cantidad:</label>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  style={{ maxWidth: '100px' }}
                  min="1"
                  max={producto.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <span className="text-muted align-self-center">de {producto.stock} disponibles</span>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="d-flex gap-3">
            <button
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={handleAddCart}
              disabled={producto.stock === 0}
            >
              {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
