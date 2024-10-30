import React from 'react';
import { useForm } from 'react-hook-form';
import './Css/Login.css';
import { login } from '../Api/login';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
       const response = await login(data)
       console.log(response)
        // Handle login logic here
        if(!response){
            alert("Cannot Connect To Server")
        }
        else if(response.status>300){
            alert("Something went wrong, cannot login!")
        }
        else{
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
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up here</a>.
                </p>
            </div>
        </div>
    );
};

export default Login;
