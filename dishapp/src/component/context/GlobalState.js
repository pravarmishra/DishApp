import React ,{ createContext,useEffect,useReducer, useState} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const initialState={
    dishes:[],error:null,loading:true
    
    
}

export const GlobalContext=createContext(initialState)


export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState)
    
    const [err,setErr]=useState()
    //Actions

    useEffect(() => {
        setErr(false)
    },[])
    function tsnackbar(){
        return <Snackbar
        className="alert"
        open={!err }
        autoHideDuration={2000}
        
      >
        <Alert  severity="info" sx={{ width: "100%" }}>
          Dish is being verified
        </Alert>
      </Snackbar>
    }
     function fsnackbar(){
        return <Snackbar
        className="alert"
        open={err }
        autoHideDuration={2000}
        
      >
        <Alert  severity="error" sx={{ width: "100%" }}>
          Dish is already there
        </Alert>
      </Snackbar>
    }
       
        
    async function updateDish(dish){
        setErr(!err)
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
            if(err.response===400)
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
catch(error){
    if(error.response.status===400){
    setErr(true)}
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
    dishes:state.dishes,addDish,deleteDish,getDish,error:state.error,loading:state.loading,getpageDish,updateDish,err,fsnackbar,tsnackbar
}}>
    {children}
</GlobalContext.Provider>
)
}

