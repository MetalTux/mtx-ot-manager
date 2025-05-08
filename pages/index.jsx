import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import withAuth from '../hoc/withAuth';
//import * as functions from '../functions/test';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return <p>Redirigiendo...</p>;

  console.log(user);

  return (
    <div>
      <h1>Bienvenido a tu panel de usuario</h1>
      <p>Esta es una página protegida.</p>
      <p>Nombre de usuario: {user.uname || 'Nombre no disponible'}</p>
      <p>Rol de usuario: {user.role || 'Rol no disponible'}</p>
    </div>
  );
}

export default withAuth(Home);