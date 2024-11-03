import React from 'react'
import './Css/NotFound.css';
import { useNavigate } from 'react-router';
export default function Error404() {
    const navigate = useNavigate();
    const goBackHome = () => {
        navigate('/');
    }
    return (
        <div className="not-found-container">
            <div className="image-container">
                {[1, 2, 3].map((index) => {
                    const randomDuration = `${Math.random() * 3 + 3}s`; // Generate a unique duration for each image
                    return (
                        <img
                            key={index}
                            style={{ animationDuration: randomDuration }}
                            src="/diedfish.png"
                            alt="404"
                            className="not-found-image"
                        />
                    );
                })}
            </div>
            <p className="not-found-text">Oops! Page not found.</p>
            <button className="home-button" onClick={() => goBackHome()}>
                Back to Homepage
            </button>
        </div>
    )
}
