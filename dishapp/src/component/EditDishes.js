import React,{useState,useContext, useEffect} from "react";
import { GlobalContext } from "./context/GlobalState";
// import Ingredients from "./Ingridients";
// import TextField from 'material-ui/TextField'
import TextField from '@mui/material/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import AppReducer from "./context/AppReducer";
import '../App.css';
import styled from "@emotion/styled";
import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import { Stack } from "@mui/material";
import { Chip, RadioButton } from "material-ui";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// const Button2=styled(RaisedButton)`

// position:absolute;

// left: 45%;`

const Text=styled(TextField)`
position:absolute;

left: 0%;
top:25%;

`
const Text1=styled(TextField)`
position:absolute;

left: 0%;
top:75%;

`
const Button3=styled(Button)`
position:absolute;
left: 35%;
top: 120%;
`

const Div1=styled(Paper)`
position:absolute;
background: #333;
width:35%;
height:50%;
cursor:pointer;
border-radius:8px;
margin-left:300px;
right:310px;
top:120px;
 &:hover {
   box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
 }
`
// align-items:center;
//  &:hover {
//     box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
//   }


const EditDishes=(props)=>{
console.log(props)
  useEffect(()=>{
    
    console.log(props)
  },[props])
    
    const [dishName,setText]=useState('')
    const [ingridient,setText1]=useState('')
    const {updateDish}=useContext(GlobalContext)
    const [show,setShow]=useState(true)
    const [tags, setTags] = useState(props.props.ingridient);
    const [open, setOpen] = useState(false);
    const[btn,setBtn]=useState(true);
  useEffect(()=>{
  setText(props.props.dishName)
  
  },[]);

  console.log(props)
   
    const onSubmit=e=>{
      

    let newDishes={
        id: props.props._id,
        dishName,
        ingridient:tags
    }    
    console.log('abc',newDishes)
    updateDish(newDishes)
    // window.location.reload(false)
   
    setBtn(false)
    setOpen(true)
    setTimeout(function(){ window. location. reload(); }, 3500); 
    }
    const onChange = (e) => {
      const { value } = e.target;
      setText1(value);
    };
    
  
    const onKeyDown = (e) => {
      const { key } = e;
      const trimmedInput = ingridient.trim();
    
      if (key =='Enter'&&tags.length<9&&trimmedInput.length<10 && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags(prevState => [...prevState, trimmedInput]);
        setText1('');
      }
    };

    const deleteTag = (index) => {
      setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


return(show?
  <div>
       <div className="column1"  >
        {/* // <Div1 > */}
      <h1 className="fontcolor">Edit Dish</h1>
      <br/>
      <br/>
      <form  onSubmit={onSubmit} >
        {/* <h1>{props.dishName}</h1> */}
        <div ><Text  fullWidth label="Enter Dish name"
                        onChange={(e)=>setText(e.target.value)} value={dishName}
                        />
                        
            <br/>
            <br/>
            {/* <Ingredients  onChange={(e)=>seText1(e.target.value)} data={props.props.ingridient}/> */}

            <div>
          <div>
            <br/><br/><br/>
          <Stack direction="row" spacing={1} className="container1">
           {tags.map((tag,index) => 
            <Chip  onRequestDelete={()=>deleteTag(index)} >{tag}</Chip>
                    
            
   
  )}</Stack></div><br/><br/>
           <Text1 fullWidth
           value={ingridient}
           label="Enter Ingridients"
           onKeyDown={onKeyDown}
           onChange={onChange}/>
      
        </div>
            <br/>
            <br/>
            {btn===true?<Button3 
            variant="outlined"
                     
                     onClick={onSubmit} 
                     >Update</Button3>:<Button3 
                     variant="outlined"
                     disabled={true}
                              
                              onClick={onSubmit} 
                              >Update</Button3>}
       </div>
       <Snackbar className="alert" open={open} autoHideDuration={3000} onClose={handleClose} >
       <Alert  onClose={handleClose} severity="info" sx={{ width: '100%' }}>
       Dish Updated
        </Alert>
       </Snackbar>
        
      
      </form>
      {/* // </Div1> */}
       </div>
       </div>
      :null
    )
}
export default EditDishes