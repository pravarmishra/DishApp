import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import TextField from "@mui/material/TextField";
import "../App.css";
import styled from "@emotion/styled";
import Paper from "material-ui/Paper";
import { Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const isMobile = window.innerWidth < 900;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Text = styled(TextField)`

& label {
  font-size: ${isMobile ? `20px` : ``};
  background-color: #ffffff;
}
& input {
  font-size: ${isMobile ? `15px` : ``};
}
`;

const Button3 = styled(Button)`
  
  margin-left: ${isMobile ? `35%` : `34%`};
  bottom: 3%;
  font-size: ${isMobile ? `1rem` : ``};
`;


const Head1 = styled.h1`
font-weight: bold;
color: rgb(62, 97, 173);
margin-left: ${isMobile ? `60px` : `50px`};
margin-top: 0px;
padding-top: 20px;
padding-left: 20px;
font-size: ${isMobile ? `2rem` : ``};
`;
const Chip1 = styled(Chip)`
  padding: ${isMobile ? `` : ``};
  font-size: ${isMobile ? `` : ``};
`;

const EditDishes = (props) => {
  console.log(props);
  const { updateDish, err } = useContext(GlobalContext);
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  useEffect(() => {
    console.log(props);
    
    
    setError(err);
  }, [props]);

  const [dishName, setText] = useState("");
  const [ingridient, setText1] = useState(" ");

  const [tags, setTags] = useState(props.ing);
  const [open, setOpen] = useState(false);
  const [btn, setBtn] = useState(true);
  useEffect(() => {
    setText(props.dishName);
    setTags(props.ing)
  }, [props]);

  console.log(props);

  const onSubmit = (e) => {
    let newDishes = {
      id:props.id,
      dishName:dishName,

      ingridient: tags,
    };
    console.log("abc", newDishes);

    updateDish(newDishes);

    if (!err) {
      setError(false);
      
    } else {
      
      setError(true);
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
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
      <>
        <Head1>Edit Dish</Head1>
        <br />

        <form onSubmit={onSubmit}>
          <div>
            <Text
              fullWidth
              label="Enter Dish name"
              onChange={onChange}
              value={dishName}
              
            />

            <br />
            <br />
            <Stack
              marginTop={1}
              direction="row"
              flexWrap={"wrap"}
              useFlexGap
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
            <br />
            <br />

            <Text
              fullWidth
              value={ingridient}
              label="Enter Ingredients"
              onKeyDown={onKeyDown}
              onChange={(e)=>setText(e.target.value)}
            />

            <br />
            <br />
            {dishName && tags.length > 0 ? (
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
