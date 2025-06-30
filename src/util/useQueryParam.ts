import { useCallback, useEffect, useState } from 'react';

export function useQueryParam(key: string): [string | null, (newValue: string | null) => void] {
	const getQueryValue = useCallback(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get(key);
	}, [key]);

	const [value, setValueState] = useState<string | null>(() => getQueryValue());

	// Listen for back/forward or manual URL edits
	useEffect(() => {
		const onPopState = () => {
			const newValue = getQueryValue();
			setValueState(prev => (prev !== newValue ? newValue : prev));
		};

		window.addEventListener('popstate', onPopState);
		return () => {
			window.removeEventListener('popstate', onPopState);
		};
	}, [getQueryValue]);

	const setValue = useCallback((newValue: string | null) => {
		const url = new URL(window.location.href);
		const params = url.searchParams;

		if (newValue === null) {
			params.delete(key);
		} else {
			params.set(key, newValue);
		}

		const newUrl = `${url.pathname}?${params.toString()}${url.hash}`;
		window.history.replaceState({}, '', newUrl);
		setValueState(newValue);
	}, [key]);

	return [value, setValue];
}