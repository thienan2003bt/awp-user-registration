import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
    const navigate = useNavigate();

    return (
        <div className='w-100 text-bg-light d-flex flex-column align-items-center justify-content-center'
            style={{ height: "80vh" }}
        >
            <h1>This is HomePage</h1>

            <div className='d-flex w-100 justify-content-center align-items-center gap-3 my-2'>
                <Button variant='success' onClick={() => navigate("/register")}>Go to Register</Button>
                <Button variant='primary' onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
        </div>
    );
}

export default HomePage;