import React from 'react'
import { GET_MY_PROFILE, GET_ONE_USER } from '../graphqloperations/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
    const {userid}= useParams()
    const { loading, error, data } = useQuery(GET_ONE_USER,{
        variables:{
           _id: userid
        }
    })
    if(loading){
        return <h2>Profile is Loading</h2>
    }

    if(error){
        console.log(error)
    }

    return (
        <div className='container my-container'>
          <div style={{ margin: '40px' }} className='center-align'>
            <img alt='pic' className='circle' style={{ border: "2px solid" }} src='https://picsum.photos/seed/picsum/200/200' />
            <h5>{data.user.firstName} {data.user.lastName}</h5>
            <h5>Email - {data?.user.email}</h5>
          </div>
          <h3 className='center-align'>Your Quotes</h3>
          {data.user.quotes.map((it, index) => {
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
