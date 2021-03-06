export interface UserState {
    id: string;
    name: string;
    surname: string;
    city: string;
    address: string;
    phone: number;
    email: string;
    is_admin: boolean;
}

export const userInitialState : UserState = {
    id: "",
    name: "",
    city: "",
    address: "",
    is_admin: false,
    phone: 0,
    surname: "",
    email: ""
}

interface SetId {
    type: 'SET_ID';
    payload: string;
}

interface SetName {
    type: 'SET_NAME';
    payload: string;
}

interface SetCity {
    type: 'SET_CITY';
    payload: string;
}

interface SetAddress {
    type:'SET_ADDRESS';
    payload:string;
}
interface SetAdmin {
    type:'SET_ADMIN';
    payload:boolean;
}
interface SetSurname {
    type:'SET_SURNAME';
    payload:string;
}
interface SetPhone {
    type:'SET_PHONE';
    payload:number;
}

interface SetEmail {
    type: 'SET_EMAIL';
    payload: string;
}

interface Reset {
    type: 'RESET',
}


export type ActionType = SetName | SetSurname | SetAddress | SetAdmin | SetPhone | SetCity | SetEmail | SetId | Reset;

export const userReducer = (state: UserState, action: ActionType): UserState => {
    switch (action.type) {
        case "SET_NAME" : {
            return {
                ...state,
                name: action.payload
            }
        }
        case "SET_SURNAME" : {
            return {
                ...state,
                surname : action.payload
            }
        }
        case "SET_ADDRESS" : {
            return {
                ...state,
                address : action.payload
            }
        }
        case "SET_ADMIN" : {
            return {
                ...state,
                is_admin : action.payload
            }
        }
        case "SET_CITY" : {
            return {
                ...state,
                city : action.payload
            }
        }
        case "SET_PHONE" : {
            return {
                ...state,
                phone: action.payload
            }
        }
        case "SET_EMAIL" : {
            return {
                ...state,
                email: action.payload
            }
        }
        case "SET_ID" : {
            return {
                ...state,
                id: action.payload
            }
        }
        case "RESET": {
            return {
                ...userInitialState
            }
        }
        default :
            return state;
    }
}