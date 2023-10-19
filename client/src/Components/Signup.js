import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SIGNUP_USER } from '../graphqloperations/mutations'

export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const navigate = useNavigate()
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER)
    if (loading) return <p>Loading...</p>;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signupUser({
            variables: {
                userNew: formData
            }
        })
        setFormData('')
        navigate('/login')
    }
    return (
        <div className='container my-container'>
            {error &&
                <div className='red card-panel'>{error.message}</div>
            }

            {data &&
                <div className='green card-panel'>{data.signupUser.firstName}</div>
            }
            <h5>Sign In!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    name='firstName'
                    type='text'
                    placeholder='First Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    name='lastName'
                    type='text'
                    placeholder='Last Name'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
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
                <Link to={'/login'}><p>Already have an account?</p></Link>
                <button style={{ marginTop: "10px" }} className="btn #673ab7 deep-purple" type='submit'>Submit</button>
            </form>
        </div>
    )
}
