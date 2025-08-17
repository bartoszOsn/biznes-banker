import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { networkInterfaces } from 'os';

const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');

if (!env.FIREBASE_API_KEY ||
	!env.FIREBASE_AUTH_DOMAIN ||
	!env.FIREBASE_PROJECT_ID ||
	!env.FIREBASE_STORAGE_BUCKET ||
	!env.FIREBASE_MESSAGING_SENDER_ID ||
	!env.FIREBASE_APP_ID ||
	!env.FIREBASE_DATABASE_URL) {
	console.error('Missing Firebase environment variables. Please check your .env file.');
	process.exit(1);
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	let emulatorUrl = '';

	if (mode === 'emulator') {
		emulatorUrl = getNetworkAdress();
		console.log(emulatorUrl);
	} else if (command === 'serve') {
		emulatorUrl = 'localhost';
	}

	return ({
		plugins: [react()],
		resolve: {
			alias: {
				'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs'
			}
		},
		define: {
			__EMULATOR_URL__: JSON.stringify(emulatorUrl),
			'import.meta.env.FIREBASE_API_KEY': JSON.stringify(env.FIREBASE_API_KEY),
			'import.meta.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(env.FIREBASE_AUTH_DOMAIN),
			'import.meta.env.FIREBASE_PROJECT_ID': JSON.stringify(env.FIREBASE_PROJECT_ID),
			'import.meta.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(env.FIREBASE_STORAGE_BUCKET),
			'import.meta.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.FIREBASE_MESSAGING_SENDER_ID),
			'import.meta.env.FIREBASE_APP_ID': JSON.stringify(env.FIREBASE_APP_ID),
			'import.meta.env.FIREBASE_DATABASE_URL': JSON.stringify(env.FIREBASE_DATABASE_URL)
		}
	});
})

function getNetworkAdress(): string {
	const nets = networkInterfaces();
	return Object.values(nets)
		.flat()
		.filter((net) => net && net.family === 'IPv4' && !net.internal)
		.map((net) => net!.address)
		.find((address) => address !== undefined)!;
}