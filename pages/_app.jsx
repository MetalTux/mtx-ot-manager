import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Script from 'next/script';
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.css';
import '../styles/mainmenu.css';
import '../styles/globals.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {
  const AuthenticatedLayout = ({ children }) => {
    const router = useRouter();
    const { user, loading } = useAuth(); // Usuario actual y estado de carga
    const noLayoutRoutes = ['/login'];

    console.log(`Valor de loading: ${loading}`);

    if (loading) {
      console.log("Mostrando un Loading (que no aparece)");
      // Mostrar un spinner o mensaje mientras se verifica el estado del usuario
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      );
    }

    const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

    if (isNoLayoutRoute) {
      return <Component {...pageProps} />;
    }

    if (!user) {
      // Si no hay usuario, renderiza el componente sin el Layout
      return <Component {...pageProps} />;
    }

    // Usuario autenticado: renderiza el Layout
    const userRole = user?.role || 'guest';
    const userName = user?.uname || 'Usuario';

    return (
      <Layout userName={userName} userRole={userRole}>
        {children}
      </Layout>
    );
  };

  return (
    <AuthProvider>
      <Script
        src="/bootstrap/js/bootstrap.bundle.min.js"
        strategy="afterInteractive" // Cargar después de que la página esté interactiva
      />
      <AuthenticatedLayout>
        <Component {...pageProps} />
      </AuthenticatedLayout>
    </AuthProvider>
  );
}

export default MyApp;

/* import { AuthProvider, useAuth } from '../context/AuthContext';
import Script from 'next/script';
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.css';
import '../styles/mainmenu.css';
import '../styles/globals.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {
  const AuthenticatedLayout = ({ children }) => {
    const { user } = useAuth(); // Usuario actual

    if (!user) {
      // Si no hay usuario, muestra el componente actual directamente
      return <Component {...pageProps} />;
    }

    // Obtener el rol desde los claims personalizados
    const userRole = user?.role || 'guest';

    return (
      <Layout userName={user.displayName || 'Usuario'} userRole={userRole}>
        {children}
      </Layout>
    );
  };

  return (
    <AuthProvider>
      <AuthenticatedLayout>
        <Script
          src="/bootstrap/js/bootstrap.bundle.min.js"
          strategy="afterInteractive" // Cargar después de que la página esté interactiva
        />
        <Component {...pageProps} />
      </AuthenticatedLayout>
    </AuthProvider>
  );
}

export default MyApp; */