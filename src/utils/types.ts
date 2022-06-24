export interface UserObject {
    id: string;
    name: string;
    surname: string;
    city: string;
    address: string;
    phone: number;
    email: string;
}

export interface UserObjectLogin extends UserObject {
    is_admin: number;
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

export interface AuthorObject {
    id?: string;
    name: string;
    surname: string;
    book_id: string;
}

export interface HireObject {
    id: string;
    user_id: string;
    book_id: string;
    expire_date: Date;
    name: string;
    surname: string;
    email: string;
    title: string;
}

export interface TokenObject {
    id: string;
    login: string;
    password: string;
}