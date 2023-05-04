import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
// import Ingredients from "./Ingridients";
// import TextField from 'material-ui/TextField'
import TextField from "@mui/material/TextField";
// import RaisedButton from 'material-ui/RaisedButton'
// import AppReducer from "./context/AppReducer";
import "../App.css";
import styled from "@emotion/styled";
// import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import { Stack } from "@mui/material";
import { Chip, RadioButton } from "material-ui";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// const Button2=styled(RaisedButton)`

// position:absolute;

// left: 45%;`

// const Text=styled(TextField)`
// position:absolute;
// top-margin:5%;
// left: 0%;
// top:25%;

// `
const Text1 = styled(TextField)`
  position: relative;

  left: 0%;
  top: 75%;
`;
const Button3 = styled(Button)`
position: absolute;
left: 34%;
bottom: 3%;
`;

const Div1 = styled(Paper)`
  position: absolute;
  background: #333;
  width: 35%;
  height: 50%;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 300px;
  right: 310px;
  top: 120px;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;


const Stack1 = styled(Stack)`
  max-width: 20% !important;
`;

const EditDishes = (props) => {
  console.log(props);
  const { updateDish,err } = useContext(GlobalContext);
  const [error,setError]=useState()
  const [show, setShow] = useState(true);
  useEffect(() => {
    console.log(props);
    setShow(true);
  }, [props]);

  const [dishName, setText] = useState(" ");
  const [ingridient, setText1] = useState(" ");
 

  const [tags, setTags] = useState(props.ing);
  const [open, setOpen] = useState(false);
  const [btn, setBtn] = useState(true);
  useEffect(() => {
    setText(props.dishName);
    
  }, [props]);

  console.log(props);

  const onSubmit = (e) => {
    let newDishes = {
      id: props.id,
      dishName,
      ingridient: tags,
    };
    console.log("abc", newDishes);

    updateDish(newDishes);
 
if(!err){
    
    
    setError(false)
}
else{
  
  setError(true)
}
   
  };
  const onChange = (e) => {
    const { value } = e.target;
    setText1(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = ingridient.trim().toLowerCase();

    if (
      key === "Enter" &&
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return show ? (
    <div>
      < >
      
        
        <h1 className="fontcolor">Edit Dish</h1>
        <br />
        
        <form onSubmit={onSubmit}>
          
          <div>
            <TextField
              fullWidth
              label="Enter Dish name"
              onChange={(e) => setText(e.target.value)}
              value={dishName}
              helperText={!error? "" : "Dish Already exists"}
              error={error?true:false}
            />

            

            <br />
            <Stack
              marginTop={1}
              direction="row"
              flexWrap={"wrap"}
              useFlexGap
              spacing={1}
            >
              {tags.map((tag, index) => (
                <Chip onRequestDelete={() => deleteTag(index)}>{tag}</Chip>
              ))}
            </Stack>
            <br />

            <TextField
              fullWidth
              value={ingridient}
              label="Enter Ingredients"
              onKeyDown={onKeyDown}
              onChange={onChange}
            />

            <br />
            <br />
            { dishName && tags.length > 0 ? (
              <Button3 variant="outlined" onClick={onSubmit}>
                Update
              </Button3>
            ) : (
              <Button3 variant="outlined" disabled={true} onClick={onSubmit}>
                Update
              </Button3>
            )}
          </div>
          <Snackbar
            className="alert"
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Dish Updated
            </Alert>
          </Snackbar>
        </form>
        
      </>
    </div>
  ) : null;
};
export default EditDishes;
