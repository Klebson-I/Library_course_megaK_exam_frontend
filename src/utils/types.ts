export interface UserObject {
    name: string;
    surname: string;
    city: string;
    address: string;
    phone: number;
    email: string;
    login: string;
    password: string;
}

export type BookGenre =
    'sci-fi' |
    'novel' |
    'drama' |
    'comedy' |
    'historical' |
    'science' |
    'gangster novel' |
    'absurdist' |
    'fantasy' |
    'adventure' |
    'criminal' |
    'horror' |
    'thriller' |
    'comics' |
    'philosophy';

export interface BookObject {
    id?: string;
    title: string;
    genre: BookGenre | null;
    amount: number;
    year: number | null;
}
