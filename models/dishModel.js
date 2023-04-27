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
dishSchema.statics.isThisDishInUse=async function(dishName){
    try{
        // const ldish=dishName.toLowerCase();
        const user=await this.findOne({dishName})
        if(user) return false

        return true
    }
    catch(err){
        console.log(err)
    return false
    
    }
}


module.exports=mongoose.model('Dishes',dishSchema);