import { Hono } from 'hono';
import admin from 'firebase-admin';
import { db } from './FirestoreConnect';
const router = new Hono();

interface userState {
    id: string,
    heartRate: number
    timestamp: FirebaseFirestore.Timestamp
};

router.post('/set' , async c => {

    let body = await c.req.json();
    let id: string = body.id;
    let HR: number = body.HR;

    try {

        const docRef = await db.collection('userState').add({
            id:id,
            heartRate:HR,
            timestamp:admin.firestore.FieldValue.serverTimestamp()
        } as userState);

        return c.json(docRef);

    } catch (error) {

        return c.json({
            msg:error.message
        });
    }
})
export default router;