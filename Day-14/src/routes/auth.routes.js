const express = require('express')

const authRouter = express.Router()

authRouter.post('/register', async(req,res) =>{
    const {email,username,password,bio,profileImage} = req.body
    // const isUserExistsByEmail = await userModel.findOne({ email })

    // if(isUserExistsByEmail) {
    //     return res.status(409).json({
    //         message: 'user already exists by username'
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({ username })

    // if(isUserExistsByUsername) {
    //     return res.status(409).json({
    //         message: 'user already exist by usrname'
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            { email }
        ]
    })
})

if(isUserAlreadyExists) {
    return res.status(409)
    .json({
        message: 'user already exists' + 
    })
}