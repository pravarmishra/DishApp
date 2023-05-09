import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import AddDishes from "./AddDishes";

import "../App.css";
// import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ButtonGroup, Card, CardContent, Pagination, Box } from "@mui/material";
// import { styled } from "@mui/material";
import Paper from "material-ui/Paper";
import styled from "@emotion/styled";
// import axios from "axios";
// import Alert from "@mui/material";
import EditDishes from "./EditDishes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Grid from "@mui/material/Grid";
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
// import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';

const isMobile = window.innerWidth < 900;

const Div2 = styled(Paper)`
  margin-top: 0px;

  width: ${isMobile ? `880px` : "390px"};
  height: ${isMobile ? `1200px` : `720px`};
  cursor: pointer;

  margin-right: 0px;
  align-items: center;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
// const StaffEditorPageContainer = styled.div`
//     height: ${isMobile ? `auto`:`calc(100vh - 64px)`};
//     width:100%;
//     background-color:white;
//     padding:10px 15px;
//     ${isMobile && `
//     position: relative;
//     top:56px;
//     `}`
// const Div6 = styled(Card)`

//   position: relative;
//   margin-top: 2%;

//  margin-left: 25%;
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
const Div7 = styled(Paper)`
  position: relative;
  margin-top: 2%;

  margin-left: 0%;
  width: ${isMobile ? `880px` : "390px"};
  height: auto;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  align-items: center;
  padding-bottom: 50px;
  border-top: 1px solid;
`;
// const Div8 = styled(Paper)`

//   position: relative;
//   margin-top: 0% !important;

//  margin-left: 50%;
// width:390px;
// height:auto;
// cursor:pointer;
// border-radius:8px;
// padding-left:50px;
// padding-right:50px;
// padding-top:20px;
// align-items:center;
// padding-bottom:50px;

// `;

const Border = styled(Card)`
  width: ${isMobile ? `600px` : `310px`};
  height: ${isMobile ? `90px` : `50px`};
  cursor: pointer;
  border-radius: 8px;
  margin-left: ${isMobile ? `100px` : `20px`};
  margin-bottom: ${isMobile ? `10px` : "1px"};
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${isMobile ? `30px` : ``};
  font-color: primary;
`;
// const Button1 = styled(Button)`
//   width: 1px;
//   position: relative;
// `;

const Text = styled(TextField)`
  width: 80%;

  bottom: 30px;
  left: ${isMobile ? `60px` : `20px`};
  & label {
    font-size: ${isMobile ? `30px` : ``};
    background-color: #ffffff;
  }
  & input {
    font-size: ${isMobile ? `35px` : ``};
  }
`;
// const Div1 = styled(Paper)`
//   position: absolute;
//   width: 35%;
//   height: 50%;
//   cursor: pointer;
//   border-radius: 8px;
//   margin-left: 300px;
//   right: 310px;
//   top: 120px;
//   // &:hover {
//   //   box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
//   // }
// `;

const Button3 = styled(Button)`
  position: relative;
  bottom: 5%;
  left: ${isMobile ? `620px` : `220px`};
  font-size: ${isMobile ? `1.5rem` : ``};
  margin-top: ${isMobile ? `-29px` : `-10px`};
`;

const Head1 = styled.h1`
  font-weight: bold;
  color: rgb(62, 97, 173);
  margin-left: ${isMobile ? `40px` : `0px`};
  margin-top: 0px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: ${isMobile ? `4.5rem` : ``};
`;

const Stack1 = styled(Stack)`
  margin-left: ${isMobile ? `240px` : `30px`};
  margin-top: ${isMobile ? `40px` : `0px`};
`;

const Pagination1 = styled(Pagination)`
  font-base: large;
  width: 375px;
  fontsize: 2.5rem;
  & .MuiPaginationItem-root {
    font-size: ${isMobile ? `28px` : ``};
    & .Mui-selected {
      font-size: ${isMobile ? `28px` : ``};
      min-width: ${isMobile ? `60px` : ``};
      min-height: ${isMobile ? `60px` : ``};
    }
  }
`;

const DishList = (props) => {
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
    console.log(isMobile);
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
  const [state, updatedState] = useState();
  const [showEditDish, showEdit] = useState(null);
  // const [props,setProps]=useState()
  const [dish, SetDishname] = useState();
  const [ing, seting] = useState();
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

  function handleEdit(id, dishName, ingridient) {
    setShow(1);

    updatedState(id);
    SetDishname(dishName);
    seting(ingridient);

    console.log("click");
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* <Box sx={{ minHeight: '800px' }}> */}
          <div>
            <Div2>
              <Head1>Dishes</Head1>
              <a>
                <Button3
                  size="small"
                  startIcon={<AddCircleIcon style={{ fontSize: isMobile?'2rem':'' }} />}
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

              {records.map((dish) => (
                <div>
                  <div>
                    <Border
                      variant="outlined"
                      onClick={() =>
                        handleEdit(dish._id, dish.dishName, dish.ingridient)
                      }
                    >
                      <a>
                        <StyledCardContent>{dish.dishName}</StyledCardContent>
                      </a>
                    </Border>
                  </div>
                </div>
              ))}

              <br />

              <>
                <div>
                  {" "}
                  <div>
                    <Stack1>
                      <Pagination1
                        page={currentPage}
                        count={npage}
                        onChange={handleChangePage}
                        color="primary"
                        siblingCount={0}
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
                      </Pagination1>
                    </Stack1>
                  </div>
                </div>
              </>
            </Div2>
          </div>
          {/* </Box> */}
        </Grid>

        {show === 2 ? (
          <Grid item xs={12} md={6} sm={4}>
            <div>
              <Div7>
                <AddDishes />
              </Div7>
            </div>
          </Grid>
        ) : null}
        {show === 1 ? (
          <Grid item xs={12} md={6}>
            <Div7>
              <EditDishes dishName={dish} id={state} ing={ing} />
            </Div7>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

//
export default DishList;
