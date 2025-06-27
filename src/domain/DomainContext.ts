import { createContext } from 'react';
import type { Domain } from './Domain.ts';

export const DomainContext = createContext<Domain | null>(null);