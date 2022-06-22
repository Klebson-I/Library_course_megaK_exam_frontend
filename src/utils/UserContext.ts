import React, {createContext} from "react";
import {ActionType, userInitialState, UserState} from "./UserReducer";

interface userContext {
    userState : UserState;
    dispatch : React.Dispatch<ActionType>;
}

export const userContext = createContext<userContext | null>(null)
