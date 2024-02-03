import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom';
import { loginAsync, registerAsync, selectAuthError } from '../feature/auth/authSlice';

const AuthForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorAuth = useSelector(selectAuthError)
    const [isLogin, setIsLogin] = useState(false);
    const insitializeAuthUser = {
        username: "",
        email: "",
        password: ""
    }
    const [user, setUser] = useState(insitializeAuthUser);
    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })

    }
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAsync(user));

        setTimeout(()=>{
            navigate("/")
        },500)

    }


    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                {
                    isLogin
                        ? <>
                            <div className="row mb-3">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={user.username} name='username' className="form-control" id="inputName" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" onChange={handleChange} value={user.email} name='email' className="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input autoComplete="on" type="password" onChange={handleChange} value={user.password} name='password' className="form-control" id="inputPassword3" />
                                </div>
                            </div>
                        </>
                        : <>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" onChange={handleChange} value={user.email} name='email' className="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input autoComplete="on" type="password" onChange={handleChange} value={user.password} name='password' className="form-control" id="inputPassword3" />
                                </div>
                            </div>
                        </>
                }
                {
                    isLogin
                        ? <>
                            <p>Already have an accout? <span onClick={() => setIsLogin(!isLogin)}>Login</span></p>
                            <button onClick={() => dispatch(registerAsync(user))} type="submit" className="btn btn-primary">Register</button>
                        </>
                        : <>
                            <p>create an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span></p>
                            <button onClick={handleLogin} type="submit" className="btn btn-primary">Login</button>
                        </>
                }

                {errorAuth && <p>😢: <span className="btn btn-danger me-2 w-100">{errorAuth}</span></p>}

            </form>

        </div>
    )
}

export default AuthForm