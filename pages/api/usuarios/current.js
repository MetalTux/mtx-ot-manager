import { authMiddleware } from '../../../middlewares/authMiddleware';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '../../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === 'GET') {    
    const user = req.user;
    const db = getFirestore(firebaseAdminApp);
    try {
      const userDoc = await db.collection('usuarios').doc(user.uid).get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(200).json(userDoc.data());
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener usuario', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}