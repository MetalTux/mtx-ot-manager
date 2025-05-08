import { useState } from 'react';
import Link from 'next/link';
import { roleAccess } from '../config/roleAccess';

export default function MainMenu({ children, userName = 'Usuario', userRole = 'guest' }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Obtener accesos para el rol actual
  const menuItems = roleAccess[userRole] || [];

  return (<></>);

  /* return (
    <div className="d-flex">
      <div className="sidebar-menu flex-shrink-0 p-3 bg-white" style={{width: "280px"}}>
        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
          
          <span className="fs-5 fw-semibold">Collapsible</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Home
            </button>
            <div className="collapse show" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-dark rounded">Overview</a></li>
                <li><a href="#" className="link-dark rounded">Updates</a></li>
                <li><a href="#" className="link-dark rounded">Reports</a></li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
              Dashboard
            </button>
            <div className="collapse show" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-dark rounded">Overview</a></li>
                <li><a href="#" className="link-dark rounded">Weekly</a></li>
                <li><a href="#" className="link-dark rounded">Monthly</a></li>
                <li><a href="#" className="link-dark rounded">Annually</a></li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="true">
              Orders
            </button>
            <div className="collapse show" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-dark rounded">New</a></li>
                <li><a href="#" className="link-dark rounded">Processed</a></li>
                <li><a href="#" className="link-dark rounded">Shipped</a></li>
                <li><a href="#" className="link-dark rounded">Returned</a></li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              Account
            </button>
            <div className="collapse" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-dark rounded">New...</a></li>
                <li><a href="#" className="link-dark rounded">Profile</a></li>
                <li><a href="#" className="link-dark rounded">Settings</a></li>
                <li><a href="#" className="link-dark rounded">Sign out</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );*/
} 