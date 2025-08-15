import { initializeApp } from 'firebase/app';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { useOnce, useOnceEffect } from '../../../util/useOnce.ts';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.FIREBASE_API_KEY,
	authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.FIREBASE_APP_ID,
	databaseURL: import.meta.env.FIREBASE_DATABASE_URL
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