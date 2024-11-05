import React, { useEffect, useState } from 'react';
import LocalStorageHelper from '../helpers/localstorage.helper';

const UserContext = React.createContext({
    id: "",
    email: "",
    username: "",
    accessToken: "",
});


function UserContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userData = LocalStorageHelper.getItem("user");
        console.log("User data: ");
        console.log(userData);
        if(userData && userData?.email) {
            setUser(userData);
        }
        
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};
