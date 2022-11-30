import React,{useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Task from './Task';


const Tasks = () => {
    const {user, logout} = useContext(AuthContext)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`https://volunteer-network-server-diptapal.vercel.app/volunteer?email=${user?.email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem('volunteer-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
              return  logout()
            }
            return res.json()
        })
        .then(data => setTasks(data))
    }, [user?.email, logout])

    const handleUpdate = id =>{
        fetch(`https://volunteer-network-server-diptapal.vercel.app/volunteer/${id}`,{
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({status: 'Canceled'})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                const  remaining = tasks.filter(cncl => cncl._id !== id)
                const canceling = tasks.find(cncl => cncl._id === id)
                canceling.status = 'Canceled';

                const newTasks = [canceling, ...remaining];
                setTasks(newTasks)
            }
        })
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-16'>
            {
                tasks.map(task => <Task
                    key={task._id}
                    task={task}
                    handleUpdate={handleUpdate}
                ></Task>)
            }
        </div>
    );
};

export default Tasks;