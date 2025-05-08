const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Botón para abrir/cerrar Sidebar */}
        <button
          className="btn btn-outline-light me-3"
          onClick={onToggleSidebar}
        >
          ☰
        </button>

        {/* Título alineado a la izquierda */}
        <a className="navbar-brand" href="/">
        &Oacute;rdenes de Trabajo MTX
        </a>
      </div>
    </nav>
  );
  /* return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <button
          className="btn btn-outline-light me-2"
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <a className="navbar-brand" href="#">
          &Oacute;rdenes de Trabajo MTX
        </a>
      </div>
    </nav>
  ); */
};

export default Navbar;