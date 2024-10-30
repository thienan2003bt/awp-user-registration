import React, { useState } from 'react';

const UserContext = React.createContext({
    email: "",
    username: "",
    password: "",
});


function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};
