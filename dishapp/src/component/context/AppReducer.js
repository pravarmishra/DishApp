export default (state,action)=>{
    switch(action.type){
        case 'GET_DISH':
            return{
                ...state,loading:false,dishes:action.payload
            }
        case 'GET_PDISH':
            return{
                ...state,loading:false,dishes:action.payload
            }   
        case 'UPDATE_DISH':
            return{
                ...state,loading:false,dishes:[...state.dishes,action.payload]
            }     
        case 'ADD_DISHES':
            return{
                ...state,
                dishes:[...state.dishes,action.payload]
            }
            case 'DELETE_DISHES':
                return{
                    ...state,
                    dishes:state.dishes.filter(dish=>dish.id !=action.payload)
                }  
            case 'DISH_ERROR':
                return{
                    ...state,error:action.payload
                }  
                 
            default: return state

    }
}