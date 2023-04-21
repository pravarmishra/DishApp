import React,{Component, useContext, useEffect, useState} from "react";
import Multiselect from "multiselect-react-dropdown"
import { GlobalContext } from "./context/GlobalState";
import TextField from 'material-ui/TextField';
import styled from "@emotion/styled";
import {WithContext as ReactTags}  from 'react-tag-input';
import "../App.css";
import { Card, Chip } from "material-ui";
import { Stack } from "@mui/material";



const Text=styled(TextField)`

margin-top:45px;
hieght:30px;
bottom:30px;
float:bottom;
left:60px;
width:auto;
`

const Text1=styled(Card)``
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
function Ingridients(props){
  useEffect(()=>{
    
    console.log(props)
  },[props.data])
    const {dishes}=useContext(GlobalContext)
    // var ingri=dishes.map((ing)=>ing.ingridient
    // );
    const [input, setInput] = useState('');
    const [tags, setTags] = useState(([])||([props.data]));
    
    const onChange = (e) => {
      const { value } = e.target;
      setInput(value);
    };
    
    const onKeyDown = (e) => {
      const { key } = e;
      const trimmedInput = input.trim();
    
      if (key =='Enter'&&tags.length<4&&trimmedInput.length && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags(prevState => [...prevState, trimmedInput]);
        setInput('');
      }
    };

    const deleteTag = (index) => {
      setTags(prevState => prevState.filter((tag, i) => i !== index))
    }




    return(
        <div>
          <div className="container1">
          <Stack direction="row" spacing={1}>
           {tags.map((tag,index) => 
            <Chip  onRequestDelete={()=>deleteTag(index)} >{tag}</Chip>
                    
            
   
  )}</Stack></div>
           <Text
           value={input}
           placeholder="Enter ingridients"
           onKeyDown={onKeyDown}
           onChange={onChange}/>
      
        </div>
    )

}
export default Ingridients