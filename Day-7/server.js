const mongoose = require('mongoose')

const app = require('./src/app')

function connectDB(){
    mongoose.connect('mongodb+srv://Rahul:pqiZ6v9nokPkteN6@cluster0.nr05ykz.mongodb.net/day-7')
    .then(()=>{
        console.log('database is connect');
        
    })
}
connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})