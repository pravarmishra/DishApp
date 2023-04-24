const mongoose=require('mongoose')

const dishSchema=new mongoose.Schema({
    dishName:{
        type:String,
        trim:true,
        required:[true,'Please add dish']
    },
    ingridient:{
        type:[String],
        trim:true,
        required:[true, 'Please add ingridients']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Dishes',dishSchema);