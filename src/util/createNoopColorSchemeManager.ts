import type { MantineColorSchemeManager, MantineColorScheme } from '@mantine/core';
import { Subject, Subscription } from 'rxjs';

export function createNoopColorSchemeManager(): MantineColorSchemeManager {
	let colorScheme: MantineColorScheme | null = null;
	const colorScheme$ = new Subject<MantineColorScheme>();
	let subscription: Subscription | null = null;

	return {
		get: (defaultValue: MantineColorScheme): MantineColorScheme => colorScheme ?? defaultValue,
		set: (value: MantineColorScheme): void => {
			colorScheme = value;
			colorScheme$.next(value);
		},
		subscribe: (onUpdate) => {
			subscription = colorScheme$.subscribe(onUpdate);
		},
		unsubscribe: () => {
			subscription?.unsubscribe();
		},
		clear: () => {
			colorScheme = null;
		}
	}
}