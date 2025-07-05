import { AppShell, useMantineColorScheme } from '@mantine/core';
import { MainViewHeader } from './MainViewHeader.tsx';
import { CircumstanceRole } from '../../domain/model/CircumstanceRole.ts';
import { useEffect } from 'react';
import { MainViewUserView } from './MainViewUserView.tsx';
import { MainViewBankerView } from './MainViewBankerView.tsx';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';

export function MainView() {
	const domain = useDomainOfType('main');
	const role = 'role' in domain ? domain.role : CircumstanceRole.USER

	const { setColorScheme } = useMantineColorScheme();

	useEffect(() => {
		if (role === CircumstanceRole.USER) {
			setColorScheme('light');
		} else {
			setColorScheme('dark');
		}

		return () => {
			setColorScheme('light');
		}
	}, [role]);

	return (
		<AppShell header={{ height: 60 }} footer={{ height: '50'}} padding="md">
			<AppShell.Header>
				<MainViewHeader />
			</AppShell.Header>
			<AppShell.Main>
				{ role === CircumstanceRole.USER && <MainViewUserView />}
				{ role === CircumstanceRole.BANKER && <MainViewBankerView />}
			</AppShell.Main>
			<AppShell.Footer px='md' py='sm'>
				Bartek ➜ Michał: $1000
			</AppShell.Footer>
		</AppShell>
	)
}