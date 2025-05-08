import { authMiddleware } from '../../../middlewares/authMiddleware';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '../../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === 'POST') {
    const { email, password, role, name } = req.body;

    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const db = getFirestore(firebaseAdminApp);
    const auth = getAuth(firebaseAdminApp);

    try {
      const userRecord = await auth.createUser({ email, password });
      const userId = userRecord.uid;

      await db.collection('usuarios').doc(userId).set({
        email,
        role,
        name,
        createdAt: new Date(),
      });

      return res.status(201).json({ message: 'Usuario creado con éxito', userId });
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear usuario', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}