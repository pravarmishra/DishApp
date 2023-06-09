import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import AddDishes from "./AddDishes";

import "../App.css";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ButtonGroup, Card, CardContent, Pagination, Box } from "@mui/material";

import Paper from "material-ui/Paper";
import styled from "@emotion/styled";

import EditDishes from "./EditDishes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Grid from "@mui/material/Grid";

const isMobile = window.innerWidth < 900;
const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
const Div2 = styled(Paper)`
  margin-top: 0px;
  margin-right: 0px;
  width: ${isMobile ? `100%` : "390px"};
  height: ${isMobile ? `755px` : `720px`};
  cursor: pointer;

  align-items: center;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;

const Div7 = styled(Paper)`
  position: relative;
  margin-top: 2%;

  margin-left: 0%;
  width: ${isMobile ? `100%` : "390px"};
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


const Border = styled(Card)`
  width: ${isMobile ? `70%` : `310px`};
  height: ${isMobile ? `50px` : `50px`};
  cursor: pointer;
  border-radius: 8px;
  margin-right: 20%;
  margin-left: ${isMobile ? `14%` : `20px`};
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
  font-size: ${isMobile ? `` : ``};
  font-color: primary;
`;


const Text = styled(TextField)`
  width: 80%;

  margin-bottom: 10px;
  margin-left: ${isMobile ? `37px` : `20px`};
  & label {
    font-size: ${isMobile ? `20px` : ``};
    background-color: #ffffff;
  }
  & input {
    font-size: ${isMobile ? `15px` : ``};
  }
`;


const Button3 = styled(Button)`
  position: relative;

  margin-left: ${isMobile ? `37%` : `220px`};
  font-size: ${isMobile ? `1rem` : ``};
  margin-top: ${isMobile ? `0%` : `-25%`};
  margin-bottom: ${isMobile ? `5%` : ``};
`;

const Head1 = styled.h1`
  font-weight: bold;
  color: rgb(62, 97, 173);
  margin-left: ${isMobile ? `29%` : `0px`};
  margin-top: 0px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: ${isMobile ? `2.5rem` : ``};
`;

const Stack1 = styled(Stack)`
position: relative;  
  margin-left: ${isMobile ? `15%` : `30px`};
  margin-top: ${isMobile ? `40px` : `30px`};
`;

const Pagination1 = styled(Pagination)`
  font-base: large;

  fontsize: 2.5rem;
  & .MuiPaginationItem-root {
    font-size: ${isMobile ? `` : ``};
    & .Mui-selected {
      font-size: ${isMobile ? `` : ``};
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
  const [dish, SetDishname] = useState("");
  const [ing, seting] = useState("");
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* <Box sx={{ minHeight: '800px' }}> */}
        <div>
          <Div2>
            <>
              <Head1>Dishes</Head1>
              <Button3
                size="small"
                startIcon={
                  <AddCircleIcon style={{ fontSize: isMobile ? "1rem" : "" }} />
                }
                variant="outlined"
                onClick={() => setShow(2)}
              >
                Create
              </Button3>
            </>
            <br />
            <>
              <Text
                variant="outlined"
                label="Search"
                type="text"
                value={search}
                onChange={onChange}
              />
            </>

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
        <Grid item xs={12} md={6}>
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
  );
};


export default DishList;
