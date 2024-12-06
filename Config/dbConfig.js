const mongoose = require ('mongoose')


const dbConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/tender').then(()=>{
        console.log('db connection successfully');
    }).catch((err)=>{
        console.log(err);
    })
}



module.exports= dbConnection