import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ProfileRedirect = () => {
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // Not logged in -> go to User Login by default
                setRedirectPath('/user-login');
                setLoading(false);
                return;
            }

            try {
                // Check if User
                const userDocRef = doc(db, 'Users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setRedirectPath('/user-dashboard');
                    setLoading(false);
                    return;
                }

                // Check if Admin
                const adminDocRef = doc(db, 'Admin', user.uid);
                const adminDoc = await getDoc(adminDocRef);

                if (adminDoc.exists()) {
                    setRedirectPath('/admin-dashboard');
                    setLoading(false);
                    return;
                }

                // If logged in but no role doc found (shouldn't happen ideally)
                console.warn('User logged in but no role document found.');
                setRedirectPath('/');
                setLoading(false);

            } catch (error) {
                console.error('Error checking user role:', error);
                setRedirectPath('/');
                setLoading(false);
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '60vh',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
            }}>
                Loading Profile...
            </div>
        );
    }

    return <Navigate to={redirectPath} replace />;
};

export default ProfileRedirect;
