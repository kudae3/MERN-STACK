import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState({
        name: "John Doe",
    });

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};