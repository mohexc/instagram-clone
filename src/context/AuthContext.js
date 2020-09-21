import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
const Context = React.createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState()
    const [timestamp, settimestamp] = useState(Date.now());

    useEffect(() => {
        unsubscribe()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        unsubscribe()
        // eslint-disable-next-line
    }, [timestamp])

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        return authUser ? setUser(authUser) : setUser(null)
    })

    const reloadAuthContext = () => settimestamp(Date.now());

    return (
        <Context.Provider value={{
            user,
            setUser,
            reloadAuthContext
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

