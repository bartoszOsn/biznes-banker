import type { MantineColor } from '@mantine/core';

export enum UserColor {
	RED = 'red',
	BLUE = 'blue',
	GREEN = 'green',
	YELLOW = 'yellow',
	PURPLE = 'purple',
	PINK = 'pink',
	WHITE = 'white',
	BLACK = 'black',
}

export function userColorToMantine(color: UserColor): MantineColor {
	switch (color) {
		case UserColor.RED:
			return `red`;
		case UserColor.BLUE:
			return `blue`;
		case UserColor.GREEN:
			return `green`;
		case UserColor.YELLOW:
			return `yellow`;
		case UserColor.PURPLE:
			return `purple`;
		case UserColor.PINK:
			return `pink`;
		case UserColor.WHITE:
			return 'gray'; // TODO: return 'white';
		case UserColor.BLACK:
			return 'dark';
		default:
			throw new Error(`Unknown user color: ${color}`);
	}
}

export function userColorToMantineVar(color: UserColor): string {
	switch (color) {
		case UserColor.RED:
			return `var(--mantine-color-red-filled)`;
		case UserColor.BLUE:
			return `var(--mantine-color-blue-filled)`;
		case UserColor.GREEN:
			return `var(--mantine-color-green-filled)`;
		case UserColor.YELLOW:
			return `var(--mantine-color-yellow-filled)`;
		case UserColor.PURPLE:
			return `var(--mantine-color-violet-filled)`;
		case UserColor.PINK:
			return `var(--mantine-color-pink-filled)`;
		case UserColor.WHITE:
			return 'white';
		case UserColor.BLACK:
			return 'black';
		default:
			throw new Error(`Unknown user color: ${color}`);
	}
}