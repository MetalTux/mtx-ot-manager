import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);

  const waitForClaims = async (user) => {
    let retries = 10; // Reintentos máximos
    while (retries > 0) {
      const token = await user.getIdTokenResult(true);
      if (token.claims.role) {
        return token.claims;
      }
      await new Promise((resolve) => setTimeout(resolve, 500)); // Esperar 500ms antes de intentar nuevamente
      retries--;
    }
    throw new Error('No se pudieron sincronizar los claims personalizados.');
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const userCredential = await login(email, password);
      const token = await userCredential.user.getIdToken();

      const response = await fetch('/api/usuarios/current', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario desde la API.');
      }

      const additionalData = await response.json();

      await fetch('/api/setCustomClaims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Opcional si validas el usuario
        },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          role: additionalData.usuario_rol, // Asigna el rol apropiado
          uname: additionalData.usuario_nombre, // Asignamos el nombre del usuario
        }),
      });

      // Forzar la actualización del token
      const claims = await waitForClaims(userCredential.user);
      //await userCredential.user.getIdToken(true);

      router.push('/');
    } catch (err) {
      setError('Error de autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '400px' }}>
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4">Ingreso al Sistema OT</h4>
          
          {/* Manejamos el error */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button" // Evita que el formulario se envíe
              className="btn btn-success btn-block mt-4"
              onClick={handleLogin} // Maneja el click aquí
            >
              Iniciar Sesión
            </button>

            <div className="mt-3 text-right">
              <a href="/recover-password" className="text-muted">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}