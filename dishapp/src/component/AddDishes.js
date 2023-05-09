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
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import {Fsnackbar,Tsnackbar} from "./Bar";
import Grid from "@mui/material/Grid";

const isMobile = window.innerWidth < 900;
// import { set } from "mongoose";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Button2 = styled(Button)`
  position: absolute;
  left: ${isMobile ? `47%` : `39%`};
  bottom: 3%;
  font-size: ${isMobile ? `1.5rem` : ``};
`;

const Text = styled(TextField)`
  & label {
    font-size: ${isMobile ? `30px` : ``};
    background-color: #ffffff;
  }

  & input {
    font-size: ${isMobile ? `35px` : ``};
  }
`;
// const Div1 = styled(Card)`

//   position: relative;
//   margin-top: 5%;
//   left:-40%;
//  marin left: 0%;
// width:400px;
// height:auto;
// cursor:pointer;
// border-radius:8px;
// padding-left:50px;
// padding-right:50px;
// padding-top:20px;
// align-items:center;
// padding-bottom:50px;

// `;
const Head1 = styled.h1`
  font-weight: bold;

  color: rgb(55, 85, 150);
  margin-left: ${isMobile ? `33%` : `20%`};
  font-size: ${isMobile ? `4rem` : ``};

  top: 2%;
`;
const Chip1 = styled(Chip)`
  padding: ${isMobile ? `10px` : ``};
  font-size: ${isMobile ? `25px` : ``};
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

    setError(false);
    if (err) {
      setError(true);
      setOpen(false);
    } else {
      setOpen(true);
      setBtn(false);
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
        <Head1>Add Dish</Head1>
        <br />

        <form onSubmit={onSubmit}>
          <div>
            <Text
              fullWidth
              label="Enter Dish name"
              onChange={(e) => setText(e.target.value)}
              required
              value={dishName}
              helperText={error ? "Dish Already exists" : ""}
              error={error ? true : false}
            />

            <div>
              <div>
                <br />
                <br />
                <Stack
                  direction="row"
                  flexWrap={"wrap"}
                  useFlexGap
                  marginTop={1}
                  spacing={1}
                >
                  {tags.map((tag, index) => (
                    <Chip1
                      label={tag}
                      key={tag}
                      onDelete={() => deleteTag(index)}
                    />
                  ))}
                </Stack>
              </div>
              <br />
              <br />
              <Text
                fullWidth
                value={ingridient}
                label="Enter ingredients"
                onKeyDown={onKeyDown}
                onChange={onChange}
              />
            </div>
            <br />
            <br />

            {(dishName && tags.length > 0) || btn == true ? (
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
