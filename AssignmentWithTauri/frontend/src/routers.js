import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import App from './App';
import Error404 from './Components/Error404';
import Category from './Components/Category';
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
        element: <Register/>
    },
    {
        path: "/category",
        element: <Category/>
    },
    {
        path: "*",
        element: <Error404/>
    }
]);

