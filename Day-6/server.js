const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect("mongodb+srv://Rahul:<password>@cluster0.nr05ykz.mongodb.net/Day-6")
    .then(()=>{
        console.log("connected to database");
        
    })
}
connectToDB()

app.listen(3000,() => {
    console.log('server is running on port 3000');
    
})