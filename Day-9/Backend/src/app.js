const express = ('express')
const app = express()
const noteModel = require("./model/note_model")

app.use(express.json())

app.post('./api/notes',async (req,res)=>{
    const { title,description} = req.body

   const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"note create successfully",
        note
    })
})


module.exports = app