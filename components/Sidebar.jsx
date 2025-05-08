import { useState } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isVisible, menuItems }) => {
  const [openSections, setOpenSections] = useState({}); // Estado para el acordeón
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función logout del contexto
      router.push("/login"); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  // Maneja abrir/cerrar secciones
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  //menuItems contiene los accesos que podrá ver el usuario
  return (
    <div className={`sidebar bg-dark text-white ${isVisible ? 'show' : 'hide'}`}>
      <div className="accordion" id="menuAccordion">
        {menuItems.map((section, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
                aria-expanded="true"
                aria-controls={`collapse-${index}`}
              >
                <i className={section.icon} style={{ marginRight: "10px" }}></i>
                {section.name}
              </button>
            </h2>
            <div
              id={`collapse-${index}`}
              className="accordion-collapse collapse show" // Agrega 'show' para que estén abiertos por defecto
              aria-labelledby={`heading-${index}`}
              /* data-bs-parent="#menuAccordion" */
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  {section.items.map((item, idx) => (
                    <li className="list-group-item bg-dark text-white" key={idx}>
                      <a href={item.href} className="text-white text-decoration-none">
                        <i
                          className={`${item.icon}`}
                          style={{ marginRight: "10px" }}
                        ></i>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Sección de usuario */}
      <div className="user-section">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          <span>{user.uname}</span>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <i className="fas fa-user-cog"></i>
            <span>Panel de Usuario</span>
          </li>
          <li className="list-group-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;