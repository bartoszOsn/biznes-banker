import type { DatabaseReference } from 'firebase/database';

export type DbRef<TValue> = DatabaseReference & { __values: TValue };