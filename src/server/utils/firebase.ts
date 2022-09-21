import * as firebaseAdmin from "firebase-admin";
import { Logger } from "tslog";

const logger = new Logger();
// Initialize Firebase Admin
const initializeFirebase = () => {
  try {
    const f = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
    });
    logger.info("Successfully initialized firebase");
    return f;
  } catch (e) {
    logger.error("Unable to initialize firebase admin " + e);
  }
};
export default initializeFirebase;
