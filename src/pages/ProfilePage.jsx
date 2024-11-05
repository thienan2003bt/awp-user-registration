import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import { ToastContext } from '../context/toast.context';

function ProfilePage(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isUserFetched, setIsUserFetched] = useState(false);

    const { showToast } = useContext(ToastContext);
    
    useEffect(() => {
        const fetchUserProfile = async () => { 
            const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
            if (!accessToken) {
                navigate("/login");
            }
        
            try {
                const response = await UserService.getUserProfile(accessToken);
                if (response && response.data) {
                    setUser(response.data);
                } else {
                    showToast(response?.message ?? "Error fetching user profile, please try again!", "error");
                }
            } catch (error) {
                showToast(error.message ?? "Error fetching user profile, please try again!", "error");
                console.error("Error fetching user profile: ", error);
            } finally {
                setIsUserFetched(true);
            }
        }
        fetchUserProfile();
    }, [navigate, showToast]);

    if (!isUserFetched) {
        return (
            <div className='w-100 text-bg-light d-flex flex-column align-items-center justify-content-center'
                style={{ height: "80vh" }}
            >
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='w-100 text-bg-light d-flex flex-column align-items-center justify-content-center'
            style={{ height: "80vh" }}
        >           
            <h1>Profile Page</h1>
            <div className='w-75 d-flex justify-content-center align-items-center text-start'
                style={{ minHeight: "50vh", margin: "20px 0" }}
            >
                <div className='w-25 d-flex flex-column justify-content-center align-items-center gap-1'>
                    <img src="https://avatar.iran.liara.run/public" alt="profile" width={"160px"} />
                    <i>ID: {user?.id}</i>
                </div>

                <div className='w-75 d-flex flex-column justify-content-center align-items-start gap-2'>
                    <h4>Username: {user?.username}</h4>
                    <h4>Fullname: {user?.fullname}</h4>
                    <h3>Email: {user?.email}</h3>
                    <h4>Address: {user?.address}</h4>
                </div>
            </div>

            <div className='d-flex w-100 justify-content-center align-items-center gap-3 my-2'>
                <Button variant='success' onClick={() => navigate("/register")}>Go to Register</Button>
                <Button variant='primary' onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
        </div>
    );
}

export default ProfilePage;