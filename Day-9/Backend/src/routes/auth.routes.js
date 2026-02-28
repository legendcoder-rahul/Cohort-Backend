const express = require('express')
const authRouter = express.Router()
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

authRouter.post('/register',async(req,res)=>{
    const { username, email, password} = req.body

    const isUserExistByEmail = await userModel.findOne({email})
    if(isUserExistByEmail) {
        return res.status(409).json({
            message: 'User already exists by username'
        })
    }

    const isUserExistsByUsername = await userModel.findOne({ username})
    if(isUserExistsByUsername) {
        return res.status(409).json({
            message: 'User already exist by Username'
        })
    }
    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )
    res.cookie('jwt_token',token)
    res.status(200).json({
        message:'user logged in',
        user,
    })
})

authRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    if(hash !== user.password){
        return res.status(401).json({
            message: 'Invalid Password'
        })
    }

    const token = jwt.sign({
        id: user,_id,
        email: user.email
    },process.env.JWT_SECRET)

    res.cookie('jwt_token', token)

    res.status(200).json({
        message: 'Login successful',
        user
    })
})

module.exports = authRouter
