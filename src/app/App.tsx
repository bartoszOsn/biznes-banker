import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DomainProvider } from '../domain/provider/DomainProvider.tsx';
import { AppRouter } from '../ui/AppRouter.tsx';
import { createNoopColorSchemeManager } from '../util/createNoopColorSchemeManager.ts';
import { ModalsProvider } from '@mantine/modals';
import { SoundPlayerProvider } from '../ui/util/SoundPlayerProvider.tsx';
import { RepositoryProvider } from '../infrastructure/RepositoryProvider.tsx';

const colorSchemeManager = createNoopColorSchemeManager();

function App() {
	return (
		<>
			<MantineProvider colorSchemeManager={colorSchemeManager}>
				<RepositoryProvider>
					<DomainProvider>
						<ModalsProvider>
							<SoundPlayerProvider>
								<AppRouter />
							</SoundPlayerProvider>
						</ModalsProvider>
					</DomainProvider>
				</RepositoryProvider>
			</MantineProvider>
		</>
	)
}

export default App
