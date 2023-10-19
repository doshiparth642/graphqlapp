import Createquote from './Components/Createquote';
import Home from './Components/Home';
import Login from './Components/Login';
import Notfound from './Components/Notfound';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import UserProfile from './Components/UserProfile';



export const routes = [  
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/create", element: <Createquote /> },
    { path: "/profile", element: <Profile /> },
    { path: "/signup", element: <Signup /> },
    {path:"/profile/:userid", element:<UserProfile />},
    {path:'*', element:<Notfound />}

]