import React, { useContext, useState } from 'react'

const Context = React.createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState()


    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}>
            {children}
        </Context.Provider>
    )
}


export const useAuthContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error("Cannot use useAuth outside auth provider");
    }

    return context;
};

export default AuthContext;

