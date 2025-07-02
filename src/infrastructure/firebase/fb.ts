import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyBIiUgI3piABMMCbNbVwQrS8bzd6PR14cY",
	authDomain: "biznes-banker.firebaseapp.com",
	projectId: "biznes-banker",
	storageBucket: "biznes-banker.firebasestorage.app",
	messagingSenderId: "691425387120",
	appId: "1:691425387120:web:93ca7e987c336faacc0ab5",
	databaseURL: "https://biznes-banker-default-rtdb.europe-west1.firebasedatabase.app"
};

export const fb = initializeApp(firebaseConfig);
export const db = getDatabase(fb);

if (import.meta.env.MODE === 'development') {
	connectDatabaseEmulator(db, 'localhost', 9000);
}