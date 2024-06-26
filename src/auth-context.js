"use client";

import { useContext, createContext, useState, useEffect } from "react";

import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const gitHubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            return await signInWithPopup(auth, provider)
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Sign in popup was closed')
            } else {
                console.error('Error signin in to Github')
            }
        }
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, provider)
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Sign in popup was closed')
            } else {
                console.error('Error signin in to Google')
            }
        }
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, gitHubSignIn, googleSignIn, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};
