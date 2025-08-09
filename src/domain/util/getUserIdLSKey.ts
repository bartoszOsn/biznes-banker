export function getUserIdLSKey(sessionId: string | null): string {
	if (sessionId === null) {
		return '';
	}
	return `userId-${sessionId}`;
}