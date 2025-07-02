export function getQueryParamValue(name: string): string | null {
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
};