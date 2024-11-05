import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import LocalStorageHelper from '../helpers/localstorage.helper';

function PrivateRoute(props) {
    const { user, setUser } = useContext(UserContext);
    const { children } = props;
    const [isUserFetched, setIsUserFetched] = useState(false);

    useEffect(() => {
        const userData = LocalStorageHelper.getItem("user");
        if(userData && userData?.accessToken) {
            setUser(userData);
        }
        setIsUserFetched(true);
    }, [setUser]);


    if (isUserFetched === false) {
        return <h1>Loading...</h1>;
    }


    return (
        <>
            {(user && user.accessToken)
                ? <>
                    {children}
                </>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default PrivateRoute;