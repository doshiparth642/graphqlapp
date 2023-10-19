import mongoose, { Error } from "mongoose"
import { users, quotes } from "./fakedb.js"
import { randomBytes } from 'crypto'
import { User } from "./models/User.js"
import { Quote } from "./models/Quote.js"
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken"

//Define Resolvers For that Schema
export const resolvers = {
    Query: {
        users: async() =>await User.find({}),
        user: async(_parent, { _id }) => await User.findOne({_id}),
        quotes: async() =>await  Quote.find({}).populate("by","_id firstName email"),
        iquote: async(_parent, { by }) =>await Quote.find({by}),
        myProfile:async(_,args,{userId})=> {
             if(!userId) throw new Error('You must be Logged in!!')
          return await User.findOne({_id: userId})}
    },
    User: {
        quotes: async(ur) =>await Quote.find({by:ur._id})
    },

    Mutation: {
        signupUser: async (_parent, { userNew }) => {
            const user = await User.findOne({ email: userNew.email })
            if (user) {
                throw new Error("User already exists with that email")
            }
            const hashPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                password: hashPassword
            })
            return await newUser.save()
        },

        signinUser: async (_parent, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error("User Doesn't exists with that email")
            }

            const doMatch = await bcrypt.compare(userSignin.password, user.password)

            if (!doMatch) {
                throw new Error('Email or Password is invalid')
            }

            const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRECT)

            return {
                token,
                message: "Login Successfully"
            }

            // const hashPassword =await bcrypt.hash(userNew.password, 12)

            // const newUser =new User({
            //     ...userNew,
            //     password:hashPassword
            // })        
            // return await newUser.save()
        },
        createQuote: async (_, { name }, { userId }) => {
            if (!userId) throw new Error('You Must be Login!!')
            const newQuote = new Quote({
                name,
                by: userId
            })

            const newQuoteD = await newQuote.save()
            return {
                newQuoteD,
                message: "Quote Saved Successfully"
            }
        }




        //    const _id = randomBytes(5).toString('hex')
        //    users.push({
        //     _id,
        //     ...userNew
        //    })

        //    return users.find(user=> user._id == _id)
    }

}


