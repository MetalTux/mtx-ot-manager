import { authMiddleware } from '../../../middlewares/authMiddleware';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '../../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === 'DELETE') {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: 'UID no proporcionado' });
    }

    const db = getFirestore(firebaseAdminApp);
    const auth = getAuth(firebaseAdminApp);

    try {
      await auth.deleteUser(uid);
      await db.collection('usuarios').doc(uid).delete();
      return res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}