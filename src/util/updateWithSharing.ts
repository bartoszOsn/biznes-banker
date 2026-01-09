type Primitive = null | undefined | string | number | boolean | symbol | bigint;

function isPrimitive(x: unknown): x is Primitive {
	return x === null || (typeof x !== "object" && typeof x !== "function");
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
	if (x === null || typeof x !== "object") return false;
	const proto = Object.getPrototypeOf(x);
	return proto === Object.prototype || proto === null;
}

function updateWithSharingArray<T>(prev: T[], next: T[]): T[] {
	const len = next.length;
	let changed = prev.length !== len;
	const out: T[] = new Array(len);

	const minLen = Math.min(prev.length, len);
	for (let i = 0; i < minLen; i++) {
		const v = updateWithSharing(prev[i], next[i]);
		out[i] = v;
		if (!changed && v !== prev[i]) changed = true;
	}

	for (let i = minLen; i < len; i++) {
		out[i] = next[i];
		changed = true;
	}

	return (changed ? out : prev);
}

function updateWithSharingPlainObject<T extends Record<string, unknown>>(prev: T, next: T): T {
	const prevKeys = Object.keys(prev);
	const nextKeys = Object.keys(next);

	let changed = false;
	if (prevKeys.length !== nextKeys.length) {
		changed = true;
	}

	const out: Record<string, unknown> = {};

	for (const key of nextKeys) {
		if (Object.prototype.hasOwnProperty.call(prev, key)) {
			const v = updateWithSharing(prev[key], next[key]);
			out[key] = v;
			if (!changed && v !== prev[key]) changed = true;
		} else {
			out[key] = next[key];
			changed = true;
		}
	}

	if (!changed) {
		for (const key of prevKeys) {
			if (!Object.prototype.hasOwnProperty.call(next, key)) {
				changed = true;
				break;
			}
		}
	}

	return (changed ? out : prev) as T;
}

export function updateWithSharing<T>(prev: T, next: T): T {
	if (Object.is(prev, next)) return prev;

	if (isPrimitive(prev) || isPrimitive(next)) return next;

	if (Array.isArray(prev) && Array.isArray(next)) {
		return updateWithSharingArray(prev, next) as T;
	}

	if (isPlainObject(prev) && isPlainObject(next)) {
		return updateWithSharingPlainObject(prev, next) as T;
	}

	return next;
}
