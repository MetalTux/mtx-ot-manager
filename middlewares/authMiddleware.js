import { getAuth } from 'firebase-admin/auth';
import { firebaseAdminApp } from '../firebase/firebaseAdmin';

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Espera un header "Authorization: Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
  }

  try {
    const decodedToken = await getAuth(firebaseAdminApp).verifyIdToken(token);
    req.user = decodedToken; // Agrega los datos del usuario autenticado al objeto req
    next();
  } catch (error) {
    console.error('Error verificando el token:', error);
    return res.status(401).json({ message: 'No autorizado. Token inválido.' });
  }
}