import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContext } from '../../context/toast.context';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service';
import LocalStorageHelper from '../../helpers/localstorage.helper';

function LogoutButton(props) {
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext)

    const onLogout = async () => {
        try {
            const response = await UserService.logout();
            console.log("Logout response: ", JSON.stringify(response));
            if (response && +response?.statusCode === 200) {
                LocalStorageHelper.removeItem("user");
                navigate("/login");
                showToast("Logged out successfully!", "success");
            } else {
                showToast(response?.message ?? "Error logging out, please try again!", "error");
            }
        } catch (error) {
            showToast(error?.message ?? "API Error logging out, please try again!", "error");
        }
    }

    return (
       
        <Button variant='warning' onClick={() => onLogout()}>Log out</Button>
    );
}

export default LogoutButton;