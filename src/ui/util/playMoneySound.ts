import money from '../../assets/money.mp3';

export function playMoneySound(): void {
	const audio = new Audio();
	audio.src = money;
	audio.volume = 1;
	audio.play().catch((error) => {
		console.error('Error playing money sound:', error);
	});
}