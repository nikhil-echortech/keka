const mongoose=require('mongoose')

const schema=mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    username:String
})

module.exports=mongoose.model('id',schema)