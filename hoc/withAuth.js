import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          // Si no está autenticado, redirige al login
          router.push('/login');
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // Si el usuario no tiene permisos, redirige a una página de acceso denegado
          router.push('/unauthorized');
        }
      }
    }, [user, loading, router]);   

    if (loading) return <p>Loading...</p>;
    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;