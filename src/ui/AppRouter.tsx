import { useDomain } from '../domain/useDomain.ts';
import { StartSessionView } from './start-session/StartSessionView.tsx';
import { LoginView } from './login/LoginView.tsx';
import { ScreenTransition } from '../util/ScreenTransition.tsx';

export function AppRouter() {
	const domain = useDomain();

	return (
		<ScreenTransition>
			{domain.stage === 'withoutSession' && <StartSessionView />}
			{domain.stage === 'withoutUser' && <LoginView />}
		</ScreenTransition>
	)
}