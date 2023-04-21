import React,{Component} from 'react'
// import Ingredient from './component/Ingridients';
import  MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GlobalProvider } from './component/context/GlobalState';
 import DishList from './component/DishList'; 

function App() {
  return (
    <div className="App">
      <MuiThemeProvider><GlobalProvider><div><DishList/></div></GlobalProvider></MuiThemeProvider>
      
      
    </div>
  );
}

export default App;