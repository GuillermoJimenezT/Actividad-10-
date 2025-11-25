
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen?: string;
    categoria?: string;
}

// Interface para la respuesta de DummyJSON
interface DummyJsonProducto {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail?: string;
  image?: string;
  category?: string;
}

interface DummyJsonResponse {
  products: DummyJsonProducto[];
  total: number;
  skip: number;
  limit: number;
}

// Función auxiliar para mapear productos de DummyJSON a nuestro formato
const mapearProducto = (producto: DummyJsonProducto): Producto => {
  return {
    id: producto.id,
    nombre: producto.title,
    descripcion: producto.description,
    precio: producto.price,
    stock: producto.stock,
    imagen: producto.thumbnail || producto.image,
    categoria: producto.category,
  };
};

// Servicio de productos
export const productosService = {
  // Obtener todos los productos
  obtenerProductos: async (): Promise<Producto[]> => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error('Error al obtener productos');
      const data: DummyJsonResponse = await response.json();
      return data.products.map(mapearProducto);
    } catch (error) {
      console.error('Error en obtenerProductos:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  obtenerProductoPorId: async (id: number): Promise<Producto> => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      const data: DummyJsonProducto = await response.json();
      return mapearProducto(data);
    } catch (error) {
      console.error('Error en obtenerProductoPorId:', error);
      throw error;
    }
  },

};
