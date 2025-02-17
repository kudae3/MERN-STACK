import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

//action = type, payload

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                user: action.payload
            }
        case "LOGOUT":
            localStorage.removeItem("user");
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

    useEffect(() => {
        try {
            let user = localStorage.getItem("user");
            if (user) {
                dispatch({type: "LOGIN", payload: JSON.parse(user)});
            }else{
                dispatch({type: "LOGOUT"});
            }
        } catch (e) {
            console.log(e);
            dispatch({type: "LOGOUT"});   
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};