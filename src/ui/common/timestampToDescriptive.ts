export function timestampToDescriptive(time: number): string {
	const now = Date.now();
	const diff = now - time;

	if (diff < 5 * 1000) {
		return 'just now';
	}

	if (diff < 60 * 1000) {
		const seconds = Math.floor(diff / 1000);
		return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
	}

	if (diff < 5 * 60 * 1000) {
		const minutes = Math.floor(diff / (60 * 1000));
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	}

	return Intl.DateTimeFormat('pl-PL', {
		timeStyle: 'short'
	}).format(time);
}