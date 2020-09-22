import React, { useContext, useEffect, useState } from 'react'
import { message } from 'antd';
import { auth } from '../config/firebase'
const Context = React.createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [timestamp, settimestamp] = useState(Date.now());

    useEffect(() => {
        unsubscribe()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        unsubscribe()
        // eslint-disable-next-line
    }, [timestamp, user])

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser)
        } else {
            setUser(null)
        }
    })

    const reloadAuthContext = () => settimestamp(Date.now());

    const logout = () => {
        auth.signOut().catch(e => message.error(e.message))
        unsubscribe()
    }

    return (
        <Context.Provider value={{
            user,
            logout,
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

