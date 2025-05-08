import { authMiddleware } from '../../../middlewares/authMiddleware';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '../../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === 'GET') {
    const db = getFirestore(firebaseAdminApp);
    try {
      const snapshot = await db.collection('usuarios').get();
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}