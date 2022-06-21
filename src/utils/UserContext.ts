import {createContext} from "react";

interface userContext {
    name: string;
    surname: string;
    city: string;
    address: string;
    phone: number;
    email: string;
    is_admin: boolean;
}

export const userContext = createContext<userContext>({
    name: "",
    surname: "",
    city: "",
    address: "",
    phone: 0,
    email: "",
    is_admin: false
})