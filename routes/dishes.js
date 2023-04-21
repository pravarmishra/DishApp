const express=require('express')
const router=express.Router();
const {getDishes,addDishes,deleteDishes,updateDish}=require('../controllers/dishController')
const dishSchema=require('../models/dishModel')


router.route('/').get(getDishes).post(addDishes);

router.route('/:id').delete(deleteDishes).patch(updateDish);
module.exports=router
// router.route('/paginate').get( paginatedResults(dishes), (req, res,next) => {
    
//     try{const data= res.paginatedResults
//         return res.status(200).json({
//         success: true,
//         count:data.length,
//         data:data
//     })
//     console.log(data)}
//     catch(err){
//         console.log(err)

//     }next();
//    } 
//   );
router.route("/page").get( async (req, res, next) => {
    try {
        let { page, size,skip } = req.query;
  
          size=5        
        if (!page) {
  
           
            page = 1;
        }
        if(page>1){
            skip=(page-1)*size
        }
  
        
  console.log(page)
      
        const limit = parseInt(size);
  
        
        const user = await dishSchema.find()
            .limit(limit).skip(skip);
            
            
            console.log(user)
  
        res.send({
            page,
            size,
            data: user,
        });
    }
    catch (error) {
        res.sendStatus(500);}})






        //   function paginatedResults(model) {
   
//     return (req, res, next) => {
//         const page = parseInt(req.query.page);
//         const limit = parseInt(req.query.limit);
//         const data=model.toString()

//       console.log(limit,page)
      
   
//       //start&end index
//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;
//       console.log(endIndex,startIndex)
   
//       const results = {};
//       if (endIndex < model.length) {
//         results.next = {
//           page: page + 1,
//           limit: limit,

//         };
//       }
//      if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//           limit: limit
//         };
//       }
      
//       console.log(model)
   
//       results.results = data.slice(startIndex, endIndex);
   
//       res.paginatedResults = results;
//       next();
//     };
//   }