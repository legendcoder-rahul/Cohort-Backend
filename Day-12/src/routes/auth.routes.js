const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

const authRouter = express.Router()//if we use the api in other file we have to use router

authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exist with this email address"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )
    res.cookie('jwt_token',token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})

module.exports = authRouter