import admin from "firebase-admin";
import "dotenv/config";

console.log(process.env.FIREBASE_PROJECT_ID)

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // 修正換行符號
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    })
});

const db = admin.firestore();
export { db };
