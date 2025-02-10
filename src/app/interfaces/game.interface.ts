export interface Card {
    score: string;
    selected: boolean;
}

export interface User {
    id: number;
    name: string;
    score: string;
    role?: Role;
    className?: string;
}

export type Role = 'player' |'viewer' | 'playerOwner';
