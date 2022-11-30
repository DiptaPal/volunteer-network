import React, { useState, useEffect } from 'react';
import Event from './Event';

const Home = () => {
    const [globalDatas, setGlobal] = useState([])
    const [events, setEvents] = useState([]);

    //pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [count, setCount] = useState(0)


    useEffect(() => {
        fetch(`https://volunteer-network-server-diptapal.vercel.app/events?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data.event)
                setGlobal(data.event)
                setCount(data.count);
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    const handleSearch = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const result = events.filter(event => event.title.toLowerCase().includes(name.toLowerCase()))
        setEvents(result)
    }
    const handleDynamicSearch = e => {
        const name = e.target.value;

        if (name.length === 0) {
            setEvents(globalDatas);
        }
        else {
            const result = globalDatas.filter(glbdata => glbdata.title.toLowerCase().includes(name.toLowerCase()))
            setEvents(result);
        }
    }
    return (
        <div>
            <h2 className='text-4xl font-bold text-center mt-12 uppercase'>I grow by helping people in need.</h2>
            <div className='flex justify-center items-center mt-8 mb-10'>
                <form onSubmit={handleSearch} className='flex flex-col sm:flex-row'>
                    <input onChange={handleDynamicSearch} className='py-2 rounded-l-md rounded-r-md sm:rounded-r-none outline-none text-xl pl-2 w-auto sm:w-72' type="text" name="name" id="event" placeholder='Search....' />
                    <button type='submit' className='bg-blue-500 text-xl py-2 px-6 rounded-l-md sm:rounded-l-none mt-3 sm:mt-0 rounded-r-md text-white'>Search</button>
                </form>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
                {
                    events.map(event => <Event
                        key={event._id}
                        event={event}
                    ></Event>)
                }
            </div>

            <div className="flex items-center justify-center space-x-1 text-gray-800 mt-10">
                <span className="block">Page {page+1} of {pages}</span>
                {
                    [...Array(pages).keys()].map(number => <button key={number} type="button" className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md text-white ${page === number ? 'bg-blue-500 border-blue-500' : 'bg-gray-50 , text-black border-gray-100'}`} 
                    title={`Page ${number + 1}`}
                    onClick={() => setPage(number)}
                    >{number + 1}</button>)
                }
            </div>

            <div className='mt-10 flex justify-center items-center'>
                Page Preview:
                <select onChange={event => setSize(event.target.value)} className="appearance-none px-2 py-2 rounded-md ml-2">
                    <option defaultValue='5'>5</option>
                    <option selected defaultValue='10'>10</option>
                    <option defaultValue='15'>15</option>
                    <option defaultValue='20'>20</option>
                </select>
            </div>
        </div>
    );
};

export default Home;