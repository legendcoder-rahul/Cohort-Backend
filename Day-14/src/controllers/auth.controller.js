const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body
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
            { username },
            { email }
        ]
    })


    if (isUserAlreadyExists) {
        return res.status(409)
            .json({
                message: 'user already exists' + (isUserAlreadyExists.email == email ? 'Email already exists' : 'Email already exists')
            })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token)

    res.status(201).json({
        message: 'user registered successfully',
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { 
                username: username 
            },
            {
                email: email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message: 'User is not found'
        })
    }

    //  const hash = crypto.createHash('sha256').update(password).digest('hex')


    //  const isPasswordValid = hash == user.password

    const isPasswordValid = await bcrypt.compare(password, user.password)

     if(!isPasswordValid) {
        return res.status(401).json({
            message:'password invalid'
        })}

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        res.cookie('token', token)

        res.status(200).json({
            message:'User loggedIn successfully',
            user:{
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

}

module.exports = {
    registerController,
    loginController
}