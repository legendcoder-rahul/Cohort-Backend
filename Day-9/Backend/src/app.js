const express = require('express')
const app = express()
const noteModel = require("./models/note.model")
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const cookieParser = require("cookie-parser")

app.use(cookieParser())


app.use(cors({
    origin: "http://localhost:5173",   // frontend ka exact port
    credentials: true
}))
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/auth',authRouter)

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note create successfully",
        note
    })
})

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fatch successfully",
        notes
    })
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)
    console.log(id)
    res.status(200).json({
        message: 'note delete successfully',
    })
})
app.patch('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            success: true,
            note: updatedNote
        })
    } catch (error) {
        res.status(500).json({ error: "Update failed" })
    }
})

// app.use('*name',(req,res)=>{
//     res.sendFile(path.join(_dirname, '..', '/public/index.html'))
// })


module.exports = app