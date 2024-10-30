import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import App from './App';
export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
]);

