import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { roleAccess } from '../config/roleAccess';

const Layout = ({ children, userName = 'Usuario', userRole = 'guest' }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  
  const menuItems = roleAccess[userRole] || [];

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isVisible={isSidebarVisible} menuItems={menuItems}/>

      {/* Contenido principal */}
      <div className="flex-grow-1">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main style={{ marginTop: '56px', padding: '15px' }} className={(isSidebarVisible ? "with-sidebar" : 'without-sidebar')} >{children}</main>
      </div>
    </div>
  );
};

export default Layout;