import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { networkInterfaces } from 'os';

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
			__EMULATOR_URL__: JSON.stringify(emulatorUrl)
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