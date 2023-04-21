import React,{useState,useContext, useEffect} from "react";
import { GlobalContext } from "./context/GlobalState";
// import Ingridients from "./Ingridients";
// import TextField from 'material-ui/TextField'
import TextField from '@mui/material/TextField';
// import RaisedButton from 'material-ui/RaisedButton'
import Button from "@mui/material/Button";
import AppReducer from "./context/AppReducer";
import '../App.css';
import styled from "@emotion/styled";
import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import { Stack } from "@mui/material";
import Chip from "material-ui/Chip";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Button2=styled(Button)`

position:absolute;
left: 35%;
top: 120%;`

const Text=styled(TextField)`
position:absolute;

left: 0%;
top:30%;

`
const Text1=styled(TextField)`
position:absolute;

left: 0%;
top:80%;

`
const Div1=styled(Paper)`


width:auto;
height:400px;
cursor:pointer;
border-radius:8px;
margin-left:400px;
margin-top:0px;
padding-top:20px
align-items:center;
 &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }`



const AddDishes=(props)=>{
console.log(props)
  useEffect(()=>{
    
    console.log(props)
  },[props])
    
    const [dishName,setText]=useState('')
    const [ingridient,setText1]=useState('')
    const {addDish}=useContext(GlobalContext)
    // const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [show,setShow]=useState(true);
    const [open, setOpen] = useState(false);
    const[btn,setBtn]=useState(true);
    
    const onChange = (e) => {
      const { value } = e.target;
      setText1(value);
    };
    
  
    const onKeyDown = (e) => {
      const { key } = e;
      const trimmedInput = ingridient.trim();
    
      if (key =='Enter'&&tags.length<4&&trimmedInput.length && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags(prevState => [...prevState, trimmedInput]);
        setText1('');
      }
    };

    const deleteTag = (index) => {
      setTags(prevState => prevState.filter((tag, i) => i !== index))
    }
  
   
    const onSubmit=e=>{
      

    const newDishes={
        id: Math.floor(Math.random()*100000),
        dishName,
        ingridient:tags
    }    
    addDish(newDishes)
    setBtn(false)
    setOpen(true)
    setTimeout(function(){setShow(false) }, 4000); 
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



return(show?(
      <div >
        <div className="column1">
      <h1 className="fontcolor2">Add Dish</h1>
      <br/>
      <br/>
      
      <form  onSubmit={onSubmit} >
        {/* <h1>{props.dishName}</h1> */}
        <div ><Text  fullWidth label="Enter Dish name"
                        onChange={(e)=>setText(e.target.value)} 
                        />
                        
            <br/>
            <br/>
            
            {/* <Ingridients  onChange={(e)=>seText1(e.target.value)} data={ingridient}/> */}
            <div>
              <div>
              <br/><br/><br/>
          <Stack direction="row" spacing={1} className="container1">
           {tags.map((tag,index) => 
            <Chip  onRequestDelete={()=>deleteTag(index)} >{tag}</Chip>
                    
            
   
  )}</Stack></div><br/><br/>
           <Text1 
           fullWidth
           value={ingridient}
           label="Enter ingridients"
           onKeyDown={onKeyDown}
           onChange={onChange}/>
      
        </div><br/>
            <br/>
            {btn===true?
            <Button2 variant="outlined" 
                     onClick={onSubmit} 
                     >Add</Button2>:<Button2 variant="outlined" disabled={true}
                     onClick={onSubmit} 
                     >Add</Button2>}
       </div>
       
       <Snackbar className="alert" open={open} autoHideDuration={3000} onClose={handleClose} >
       <Alert  onClose={handleClose} severity="info" sx={{ width: '100%' }}>
       Dish Added
        </Alert>
       </Snackbar>
       
      
      </form>
      </div>
      </div>):null
    )
}
export default AddDishes