import React, { useState, useEffect } from 'react';
import delete_btn from '../../assets/logos/trash-2 9.png'
const RightSide = () => {
    const [volunteers, setVolunteers] = useState([])
    useEffect(() => {
        fetch('https://volunteer-network-server-diptapal.vercel.app/volunteers')
            .then(res => res.json())
            .then(data => setVolunteers(data))
    }, [])

    const handleDelete = (id) =>{
        const agree = window.confirm(`Are you sure, you want to cancel this order`)
        if(agree){
            fetch(`https://volunteer-network-server-diptapal.vercel.app/volunteers/${id}`,{
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    const remaining = volunteers.filter(volun => volun._id !== id)
                    setVolunteers(remaining)
                }
            })
        }
    }
    return (
        <div className="flex flex-col p-3 bg-white rounded-md">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th scope="col" className="text-sm font-medium rounded-l-md px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4">
                                        Email ID
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4">
                                        Registering date
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4">
                                        Volunteer list
                                    </th>
                                    <th scope="col" className="text-sm rounded-r-md font-medium px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    volunteers.map(volunteer =>
                                        <tr className="bg-white border-b" key={volunteer._id}>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {volunteer.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {volunteer.email}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {volunteer.date}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {volunteer.eventName}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => handleDelete(volunteer._id)} className='p-2 bg-red-500 rounded-md'>
                                                    <img src={delete_btn} className='w-8 h-8' alt="" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;