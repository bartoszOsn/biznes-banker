export function setQueryParam(name: string, value: string, method: 'push' | 'replace' = 'push'): void {
	const params = new URLSearchParams(window.location.search);

	if (value === null || value === undefined) {
		params.delete(name);
	} else {
		params.set(name, value);
	}

	const newUrl = `${window.location.pathname}?${params.toString()}`;

	if (method === 'push') {
		window.history.pushState({}, '', newUrl);
	} else if (method === 'replace') {
		window.history.replaceState({}, '', newUrl);
	}
}