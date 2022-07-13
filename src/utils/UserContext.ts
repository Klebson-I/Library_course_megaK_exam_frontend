import React, {createContext, useContext} from "react";
import {ActionType, UserState} from "./UserReducer";

interface userContextType {
    userState: UserState;
    dispatch: React.Dispatch<ActionType>;
}

export const userContext = createContext<userContextType | null>(null)

export const useUserContext = (): userContextType => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('Context is empty');
    }
    return context;
}