import { func } from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import {auth} from "../firebase"
export const AuthContext = React.createContext(); //creating a context

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logOut() {
        return auth.signOut();
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            //mount hone pr bta dega ki user present hai ya nahi
            setCurrentUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const value = {
        //ye saare functions bnakr context me daal diye taaki iske children me yhi se use krle waha na likhne pde
        currentUser,
        logIn,
        signUp,
        logOut,
    };
    return (
        <AuthContext.Provider value={value}>
            {/* children is a prop */}
            {!loading ? children : <></>}           
        </AuthContext.Provider>
    );
}

export default AuthProvider;
