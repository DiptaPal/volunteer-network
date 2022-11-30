import React, { useState, useEffect } from 'react';

const Task = ({ task, handleUpdate }) => {
    const { event, _id, status} = task
    const [regEvent, setRegEvent] = useState([])
    useEffect(() => {
        fetch(`https://volunteer-network-server-diptapal.vercel.app/events/${event}`)
            .then(res => res.json())
            .then(data => setRegEvent(data))
    }, [event])
    const { title, url, date } = regEvent;
    return (
        <div className='flex gap-6 bg-white p-6 rounded-md flex-wrap'>
            <img src={url} className='w-[196px] h-[173px] object-cover object-center rounded-md' alt="" />
            <div>
                <div>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <h4 className='font-bold'>{date}</h4>
                </div>
                <div className='mt-10'>
                    <button onClick={() => handleUpdate(_id)} className={`py-2 px-6 rounded-md ${status ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'}`}>
                        {status ? status : 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;