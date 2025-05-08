import { getAuth } from 'firebase-admin/auth';
import { firebaseAdminApp } from '../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { uid, role, uname } = req.body;

    if (!uid || !role || !uname) {
      return res.status(400).json({ error: 'UID y rol son requeridos' });
    }

    const auth = getAuth(firebaseAdminApp);
    await auth.setCustomUserClaims(uid, { role, uname });

    return res.status(200).json({ message: 'Claims personalizados asignados exitosamente.' });
  } catch (error) {
    console.error('Error asignando claims:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}