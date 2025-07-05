import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { AppRouter } from '../ui/AppRouter.tsx';
import { createNoopColorSchemeManager } from '../util/createNoopColorSchemeManager.ts';

const colorSchemeManager = createNoopColorSchemeManager();

function App() {
	return (
		<>
			<MantineProvider colorSchemeManager={colorSchemeManager}>
				<DomainProvider>
					<AppRouter />
				</DomainProvider>
			</MantineProvider>
		</>
	)
}

export default App
