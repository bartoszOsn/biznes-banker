import { type Auth, type User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUser(auth: Auth) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				signInAnonymously(auth).then();
			}
		});

		return unsub;
	}, [auth]);

	return user;
}