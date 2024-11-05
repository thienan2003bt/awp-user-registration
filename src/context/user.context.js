import React, { useEffect, useState } from 'react';
import LocalStorageHelper from '../helpers/localstorage.helper';

const UserContext = React.createContext({
    id: "",
    accessToken: "",
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = LocalStorageHelper.getItem("user");
        console.log("User data: ");
        console.log(userData);
        if(userData && userData?.accessToken) {
            setUser(userData);
        }
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};
