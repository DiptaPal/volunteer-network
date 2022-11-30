import { createBrowserRouter } from 'react-router-dom';
import Admin from '../../layouts/Admin';
import VolunteerList from '../../components/Admin/VolunteerList';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import VolunteerRegister from '../../components/VolunteerRegister/VolunteerRegister';
import Main from '../../layouts/Main';
import AddEvent from '../../components/Admin/AddEvent';
import Tasks from '../../components/Task/Tasks';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            }
            ,
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/volunteer_register/:id',
                element: <PrivateRoute><VolunteerRegister></VolunteerRegister></PrivateRoute>,
                loader: ({params}) => fetch(`https://volunteer-network-server-diptapal.vercel.app/events/${params.id}`)
            },
            {
                path: 'tasks',
                element: <PrivateRoute><Tasks></Tasks></PrivateRoute>
            }
        ],
        
    },
    {
        path:'/admin',
        element:<Admin></Admin>,
        children:[
            {
                path: '/admin',
                element: <VolunteerList></VolunteerList>
            },
            {
                path: '/admin/volunteer_list',
                element: <VolunteerList></VolunteerList>
            },
            {
                path: '/admin/add_event',
                element: <AddEvent></AddEvent>
            }
        ]
    }
])
export default router;
