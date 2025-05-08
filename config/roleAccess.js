export const roleAccess = {
  superadmin: [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-table-columns fa-fw',
      items: [
        { label: 'Inicio', href: '/', icon: 'fa-solid fa-house fa-fw' },
      ],
    },
    {
      name: 'Gestión',
      icon: 'fa-solid fa-database fa-fw',
      items: [
        { label: 'Empresas', href: '/empresas', icon: 'fa-solid fa-building fa-fw' },
        { label: 'Usuarios', href: '/usuarios', icon: 'fa-solid fa-users-gear fa-fw' },
        { label: 'Configuración', href: '/configuracion', icon: 'fa-solid fa-screwdriver-wrench fa-fw' },
      ],
    },
  ],
  admin: [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-table-columns fa-fw',
      items: [
        { label: 'Inicio', href: '/', icon: 'fa-solid fa-house fa-fw' },
        { label: 'Órdenes de Trabajo', href: '/ordentrabajo', icon: 'fa-solid fa-list-check fa-fw' },
        { label: 'Cotizaciones', href: '/cotizacion', icon: 'fa-solid fa-money-check-dollar fa-fw' },
        { label: 'Existencia', href: '/existencia', icon: 'fa-solid fa-layer-group fa-fw' },
      ],
    },
    {
      name: 'Gestión',
      icon: 'fa-solid fa-database fa-fw',
      items: [
        { label: 'Configuración', href: '/configuracion', icon: 'fa-solid fa-screwdriver-wrench fa-fw' },
        { label: 'Usuarios', href: '/usuarios', icon: 'fa-solid fa-users-gear fa-fw' },
        { label: 'Clientes', href: '/clientes', icon: 'fa-solid fa-address-book fa-fw' },
        { label: 'Materia Prima', href: '/materiaprima', icon: 'fa-solid fa-cube fa-fw' },
      ],
    },
  ],
  usuario: [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-table-columns fa-fw',
      items: [
        { label: 'Inicio', href: '/', icon: 'fa-solid fa-house fa-fw' },
        { label: 'Órdenes de Trabajo', href: '/ordentrabajo', icon: 'fa-solid fa-list-check fa-fw' },
        { label: 'Cotizaciones', href: '/cotizacion', icon: 'fa-solid fa-money-check-dollar fa-fw' },
        { label: 'Existencia', href: '/existencia', icon: 'fa-solid fa-layer-group fa-fw' },
      ],
    },
  ],
};