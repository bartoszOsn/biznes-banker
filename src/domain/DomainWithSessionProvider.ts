import { type ReactNode, useState } from 'react';
import type { User } from './model/User.ts';

export function DomainWithSessionProvider(
	{ sessionId, children }: { sessionId: string, children: ReactNode }
) {
	const [userProps, setUserProps] = useState<Omit<User, 'id'> | null>(null);


}