import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/MainRoutes/MainRoutes';

function App() {
  return (
    <div className='bg-[#e5e5e5]'>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <RouterProvider router={router}>

        </RouterProvider>
      </div>
    </div>
  );
}

export default App;
