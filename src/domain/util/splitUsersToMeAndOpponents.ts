import type { User } from "../model/User.ts";

export function splitUsersToMeAndOpponents(users: User[], myId: string): [me: User, opponents: User[]] {
	const me =  users.find((user) => user.id === myId);
	const opponents = users.filter((user) => user.id !== myId);

	if (!me) {
		throw new Error('User not found in session');
	}

	return [me, opponents];
}