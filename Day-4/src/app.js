//use of app.js 
//server create karna and server configure karna

const express = require('express')

const app = express()//server create

app.use(express.json())

const notes = [
    {
        title:"test title 1",
        description:"test description 2"
    }
]

app.get('/',function(req,res) {
    res.send('hello world')
})

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    console.log('note added');
    res.send('note created')
})

app.get('/notes',(req,res)=>{
    console.log(req.params);
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{ 
    delete notes[req.params.index]
    req.send('note deleted')
})

app.patch("/notes/:index",(req,res)=>{ 
    notes[req.params.index].description = req.body.description
    notes[req.params.index]
    res.send('note updated')
})
module.exports = app//server export karna