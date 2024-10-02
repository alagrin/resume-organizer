import React, { useState, useEffect } from 'react';
import {getCurrentUser} from 'aws-amplify/auth';
import RegisterUser from './users/RegisterUser';

const LandingPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthState();
    }, []);

    async function checkAuthState() {
        try {
            await getCurrentUser();
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        }
    }

    return (
        <div className="landing-page">
            <h1>Welcome to Our Application</h1>
            <div className="image-placeholder">
                {/* Replace with actual image component when available */}
                <div style={{ width: '300px', height: '200px', backgroundColor: '#ccc', margin: '20px auto' }}>
                    Image Placeholder
                </div>
            </div>
            {!isAuthenticated && (
                <div className="register-section">
                    <h2>New User? Register Here</h2>
                    <RegisterUser />
                </div>
            )}
            {isAuthenticated && (
                <p>You are logged in. Welcome!</p>
            )}
        </div>
    );
};

export default LandingPage;
