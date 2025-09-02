type Primitive = null | undefined | string | number | boolean | symbol | bigint;

function isPrimitive(x: unknown): x is Primitive {
	return x === null || (typeof x !== "object" && typeof x !== "function");
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
	if (x === null || typeof x !== "object") return false;
	const proto = Object.getPrototypeOf(x);
	return proto === Object.prototype || proto === null;
}

export function updateWithSharing<T>(prev: T, next: T): T {
	if (Object.is(prev, next)) return prev;

	if (isPrimitive(prev) || isPrimitive(next)) return next;

	if (Array.isArray(prev) && Array.isArray(next)) {
		const len = next.length;
		let changed = prev.length !== len;
		const out: unknown[] = new Array(len);

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

		return (changed ? out : prev) as unknown as T;
	}

	if (isPlainObject(prev) && isPlainObject(next)) {
		const prevObj = prev as Record<string, unknown>;
		const nextObj = next as Record<string, unknown>;

		const prevKeys = Object.keys(prevObj);
		const nextKeys = Object.keys(nextObj);

		let changed = false;
		if (prevKeys.length !== nextKeys.length) {
			changed = true;
		}

		const out: Record<string, unknown> = {};

		for (const key of nextKeys) {
			if (Object.prototype.hasOwnProperty.call(prevObj, key)) {
				const v = updateWithSharing(prevObj[key], nextObj[key]);
				out[key] = v;
				if (!changed && v !== prevObj[key]) changed = true;
			} else {
				out[key] = nextObj[key];
				changed = true;
			}
		}

		if (!changed) {
			for (const key of prevKeys) {
				if (!Object.prototype.hasOwnProperty.call(nextObj, key)) {
					changed = true;
					break;
				}
			}
		}

		return (changed ? out : prev) as T;
	}

	return next;
}
