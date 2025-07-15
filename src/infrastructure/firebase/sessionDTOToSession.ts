import type { SessionDTO } from './SessionDTO.ts';
import type { Session } from '../../domain/model/Session.ts';
import type { User } from '../../domain/model/User.ts';
import type { Preset } from '../../domain/model/Preset.ts';
import type { Transaction } from '../../domain/model/Transaction.ts';

export function sessionDTOToSession(sessionId: string, sessionDTO: SessionDTO): Session {
	return {
		id: sessionId,
		createdAt: new Date(sessionDTO.createdAt),
		started: sessionDTO.started,
		startingMoney: sessionDTO.startingMoney ?? null,
		users: Object
			.entries(sessionDTO.users ?? {})
			.map(([userId, user]) => userDTOToUser(userId, user, sessionDTO.bankerUserId)),
		presets: Object
			.values(sessionDTO.presets ?? {})
			.map((preset) => presetDTOToPreset(preset)),
		transactions: Object
			.values(sessionDTO.operations ?? {})
			.map((operation) => operationDTOToTransaction(operation))
	}
}

function userDTOToUser(
	userId: string,
	userDTO: SessionDTO['users'][string],
	bankerId: string | null
): User {
	return {
		id: userId,
		name: userDTO.name,
		color: userDTO.color,
		isAlsoBanker: userId === bankerId
	}
}

function presetDTOToPreset(presetDTO: NonNullable<SessionDTO['presets']>[string]): Preset {
	return {
		name: presetDTO.name,
		amount: presetDTO.amount
	};
}

function operationDTOToTransaction(operation: SessionDTO['operations'][string]): Transaction {
    return {
		fromUserId: operation.moneyFromPlayerId,
		toUserId: operation.moneyToPlayerId,
		amount: operation.amount,
		timestamp: operation.timestamp,
		description: operation.description
	}
}
