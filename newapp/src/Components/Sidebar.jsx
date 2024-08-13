import React from 'react';

export function Sidebar({ vis }) {

    return (
        <div id='sidebar' className='py-4 bg-light'>
            <ul style={{ listStyle: 'none' }}>
                <li className='py-2 mx-5'><button className='btn btn-danger' onClick={vis}>+ Add New Task</button></li>
                <li className='py-2 mx-5'><button className='btn btn-danger'>Today</button></li>
                <li className='py-2 mx-5'><button className='btn btn-danger'>Next 7 days</button></li>
            </ul>
        </div>
    );
}