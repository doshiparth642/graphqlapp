import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_Quotes, GET_ALL_USERS } from '../graphqloperations/queries'
import { Link } from 'react-router-dom';

export default function Home() {
  const {loading, error, data} = useQuery(GET_ALL_Quotes)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  // client.query({
  //   query:gql` query getAllQuotes{
  //             quotes{
  //               name
  //               by{
  //                 _id
  //                 firstName
  //                 email
  //               }
            
  //             }
  //           }`
  // })  .then((result) => console.log(result));

  if(data.quotes.length == 0){
    return <h3>No Quotes Available</h3>
  }

  return (
    <div className='container'>
      {data.quotes.map((it, index)=>{
        return (<div key={index}>
        <blockquote>
            <h6>{it.name}</h6>
            <Link to={`/profile/${it.by._id}`}><p className='right-align'>~ {it.by.firstName}</p></Link>
        </blockquote>
        </div>)
      })}
    </div>
  )
}
