import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';

const VolunteerRegister = () => {
    const { user } = useContext(AuthContext)
    const event = useLoaderData();
    const navigate = useNavigate();

    const { title, _id } = event;
    const handleVolunteerRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.reg_date.value;
        const email = form.email.value;
        const description = form.description.value;
        const volunteer = {
            event: _id,
            eventName: title,
            name,
            email,
            date,
            description
        }

        fetch('https://volunteer-network-server-diptapal.vercel.app/volunteer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(volunteer)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    form.reset()
                    toast.success('Registration Successfully', { autoClose: 800 })
                    navigate('/tasks')
                }
            })
    }
    return (
        <div className='flex justify-center items-center'>
            <div className='border-2 border-blue-500 rounded-md flex flex-col md:flex-row items-center justify-around gap-16 my-20 px-6'>
                <div>
                    <div className="w-full md:min-w-[500px] max-w-md px-8 py-16 space-y-3 rounded-xl border text-gray-800">
                        <h1 className="text-2xl font-bold text-center">Register as a Volunteer</h1>
                        <form onSubmit={handleVolunteerRegister} className="space-y-6 ng-untouched ng-pristine ng-valid">
                            <div className="space-y-2 text-sm">
                                <label htmlFor="name" className="block text-gray-600 font-bold">Name</label>
                                <input type="text" name="name" id="name" placeholder="Your Name" className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="email" className="block text-gray-600 font-bold">Email</label>
                                <input type="email" name="email" id="email" defaultValue={user?.email} placeholder="Your Email" className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600" />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="date" className="block text-gray-600 font-bold">Date</label>
                                <input type="date" name="reg_date" id="date" placeholder="Date" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 border text-gray-800 focus:border-blue-600"  required/>
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="description" className="block text-gray-600 font-bold">Description</label>
                                <input type="text" name="description" id="date" placeholder="Description" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 border text-gray-800 focus:border-blue-600" />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="work_as" className="block text-gray-600 font-bold">Title</label>
                                <input type="text" name="Title" id="Title" defaultValue={title} readOnly placeholder="Title" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 border text-gray-800 focus:border-blue-600" />
                            </div>
                            <button type='submit' className="block w-full p-3 text-center rounded-md text-white bg-blue-500">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegister;