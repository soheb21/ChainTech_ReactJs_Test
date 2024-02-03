import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { createUserInfoAsync, deleteUserInfoAsync, editUserInfoAsync, getUserInfoAsync, selectUserInfo, selectUserInfoError } from '../feature/userInfo/userInfoSlice';

const UserForm = () => {
    //Private Component
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const errorUserInfo = useSelector(selectUserInfoError);
    const authID = localStorage.getItem("auth")
    const [isEdit, setIsEdit] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0) //userReducer help the componet to refersh forcefull when needed
    const navigate = useNavigate();//then we travel from one to another component
    //creating all userInfo fileds
    const insitializeUserInfo = {
        firstName: "",
        lastName: "",
        age: "",
        qualification: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",


    }

    const [userInfo, setUserInfo] = useState(insitializeUserInfo);
    const handleChange = (e) => {
        e.preventDefault();
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            dispatch(editUserInfoAsync({ ...userInfo, id: user._id }))
            setIsEdit(false);
            setUserInfo({
                firstName: "",
                lastName: "",
                age: "",
                qualification: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                email: "",

            })
        } else {
            console.log("userinfo", userInfo)
            if (userInfo.firstName !== "" && userInfo.email) {
                dispatch(createUserInfoAsync({ ...userInfo, userId: authID }))
                setUserInfo({
                    firstName: "",
                    lastName: "",
                    age: "",
                    qualification: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    email: "",

                })
            }

        }
        forceUpdate();
    }
    const handleEdit = (e) => {
        e.preventDefault();
        setUserInfo({ ...user })
        setIsEdit(true)

    }

    const handleDelete = () => {
        dispatch(deleteUserInfoAsync(user._id))
        setIsEdit(false);
        forceUpdate();
    }
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            navigate("/registration")
        }, 500)
        forceUpdate();
    }
    useEffect(() => {
        dispatch(getUserInfoAsync(authID))
    }, [dispatch, setIsEdit, ignored])


    return (
        <form className="row g-3">

            <div className="col-md-6">
                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                <input type="text" onChange={handleChange} name="firstName" value={userInfo.firstName ||''} required className="form-control" id="inputFirstName" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                <input type="text" onChange={handleChange} name="lastName" value={userInfo.lastName ||''} required className="form-control" id="inputLastName" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputAge" className="form-label">Age</label>
                <input type="number" onChange={handleChange} name="age" value={userInfo.age ||''} required className="form-control" id="inputAge" />
            </div>

            <div className="col-md-6">
                <label htmlFor="inputQualification" className="form-label">Qualification</label>
                <input type="text" onChange={handleChange} name="qualification" value={userInfo.qualification ||''} required className="form-control" id="inputQualification" />
            </div>

            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address</label>
                <input type="text" onChange={handleChange} name="address" value={userInfo.address ||''} required className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" onChange={handleChange} name="city" value={userInfo.city ||''} required className="form-control" id="inputCity" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">State</label>
                <input type="text" onChange={handleChange} name="state" value={userInfo.state ||''} required className="form-control" id="inputCity" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input type="text" onChange={handleChange} name="zip" value={userInfo.zip ||''} required className="form-control" id="inputZip" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail7" className="form-label">email</label>
                <input type="email" onChange={handleChange} name="email" value={userInfo.email} required className="form-control" id="inputEmail7" />
            </div>
            {
                user && user
                    ? <div className="col-12 mb-4">
                        <button onClick={handleEdit} className="btn btn-warning me-2">Edit</button>
                        <button onClick={handleDelete} className="btn btn-danger me-2">delete</button>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>

                    </div>
                    : <div className="col-12 mb-4">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
            }

            {errorUserInfo && <p>😢: <span className="btn btn-danger me-2">{errorUserInfo}</span></p>}

            <button onClick={handleLogout} className="btn btn-danger">Singout</button>
        </form>


    )
}

export default UserForm