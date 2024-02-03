
import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {


    //creating protecter who proctect the private component if user is not login
    const authUser = localStorage.getItem("auth")
    console.log(authUser)
    if (authUser) {
        return children
    }
    else {
        return <Navigate to={"/registration"} />;

    }

}

export default Protected