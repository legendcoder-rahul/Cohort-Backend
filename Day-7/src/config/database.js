const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('database is connect');
        
    })
}

module.exports = connectDB