import { initializeApp } from 'firebase/app';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { useOnce, useOnceEffect } from '../../../util/useOnce.ts';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyBIiUgI3piABMMCbNbVwQrS8bzd6PR14cY",
	authDomain: "biznes-banker.firebaseapp.com",
	projectId: "biznes-banker",
	storageBucket: "biznes-banker.firebasestorage.app",
	messagingSenderId: "691425387120",
	appId: "1:691425387120:web:93ca7e987c336faacc0ab5",
	databaseURL: "https://biznes-banker-default-rtdb.europe-west1.firebasedatabase.app"
};

export function useFirebaseApp() {

	const firebaseApp = useOnce(() => initializeApp(firebaseConfig));
	const database = useOnce(() => getDatabase(firebaseApp));
	const analytics = useOnce(() => getAnalytics(firebaseApp));
	const auth = useOnce(() => getAuth(firebaseApp));

	useOnceEffect(() => {
		if (__EMULATOR_URL__) {
			connectDatabaseEmulator(database, __EMULATOR_URL__, 9000);
			setAnalyticsCollectionEnabled(analytics, false);
		}

		const exceptionHandler = (event: ErrorEvent) => {
			logEvent(analytics, 'exception', {
				description: event.message + ' at ' + event.filename + ':' + event.lineno,
				fatal: true
			})
		};

		const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
			logEvent(analytics, 'exception', {
				description: event.reason?.message || 'Unhandled rejection',
				fatal: false
			});
		}

		window.addEventListener('error', exceptionHandler);
		window.addEventListener('unhandledrejection', unhandledRejectionHandler);
	});

	return {
		firebaseApp,
		database,
		analytics,
		auth
	};
}