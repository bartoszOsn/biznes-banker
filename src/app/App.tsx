import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { AppRouter } from '../ui/AppRouter.tsx';

function App() {
	return (
		<>
			<MantineProvider>
				<DomainProvider>
					<AppRouter />
				</DomainProvider>
			</MantineProvider>
		</>
	)
}

export default App
