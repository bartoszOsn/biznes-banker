import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAnalytics, setAnalyticsCollectionEnabled, logEvent } from "firebase/analytics";

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
export const analytics = getAnalytics(fb);

if (__EMULATOR_URL__) {
	connectDatabaseEmulator(db, __EMULATOR_URL__, 9000);
	setAnalyticsCollectionEnabled(analytics, false);
}

window.addEventListener('error', (event) => {
	logEvent(analytics, 'exception', {
		description: event.message + ' at ' + event.filename + ':' + event.lineno,
		fatal: true
	})
});

window.addEventListener('unhandledrejection', function(event) {
	logEvent(analytics, 'exception', {
		description: event.reason?.message || 'Unhandled rejection',
		fatal: false
	});
});