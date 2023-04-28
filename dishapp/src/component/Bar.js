import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  
//   const [open,setOpen]=useState()
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };
 function Tsnackbar(){
  const [open,setOpen]=useState(true)
    return <Snackbar
    className="alert"
    open={open }
    autoHideDuration={2000}
    
  >
    <Alert  severity="info" sx={{ width: "100%" }}>
      Dish is being verified
    </Alert>
  </Snackbar>
}
 function Fsnackbar(){
  const [close,setClose]=useState(true)
    return <Snackbar
    className="alert"
    open={close }
    autoHideDuration={2000}
    
  >
    <Alert  severity="error" sx={{ width: "100%" }}>
      Dish is already there
    </Alert>
  </Snackbar>
}

export  {Tsnackbar,Fsnackbar};
