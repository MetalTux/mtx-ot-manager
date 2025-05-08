import { authMiddleware } from '../../../middlewares/authMiddleware';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '../../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === 'PUT') {
    const { uid, name, role } = req.body;

    if (!uid || !name || !role) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const db = getFirestore(firebaseAdminApp);

    try {
      await db.collection('usuarios').doc(uid).update({ name, role });
      return res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}