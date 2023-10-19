
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SIGNIN_USER } from '../graphqloperations/mutations'
import { useMutation } from '@apollo/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
   const [formData,setFormData]= useState({
    email:"",
    password:""
   })
   const [loginUser, { data, loading, error }] = useMutation(SIGNIN_USER,{
    onCompleted(data){
        localStorage.setItem('token', data.signinUser.token)
        navigate('/')
    }
   })
   
   const navigate = useNavigate()
   
   const handleChange= (e)=>{
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
        })
    }
    if (loading) return <p>Loading...</p>;


    const handleSubmit =(e)=>{
       e.preventDefault()
       loginUser({
         variables:{
            userSignin : formData
         }
       })
       toast.success(data?.signinUser.message,{
        position:toast.POSITION.TOP_RIGHT
       })
    }
 
    return (
        <>
        <div className='container my-container'>
            {error &&
                <div className='red card-panel'>{error.message}</div>
            }
            {data &&
             console.log("Data And Value is", data)
             }

            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Link to={'/signup'}><p>Don't have an account?</p></Link>
                <button className="btn #673ab7 deep-purple" style={{marginTop:"10px"}}  type='submit'>Login</button>
            </form>
            <ToastContainer />
        </div>
        </>
    )
}
