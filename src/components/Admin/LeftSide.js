import React from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const LeftSide = ({handleTitle}) => {
    return (
        <div className='flex flex-col items-center lg:items-start gap-6 mb-6 lg:mb-0'>
            <Link onClick={() => handleTitle('Volunteer register list')} to='/admin/volunteer_list'>
                <button className='flex items-center gap-4 text-xl hover:text-blue-500'>
                    <BsPeopleFill></BsPeopleFill>
                    <p>Volunteer register list</p>
                </button>
            </Link>
            <Link to='/admin/add_event'>
                <button onClick={() => handleTitle('Add event')} className='flex items-center gap-4 text-xl hover:text-blue-500'>
                    <AiOutlinePlus></AiOutlinePlus>
                    <p>Add event</p>
                </button>
            </Link>
        </div>
    );
};

export default LeftSide;