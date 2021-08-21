const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://harsh:harsh123@cluster0.vcnik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`Connection Sucessfull`)
}).catch(()=>{
    console.log(`No Connection`)
})