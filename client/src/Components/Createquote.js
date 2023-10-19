import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_QUOTE } from '../graphqloperations/mutations'


export default function Createquote() {
    const [quote, setQuote] = useState("")
    const handleSubmit = (e)=>{
           e.preventDefault()
           createQuote({
            variables:{
               name: quote
            }
           })
         setQuote('')
    }
    const [createQuote, { data, loading, error }] = useMutation(ADD_QUOTE,{
        refetchQueries:[
            'getAllQuotes',
            'getMyprofile'
        ]
    })
    if (loading) return <p>Loading...</p>
   
     
    return (
        <div className='container my-container'>
              {error &&
                <div className='red card-panel'>{error.message}</div>
            }
              {data &&
                <div className='green card-panel'>{data.quote.newQuoteD?.name}</div>
            }
            <form onSubmit={handleSubmit}>
                <h5>Add Quote</h5>
                <input
                    type='text'
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    name='quote'
                    required
                    placeholder='Write your quote here'
                />
                <button className='btn green' type='submit' style={{marginTop:"10px"}}>Create</button>
            </form>
        </div>
    )
}
