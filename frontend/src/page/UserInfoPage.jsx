import React from 'react'
import { useSelector } from 'react-redux';
import UserForm from '../components/UserForm'
import { selectUserInfo } from '../feature/userInfo/userInfoSlice';

const UserInfoPage = () => {
    //Private Component
    const user = useSelector(selectUserInfo);
    return (
        <>
            <UserForm />
            {
                user && <div className="">
                    <p>{user && `First Name: ${user.firstName}`}</p>
                    <p>{user && `Last Name: ${user.lastName}`}</p>
                    <p>{user && `Age: ${user.age}`}</p>
                    <p>{user && `Email: ${user.email}`}</p>
                    <p>{user && `Qaulification: ${user.qualification}`}</p>
                    <p>{user && `Address: ${user.address}`}</p>
                    <p>{user && `state: ${user.state}`}</p>
                    <p>{user && `city: ${user.city}`}</p>
                    <p>{user && `zip: ${user.zip}`}</p>
                </div>

            }
        </>
    )
}

export default UserInfoPage