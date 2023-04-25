const mongoose=require('mongoose')

const dishSchema=new mongoose.Schema({
    dishName:{
        type:String,
        trim:true,
        required:[true,'Please add dish'],
        unique:true
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
dishSchema.index( { dishName: 1 }, { unique: true } )


module.exports=mongoose.model('Dishes',dishSchema);