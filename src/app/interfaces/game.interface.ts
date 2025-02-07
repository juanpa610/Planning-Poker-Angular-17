export interface Card {
    score: string;
}

export interface User {
    id: number;
    name: string;
    score: number;
    role?: Role;
    className?: string;
}

export type Role = 'player' |'viewer' | 'playerOwner';
