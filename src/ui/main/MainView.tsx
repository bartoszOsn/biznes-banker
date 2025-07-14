import { AppShell, useMantineColorScheme } from '@mantine/core';
import { MainViewHeader } from './header/MainViewHeader.tsx';
import { CircumstanceRole } from '../../domain/model/CircumstanceRole.ts';
import { useEffect } from 'react';
import { MainViewUserView } from './user/MainViewUserView.tsx';
import { MainViewBankerView } from './banker/MainViewBankerView.tsx';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { MainViewTransactionLog } from './transaction-log/MainViewTransactionLog.tsx';
import { useWakeLock } from '../util/useWakeLock.ts';

export function MainView() {
	const domain = useDomainOfType('main');
	useWakeLock();

	const role = domain.asBanker?.role ?? CircumstanceRole.USER;

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
	}, [role, setColorScheme]);

	return (
		<AppShell header={{ height: 60 }} footer={{ height: '50'}} padding="md">
			<AppShell.Header>
				<MainViewHeader />
			</AppShell.Header>
			<AppShell.Main>
				{ role === CircumstanceRole.USER && <MainViewUserView />}
				{ role === CircumstanceRole.BANKER && <MainViewBankerView />}
			</AppShell.Main>
			<AppShell.Footer>
				<MainViewTransactionLog />
			</AppShell.Footer>
		</AppShell>
	)
}