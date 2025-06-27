import type { User } from './model/User.ts';

export function useUserData() {
	return {
		me: null as User | null,
		users: [] as User[],
		auth: (data: Omit<User, 'id'>): User => { return null as unknown as User },
	}
}