import { gql } from "@apollo/client";


export const SIGNUP_USER = gql`
mutation createUser($userNew:UserInput!){
    signupUser(userNew:$userNew){
      _id
      firstName
      lastName
      email
      password
    }
  }`

  export const SIGNIN_USER = gql`
  mutation LoginUser($userSignin:UserSignInput!){
    signinUser(userSignin:$userSignin){
      token
      message
    }
  }`

  export const ADD_QUOTE = gql`
  mutation AddQuote($name:String!){
    quote: createQuote(name:$name){
      message
      newQuoteD{
        name
      }
    }
  }
  `