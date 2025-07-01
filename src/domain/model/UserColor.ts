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

export function userColorToMantine(color: UserColor, variant: 'light' | 'filled' | 'light-color' = 'filled'): string {
	switch (color) {
		case UserColor.RED:
			return `var(--mantine-color-red-${variant})`;
		case UserColor.BLUE:
			return `var(--mantine-color-blue-${variant})`;
		case UserColor.GREEN:
			return `var(--mantine-color-green-${variant})`;
		case UserColor.YELLOW:
			return `var(--mantine-color-yellow-${variant})`;
		case UserColor.PURPLE:
			return `var(--mantine-color-violet-${variant})`;
		case UserColor.PINK:
			return `var(--mantine-color-pink-${variant})`;
		case UserColor.WHITE:
			return 'white';
		case UserColor.BLACK:
			return 'black';
		default:
			throw new Error(`Unknown user color: ${color}`);
	}
}