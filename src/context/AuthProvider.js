import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/Firebase.config';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleGoogle = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logout = () => {
        setLoader(true)
        localStorage.removeItem('genius-token')
        return signOut(auth)
    }

    const updateUserProfile = (profile) => {
        setLoader(true)
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = { user, loader, setLoader, createUser, handleGoogle, login, logout, updateUserProfile}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;