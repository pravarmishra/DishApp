import React ,{ createContext,useReducer, useState} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState={
    dishes:[],error:null,loading:true
    
    
}

export const GlobalContext=createContext(initialState)


export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState)
    
    const [err,setErr]=useState(null)
    //Actions

   
       
        
    async function updateDish(dish){
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        console.log(`api Hit1: ${dish.id}`)
        try{
            const res=await axios.patch(`/api/v1/dishes/${dish.id}`,dish,config)
            dispatch({
                type:'UPDATE_DISH',
                payload:res.data.data
        })
        console.log(dish)
           getDish()
            
        }
        catch(err){
            setErr(err)
            // dispatch({
            //     type:'DISH_ERROR',
            //     payload:err.res.data.error
            // })
             console.log(err)
        }
    }
    

    async function getDish(){
        try{
            const res=await axios.get('/api/v1/dishes')
            
            dispatch({
                type:'GET_DISH',
                payload: res.data.data
            })
        }
        catch(err){
            dispatch({
                type:'DISH_ERROR',
                payload:err.res.data.error
            })
          console.log(err)
        }
    }

    async function getpageDish(page){
        try{
            const res=await axios.get('api/v1/dishes/page')
            dispatch({
                type:'GET_PDISH',
                payload: res.data.data
            })
        }
        catch(err){
            
        }
    }


async function addDish(dish){
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        const res=await axios.post('/api/v1/dishes',dish,config)
    dispatch({
        type:'ADD_DISHES',
        payload:res.data.data

    })
    
    console.log(dish)
}
catch(err){
    setErr(err)
    // dispatch({
    //     type:'DISH_ERROR',
    //     payload:err.res.data.error
    // })
    console.error(err);
}
}
function deleteDish(id){
    dispatch({
        type:'DELETE_DISHES',
        payload:id
    })
    getDish()
}





return (<GlobalContext.Provider value={{
    dishes:state.dishes,addDish,deleteDish,getDish,error:state.error,loading:state.loading,getpageDish,updateDish,err
}}>
    {children}
</GlobalContext.Provider>
)
}

