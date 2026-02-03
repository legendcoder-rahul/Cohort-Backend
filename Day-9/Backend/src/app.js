const express = require('express')
const app = express()
const noteModel = require("./models/note.model")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

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
        notes
    })
})

app.patch('/api/notes/:id', async(req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message:'notes update',
    })
})



module.exports = app