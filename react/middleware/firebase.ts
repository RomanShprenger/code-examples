import { getDatabase } from 'firebase-admin/database';
import { PublicKey } from '@solana/web3.js';
import { dbURL, storageBucket } from '../../config.json';

const admin = require('firebase-admin');

export const firebaseApp = global.firebaseApp
    ?? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: dbURL,
      storageBucket: storageBucket,
    });

global.firebaseApp = firebaseApp;

export function newUser() {
  return async (req, res, next) => {
    const database = getDatabase(firebaseApp);
    const info = JSON.parse(req.body.info);
    const hash = new PublicKey(req.body.pubkey.data).toString();
    const avatar = req.body.avatarUri;

    try {
      await database.ref(`users/${hash}/`)
        .update(
          {
            ...info, avatar,
          },
        );
      next();
    } catch (err) {
      next(Error(`Error during Firebase artwork write: ${err}`));
    }
  };
}
