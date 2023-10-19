import { gql } from "@apollo/client";

export const GET_ALL_Quotes = gql`
query getAllQuotes{
    quotes{
      name
      by{
        _id
        firstName
        email
      }
  
    }
  }`

export const GET_ALL_USERS = gql`
  query getAllUser{
    users{
      _id
      email
      firstName
      lastName
      quotes{
        name
        by
      }
    }
  }`

export const GET_MY_PROFILE = gql`
  query getMyprofile{
      myProfile{
        firstName
          lastName
          email
          quotes{
            name
          }
      }
  }`

export const GET_ONE_USER = gql`
query OneUser($_id:ID!){
  user(_id:$_id){
    _id
    firstName
    lastName
    email
    quotes{
      name
    }
  }
}
`  

