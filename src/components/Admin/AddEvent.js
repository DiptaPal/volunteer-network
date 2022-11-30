import React from 'react';
import { toast } from 'react-toastify';

const AddEvent = () => {
    const handleAddEvent = event =>{
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const description = form.description.value;
        const url = form.url.value;
        const eventDetails = {
            title,
            date,
            description,
            url,
        }
        fetch('https://volunteer-network-server-diptapal.vercel.app/events',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(eventDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                form.reset()
                toast.success('Event Insert Successfully', {autoClose: 800})
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleAddEvent}>
                <div className='p-4 px-8 bg-white rounded-md'>
                    <div className='flex justify-between items-center'>
                        <div className='w-[45%]'>
                            <label htmlFor="title" className='font-bold'>
                                Event Title
                            </label>
                            <input className='block py-2 mt-2 pl-2 outline-none border rounded-md w-full' type="text" name="title" id="title" placeholder='Event Title' required />
                        </div>
                        <div className='w-[45%]'>
                            <label htmlFor="date" className='font-bold'>
                                Event Date
                            </label>
                            <input className='block py-2 mt-2 pl-2 outline-none border rounded-md w-full' type="date" name="date" id="date" placeholder='Event Date' required/>
                        </div>
                    </div>
                    <div className='flex justify-between mt-8'>
                        <div className='w-[45%]'>
                            <label htmlFor="description" className='font-bold'>
                                Event Description
                            </label>
                            <textarea className='block mt-2 resize-none pl-2 outline-none border rounded-md w-full' name="description" id="description" rows="10" placeholder='Event Description' required></textarea>
                        </div>
                        <div className='w-[45%]'>
                            <label htmlFor="url" className='font-bold'>
                                Event Image URL
                            </label>
                            <input className='block py-2 mt-2 pl-2 outline-none border rounded-md w-full' type="text" name="url" id="url" required />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end items-end mt-4'>
                    <button className='bg-blue-500 text-white py-2 px-5 rounded-md' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;