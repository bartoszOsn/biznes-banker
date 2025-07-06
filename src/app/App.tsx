import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { AppRouter } from '../ui/AppRouter.tsx';
import { createNoopColorSchemeManager } from '../util/createNoopColorSchemeManager.ts';
import { ModalsProvider } from '@mantine/modals';

const colorSchemeManager = createNoopColorSchemeManager();

function App() {
	return (
		<>
			<MantineProvider colorSchemeManager={colorSchemeManager}>
				<DomainProvider>
					<ModalsProvider>
						<AppRouter />
					</ModalsProvider>
				</DomainProvider>
			</MantineProvider>
		</>
	)
}

export default App
