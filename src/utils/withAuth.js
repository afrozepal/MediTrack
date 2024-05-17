import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (!token || !username) {
                navigate('/login'); // Redirect to login if token or username is missing
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;


