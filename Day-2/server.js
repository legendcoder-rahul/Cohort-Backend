const express = require('express');

const app = express(); //server instance create karna
app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.get('/about',(req,res)=>{
    res.send('About Page')
})

app.listen(3000)//server ko listen karna kis port pe chalega
