import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GET_MY_PROFILE } from '../graphqloperations/queries'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { loading, error, data } = useQuery(GET_MY_PROFILE)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if(!token){
     navigate('/login')
    return <h1>Unauthorized</h1>
    }
  if (loading) {
    return <p>Profile is Loading...</p>
  }


  return (
    <div className='container my-container'>
      <div style={{ margin: '40px' }} className='center-align'>
        <img alt='pic' className='circle' style={{ border: "2px solid" }} src='https://picsum.photos/seed/picsum/200/200' />
        <h5>{data.myProfile.firstName} {data.myProfile.lastName}</h5>
        <h5>Email - {data.myProfile.email}</h5>
      </div>
      <h3 className='center-align'>Your Quotes</h3>
      {data.myProfile.quotes.map((it, index) => {
        return (
          <div key={index}>
            <blockquote>
              <h6>{it.name}</h6>
            </blockquote>
          </div>)
      })

      }
    </div>
  )
}
