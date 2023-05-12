import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import "../App.css";
import styled from "@emotion/styled";
import Paper from "material-ui/Paper";
import { Card, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

const isMobile = window.innerWidth < 900;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Button2 = styled(Button)`
  
  margin-left: ${isMobile ? `38%` : `37%`};
  bottom: 3%;
  font-size: ${isMobile ? `1rem` : ``};
`;

const Text = styled(TextField)`


& label {
  font-size: ${isMobile ? `20px` : ``};
  background-color: #ffffff;
}
& input {
  font-size: ${isMobile ? `15px` : ``};
}
`;
const Head1 = styled.h1`
 

  
  font-weight: bold;
  color: rgb(62, 97, 173);
  margin-left: ${isMobile ? `47px` : `50px`};
  margin-top: 0px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: ${isMobile ? `2rem` : ``};
`;
const Chip1 = styled(Chip)`
  padding: ${isMobile ? `` : ``};
  font-size: ${isMobile ? `` : ``};
`;

const AddDishes = (props) => {
  console.log(props);
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const { addDish,err } = useContext(GlobalContext);

  const [error, setError] = useState('');
  useEffect(() => {
    console.log(props);
    setError(err);
   
  }, [props]);
  const [dishName, setText] = useState("");
  const [ingridient, setText1] = useState("");
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
   
    let newDishes = {
      id: Math.floor(Math.random() * 100000),
      dishName: dishName.toLowerCase(),
      ingridient: tags,
    };

    addDish(newDishes);

    
    if (err) {
      setError(true);
      
    } else {
      
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
              value={dishName}
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
                    <Chip1
                      label={tag}
                      key={tag}
                      onDelete={() => deleteTag(index)}
                    />
                  ))}
                </Stack>
              </div>
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
