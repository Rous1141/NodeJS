import React from 'react';
import { useForm } from 'react-hook-form';
import './Css/Login.css';
import { login } from '../Api/login';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse)
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } })
            console.log(await userInfo.data)
        },
        onError: error => alert(error)
    })
    const onSubmit = async (data) => {
        const response = await login(data)
        // Login logic here with the Token in response
         if (!response) {
            alert("Something went wrong, cannot login!")
        }
        else {
            const token = await response.data.token
            if(token===undefined) {
                alert("Network Error")
            }
            sessionStorage.setItem("token", token)
            navigate("/category")
            alert("Login Complete!")
        }
    };

    return (
        <div className='container'>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}

                    <button type="submit">Login</button>
                </form>
                <button className="google-login-button" onClick={()=>handleGoogleLogin()}>
                    <img
                        src="./ggicon.png"
                        alt="Google icon"
                        className="google-icon"
                    />
                    Login with Google
                </button>
                <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign up here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;
