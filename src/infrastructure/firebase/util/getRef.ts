import { Database, ref } from 'firebase/database';
import type { DbRef } from './DbRef.ts';
import type { SessionDTO } from '../SessionDTO.ts';

export function getRef<P extends Path<SessionDTO>>(
	db: Database,
	sessionId: string,
	...path: P): DbRef<PathValue<SessionDTO, P>> {
	return ref(db, `sessions/${sessionId}/${path.join('/')}`) as DbRef<PathValue<SessionDTO, P>>;
}

type Primitive = string | number | boolean | symbol | null | undefined;

// Tworzy typy ścieżek do każdego możliwego pola
type Path<T> = T extends Primitive
	? []
	: {
		[K in keyof T]: [K] | [K, ...Path<T[K]>];
	}[keyof T];

type PathValue<T, P extends Array<string | number | symbol>> =
	P extends [infer K, ...infer Rest]
		? K extends keyof T
			? Rest extends Array<string | number | symbol>
				? PathValue<T[K], Rest>
				: never
			: never
		: T;

