import { AppShell, useMantineColorScheme } from '@mantine/core';
import { MainViewHeader } from './MainViewHeader.tsx';
import { MainViewView } from './MainViewView.ts';
import { useEffect, useState } from 'react';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { MainViewUserView } from './MainViewUserView.tsx';
import { MainViewBankerView } from './MainViewBankerView.tsx';

export function MainView() {
	const domain = useDomainOfType('main');
	const [view, setView] = useState(MainViewView.USER);

	const { setColorScheme } = useMantineColorScheme();

	useEffect(() => {
		if (view === 'user') {
			setColorScheme('light');
		} else {
			setColorScheme('dark');
		}
	}, [view, setColorScheme]);

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<MainViewHeader view={view} onViewChange={setView} />
			</AppShell.Header>
			<AppShell.Main>
				{ view === MainViewView.USER && <MainViewUserView />}
				{ view === MainViewView.BANKER && <MainViewBankerView />}
			</AppShell.Main>
			<AppShell.Footer px='md' py='sm'>
				Bartek ➜ Michał: $1000
			</AppShell.Footer>
		</AppShell>
	)
}