const dishModel=require('../models/dishModel')




//access all data

exports.getDishes=async ( req,res,next)=>{
    try{
        const dishes=await dishModel.find()
        return res.status(200).json({
            success: true,
            count:dishes.length,
            data:dishes

        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:'server Error'
        })
    }
}
//pagination




//Add dish
exports.addDishes=async(req,res,next)=>{
    try{const {dishName,ingridient}=req.body
    const dish=await dishModel.create(req.body)
    return res.status(201).json({
       success:true,
       data: dish
    })
    console.log(dish)
   }
   catch(err){
    console.log(err)
       if(err.name==='ValidationError'){
           const messages=Object.values(err.errors).map(val=>val.message)
           return res.status(400).json({
               success:false,
               error: messages
           })
       }
       else{
           return res.status(500).json({
               success:false,
               error:err
           })
       }
   
   }
   }



   exports.deleteDishes = async (req, res, next) => {
    try {
      const dish = await dishModel.findById(req.params.id);
  
      if(!dish) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found'
        });
      }
  
      await dish.deleteOne();
  
      return res.status(200).json({
        success: true,
        data: {}
      });
  
    } catch (err) {
        console.log(err)
      return res.status(500).json({
        success: false,
        error: err
      });
    }
  }
  exports.updateDish = async (req, res, next) => {
    try{const dish = await dishModel.findByIdAndUpdate(req.params.id, req.body);
      console.log(req.body)
  
    if (!dish) {
      return next('No tour found with that ID', 404);
    }
  console.log(dish)
    res.status(200).json({
      success:true,
      data: {
        dish
      }
      
    });}
    catch(err){
      return res.status(500).json({
        success: false,
        error: err
      });

    }
  };
  

