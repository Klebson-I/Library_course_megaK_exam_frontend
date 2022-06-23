import React, {createContext} from "react";
import {ActionType, UserState} from "./UserReducer";

interface userContextType {
    userState: UserState;
    dispatch: React.Dispatch<ActionType>;
}

export const userContext = createContext<userContextType | null>(null)
