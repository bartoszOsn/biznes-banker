import { AppShell, Stack, useMantineColorScheme } from '@mantine/core';
import { MainViewHeader } from './MainViewHeader.tsx';
import { MainViewView } from './MainViewView.ts';
import { useEffect, useState } from 'react';

export function MainView() {
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
				<Stack w='100%' justify='space-between' align='center' px='md'>
					$15000
				</Stack>
			</AppShell.Main>
			<AppShell.Footer px='md' py='sm'>
				Bartek ➜ Michał: $1000
			</AppShell.Footer>
		</AppShell>
	)
}