import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
// import Ingridients from "./Ingridients";
// import TextField from 'material-ui/TextField'
import TextField from "@mui/material/TextField";
// import RaisedButton from 'material-ui/RaisedButton'
import Button from "@mui/material/Button";
// import AppReducer from "./context/AppReducer";
import "../App.css";
import styled from "@emotion/styled";
// import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import { Card, Stack } from "@mui/material";
import Chip from "material-ui/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import {Fsnackbar,Tsnackbar} from "./Bar";
import Grid from '@mui/material/Grid';


// import { set } from "mongoose";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Button2 = styled(Button)`
  position: absolute;
  left: 34%;
  bottom: 3%;
`;

const Text = styled(TextField)`
  position: absolute;
  top-margin: 5%;
  left: 0%;
  top: 30%;
`;
const Text1 = styled(TextField)`
  position: absolute;

  left: 0%;
  top: 80%;
`;
const Div1 = styled(Card)`

  position: relative;
  margin-top: 5%;
  left:-40%;
 marin left: 0%;
width:400px;
height:auto;
cursor:pointer;
border-radius:8px;
padding-left:50px;
padding-right:50px;
padding-top:20px;
align-items:center;
padding-bottom:50px;

`;

const AddDishes = (props) => {
  console.log(props);
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const { dishes, err } = useContext(GlobalContext);
  const [error, setError] = useState();
  useEffect(() => {
    console.log(props);
    // setShow(true);
    // setOpen(false);
    // setError(err)
    // if(err){
    //   setError(true)
    // }
    // else{
    //   setError(false)
    // }

    // setData(dishes);
  }, [props]);

  // const [data, setData] = useState();

  const [dishName, setText] = useState("");
  const [ingridient, setText1] = useState("");
  const { addDish } = useContext(GlobalContext);
  // const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const [btn, setBtn] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setText1(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = ingridient.trim().toLowerCase();

    if (
      key == "Enter" &&
      trimmedInput.length > 0 &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setText1("");
    }
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onSubmit = (e) => {
    setError(false);
    const newDishes = {
      id: Math.floor(Math.random() * 100000),
      dishName: dishName.toLowerCase(),
      ingridient: tags,
    };

    addDish(newDishes);
    
    setError(false)
    if (err) {
      setError(true);
      setOpen(false)
        } else {
      setOpen(true);
      setBtn(false)
      setError(false);
      
      
    }
  };

 

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return show ? (
    <div>
      
         <>
         
        <h1 className="fontcolor">Add Dish</h1>
        <br />
        

        <form onSubmit={onSubmit}>
          
          <div>
            <TextField
              fullWidth
              label="Enter Dish name"
              onChange={(e) => setText(e.target.value)}
              required
              value={dishName}
              helperText={(error ?  "Dish Already exists":"")}
              error={error ? true : false}
            />

           
            <div>
              <div>
                <br />
                <Stack
                  direction="row"
                  flexWrap={"wrap"}
                  useFlexGap
                  marginTop={1}
                  spacing={1}
                >
                  {tags.map((tag, index) => (
                    <Chip onRequestDelete={() => deleteTag(index)}>{tag}</Chip>
                  ))}
                </Stack>
              </div>
              <br />
              <TextField
                fullWidth
                value={ingridient}
                label="Enter ingredients"
                onKeyDown={onKeyDown}
                onChange={onChange}
              />
            </div>
            <br />
            <br />

            {(dishName && tags.length > 0)||btn==true ? (

              <Button2 variant="outlined" onClick={onSubmit}>
                Add
              </Button2>
            ) : (
              <Button2 variant="outlined" disabled={true} onClick={onSubmit}>
                Add
              </Button2>
            )}
          </div>

          
          
        </form>
        </>
        
     
    </div>
  ) : null;
};
export default AddDishes;
