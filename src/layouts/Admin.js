import React,{useState} from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from '../components/Admin/LeftSide';
import AdminHeader from '../components/Shared/Header/AdminHeader';

const Admin = () => {
    const [title, setTitle] = useState('Volunteer register list');
    const handleTitle = (name) =>{
        setTitle(name)
    }
    return (
        <div>
            <AdminHeader title={title}></AdminHeader>
            <div className='grid grid-cols-12 mt-10'>
                <div className='col-span-12 lg:col-span-3'>
                    <LeftSide handleTitle={handleTitle}></LeftSide>
                </div>
                <div className='col-span-12 lg:col-span-9 my-4 rounded-md'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Admin;