export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4">
            <h5>Sobre Nosotros</h5>
            <p>TechShop es tu tienda online de confianza para productos de tecnología de calidad.</p>
          </div>
          <div className="col-md-4">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Inicio</a></li>
              <li><a href="/productos" className="text-decoration-none text-light">Productos</a></li>
              <li><a href="/contacto" className="text-decoration-none text-light">Contacto</a></li>
              <li><a href="/terminos" className="text-decoration-none text-light">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <p>
              Email: info@techshop.com<br />
              Teléfono: +1 (555) 123-4567<br />
              Dirección: 123 Tech Street, Tech City
            </p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center">
          <p className="mb-0">&copy; {currentYear} TechShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
