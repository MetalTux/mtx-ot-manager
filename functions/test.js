import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function addTestData() {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Test Document",
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}