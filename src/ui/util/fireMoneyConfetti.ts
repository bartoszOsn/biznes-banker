import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
// @ts-expect-error // jsConfetti does not have a type definition for canvas
jsConfetti['canvas'].style.zIndex = '99999999';

export function fireMoneyConfetti() {
	jsConfetti.addConfetti({
		emojis: ['💰', '💵', '💸', '🪙'],
	})
}