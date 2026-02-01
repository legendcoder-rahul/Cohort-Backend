const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const notesModels = mongoose.model('notes', notesSchema)

module.exports = notesModels