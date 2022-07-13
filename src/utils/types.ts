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

export interface BookObjectAdd extends BookObject {
    authors: string[];
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
    expire_date: string;
    name: string;
    surname: string;
    email: string;
    title: string;
}

export interface HireObjectAdmin extends HireObject {
    debt: number;
}

export interface TokenObject {
    id: string;
    login: string;
    password: string;
}

export type UpdateResponse = true
    | "Cannot use this password"
    | "Cannot use this login"
    | "Invalid passes";

export interface UserInfo {
    phone: number;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
}

