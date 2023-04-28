import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import AddDishes from "./AddDishes";

import "../App.css";
// import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ButtonGroup, Card, CardContent, Pagination } from "@mui/material";
import { styled } from "@mui/material";
import Paper from "material-ui/Paper";
// import axios from "axios";
// import Alert from "@mui/material";
import EditDishes from "./EditDishes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
// import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';

const Div2 = styled(Paper)`
  * {
    margin-top: 1px;
  }
  width: 390px;
  height: 720px;
  cursor: pointer;
  margin: 0px !important;

  align-items: center;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;

const Border = styled(Card)`
  width: 310px;
  height: 50px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 20px;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button1 = styled(Button)`
  width: 1px;
  position: relative;
`;

const Text = styled(TextField)`
  width: 80%;

  bottom: 30px;
  left: 20px;
`;
const Div1 = styled(Paper)`
  position: absolute;
  width: 35%;
  height: 50%;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 300px;
  right: 310px;
  top: 120px;
  // &:hover {
  //   box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  // }
`;

const Button3 = styled(Button)`
  position: absolute;
  bottom: 92%;
  left: 220px;
`;

const DishCard = (props) => {
  const { deleteDish } = useContext(GlobalContext);
  const { dishes, getDish, getpageDish, dishName, ingridient, _id } =
    useContext(GlobalContext);
  const [users, setUsers] = useState(dishes);
  const [show, setShow] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  useEffect(() => {
    setUsers(dishes);
    setShow(0);
    
  }, [dishes]);
  const [search, setSearch] = useState("");
  

  // const [show, setShow] = useState(null);
  const recordsPerPage = 7;
  const [total, setTotal] = useState(users.length);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / itemsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [page, setPage] = useState(1);
  const [state, updatedState] = useState(-1);

  useEffect(() => {
    getDish();
  }, []);
  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };
  const onChange = (e) => {
    const matched = dishes.filter((user) => {
      return (
        `${user.dishName}`
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        `${user.dishName}`.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });
    setUsers(matched);
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  function handleEdit(id, dish) {
    setShow(1);

    updatedState(id);

    console.log("click");
  }
  // function handleAdd(){
  //   if (show===0 ||show===1){
  //     setShow(2);
  //   }
  //   if(show===2){
  //     setShow(0);
  //     setShow(2);
  //   }
  //   else{
  //     setShow(2)
  //   }
  // }

  return (
    <div>
      <div className="row">
        <div className="column">
          <Div2>
            <h1 className="fontcolor1">Dishes</h1>
            <a>
              <Button3
                startIcon={<AddCircleIcon />}
                variant="outlined"
                onClick={() => setShow(2)}
              >
                Create
              </Button3>
            </a>
            <br />
            <br />

            <div>
              <Text
                variant="outlined"
                label="Search"
                type="text"
                value={search}
                onChange={onChange}
              />

              <br />
            </div>

            {records.map((dish) =>
              state === dish._id && show == 1 ? (
                <div>
                  <div>
                    <EditDishes props={dish} />
                  </div>
                  <Border
                    variant="outlined"
                    onClick={() => handleEdit(dish._id)}
                  >
                    <a>
                      <StyledCardContent>
                        
                        {(dish.dishName)}
                      </StyledCardContent>
                    </a>
                  </Border>
                </div>
              ) : (
                <div>
                  <Border
                    variant="outlined"
                    onClick={() => handleEdit(dish._id)}
                  >
                    <a>
                      <StyledCardContent>
                        
                        {(dish.dishName)}
                      </StyledCardContent>
                    </a>
                  </Border>
                </div>
              )
            )}

            {/* <p>{state?<EditDishes props={dish}/>:null}</p> */}

            {/* {records.map((dish)=>(
       <Border variant="outlined"  onClick={()=>handleEdit(dish._id)}><a> <StyledCardContent  > {dish.dishName}</StyledCardContent></a></Border>

       
         
        ))} */}
            <br />

            <>
              <div className="btn1">
                {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changeCPage}
        pageRangeDisplayed={5}
        pageCount={numbers}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}{" "}
                <div>
                  <Stack>
                    <Pagination
                      page={currentPage}
                      count={npage}
                      onChange={handleChangePage}
                      color="primary"
                      size="medium"
                    >
                      {users
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((item) => (
                          <div key={item.id}>{item.dishName}</div>
                        ))}
                    </Pagination>
                  </Stack>
                  {/* <ButtonGroup className="wrap" variant="outlined" size="small">
                    {currentPage != 1 ? (
                      <Button1 onClick={() => PrevPage()}>P</Button1>
                    ) : null}
                    {numbers.map((n, i) => (
                      <a key={i}>
                        <Button1 onClick={() => changeCPage(n)}>{n}</Button1>
                      </a>
                    ))}
                    {currentPage != numbers.length ? (
                      <Button1 onClick={() => nextPage()}>N</Button1>
                    ) : null}
                  </ButtonGroup> */}
                </div>
              </div>
            </>
            {show === 2 ? (
              <div>
                <AddDishes />
              </div>
            ) : null}
          </Div2>
        </div>
      </div>
      {/* {show?<div><AddDishes/></div>:null} */}
    </div>
  );}

//   function PrevPage() {
//     if (currentPage !== firstIndex) {
//       setCurrentPage(currentPage - 1);
//     }
//     if (currentPage === 1) {
//       setCurrentPage(currentPage);
//     }
//   }
//   function nextPage() {
//     if (currentPage !== lastIndex) {
//       setCurrentPage(currentPage + 1);
//     }
//     if (currentPage === numbers.length) {
//       setCurrentPage(currentPage);
//     }
//   }
//   function changeCPage(id) {
//     setCurrentPage(id);

//     // const article={page:id}
//     // axios.post('api/v1/dishes/page',article)
//     // .then(response => console.log(response));
//   }
// };

export default DishCard;
