//Define Schema
export const typeDefs = `#graphql
type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[Quotewithname]
    iquote(by:ID!):[Quote]
    myProfile:User
}

type User{
    _id: String
    firstName: String
    lastName:String
    email: String
    quotes:[Quote]
    password: String
}

type Quote{
    name: String
    by: String
}

type Quotewithname{
    by: IdName
    name: String
}

type IdName{
    _id:String
    firstName: String
    email:String
}

type Token{
    token: String
     message: String
}

type quotemess{
    message: String
    newQuoteD : Quote
}

type Mutation{
    signupUser(userNew:UserInput!): User
    signinUser(userSignin: UserSignInput!): Token
    createQuote(name:String!):quotemess   
}

input UserInput{
    firstName:String! 
    lastName: String! 
    email: String! 
    password: String!
}


input UserSignInput{
    email:String!
    password: String!
}

`

export default typeDefs

