import React from 'react';
import { Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/common/AppHeader';
import AppFooter from '../components/common/AppFooter';

function MainLayout(props) {
    return (
        <Stack id="main-layout" className='text-bg-secondary justify-content-start align-items-center'
            style={{ width: '80vw', margin: "0 10vw"}}
        >
            <div className='w-100 d-flex flex-column justify-content-between align-items-center' style={{ height: "100vh" }}>
                
                <AppHeader />
                <Outlet />
                <AppFooter />
            </div>
        </Stack>
    );
}

export default MainLayout;