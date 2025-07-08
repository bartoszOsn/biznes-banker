import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DomainProvider } from '../domain/DomainProvider.tsx';
import { AppRouter } from '../ui/AppRouter.tsx';
import { createNoopColorSchemeManager } from '../util/createNoopColorSchemeManager.ts';
import { ModalsProvider } from '@mantine/modals';
import { SoundPlayerProvider } from '../ui/util/SoundPlayerProvider.tsx';

const colorSchemeManager = createNoopColorSchemeManager();

function App() {
	return (
		<>
			<MantineProvider colorSchemeManager={colorSchemeManager}>
				<DomainProvider>
					<ModalsProvider>
						<SoundPlayerProvider>
							<AppRouter />
						</SoundPlayerProvider>
					</ModalsProvider>
				</DomainProvider>
			</MantineProvider>
		</>
	)
}

export default App
