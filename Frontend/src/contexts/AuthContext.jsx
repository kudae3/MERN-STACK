import { createContext, useReducer } from "react";

const AuthContext = createContext();

//action = type, payload

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state;
    }
}

const AuthProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, {
        user: null
    });

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};