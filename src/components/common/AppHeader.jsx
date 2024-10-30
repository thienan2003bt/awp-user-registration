import React from 'react';

function AppHeader(props) {
    return (
        <div id="app-header" className='w-100 d-flex justify-content-between align-items-center px-2 mb-3 gap-5'
            style={{ height: '7vh' }}
        >
            <h4 className='fs-5 text-start'>IA-3</h4>
            <h1 className='fs-1 text-center'>User Registration</h1>
            <h4 className='fs-5 text-end'>Advanced Web Programming</h4>
        </div>
    );
}

export default AppHeader;