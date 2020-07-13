let mongoose=require('mongoose');
const customer=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    active:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Customer',customer);