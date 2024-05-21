import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const [user, setUser] = useState(null);

        useEffect(() => {
            const token = localStorage.getItem('token');
            const name = localStorage.getItem('name');
            const userId = localStorage.getItem('_id');

            if (!token || !name || !userId) {
                navigate('/login'); // Redirect to login if token or name or userId is missing
            } else {
                setUser({ name, userId });
            }
        }, [navigate]);

        if (!user) {
            return <div>Loading...</div>; // Or a loading spinner, or some other fallback
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAuth;
