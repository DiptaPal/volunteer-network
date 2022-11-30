import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({event}) => {
    const {_id, url, title} = event;

    const colors = ['bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-gray-500', 'bg-pink-500', 'bg-red-500', 'bg-slate-500', 'bg-lime-500', 'bg-violet-500', 'bg-purple-500']
    const i = Math.floor(Math.random() * colors.length);
    return (
        <Link to={`/volunteer_register/${_id}`} className='relative'>
            <img src={url} alt="" />
            <h3 className={`${colors[i]} text-white py-5 text-center text-xl font-bold absolute bottom-0 w-full rounded-b-lg`}>{title}</h3>
        </Link>
    );
};

export default Event;