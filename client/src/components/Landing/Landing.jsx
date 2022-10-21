import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  deleteCow,
  getAllCows,
  getSearchCows,
  resetSearch,
  updateCows,
} from "../../redux/actions";
import ModalCreate from "../ModalCreate/ModalCreate";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import home from "./Landing.module.css";
import ModalDelete from "../ModalDelete/ModalDelete";

const Landing = () => {
  const dispatch = useDispatch();
  const allCows = useSelector((state) => state.allCows);
  const allCowsSearch = useSelector((state) => state.allCowsSearch);
  const [loading, setLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [toUpdateOrCreateCow, setToUpdateOrCreateCow] = useState({
    idSENASA: "",
    type: "",
    weight: "",
    fieldName: "",
    device: "",
    deviceNumber: "",
  });
  /********************* PAGINATION **********************/
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState([]);

  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (prevPage <= 0) return;

    const initialItem = (prevPage - 1) * ITEMS_PER_PAGE;
    const currentItems = (currentPage - 1) * ITEMS_PER_PAGE; 

    if (allCowsSearch.length) {
      setPageItems(allCowsSearch.slice(initialItem, currentItems)); 
      setCurrentPage(prevPage);
    } else {
      setPageItems(allCows.slice(initialItem, currentItems)); 
      setCurrentPage(prevPage);
    }
  };
  const nextHandler = () => {
    const nextPage = currentPage + 1;
    const initialItem = currentPage * ITEMS_PER_PAGE;
    const currentItems = nextPage * ITEMS_PER_PAGE;
    if (allCowsSearch.length) {// in case the user search for a specific cow  the array will have at least 1 item
      if (currentItems >= allCowsSearch.length + ITEMS_PER_PAGE) return;
      setPageItems(allCowsSearch.slice(initialItem, currentItems)); 
      setCurrentPage(nextPage);
    } else {//else the user yet didn't search or it's in the original state
      if (currentItems >= allCows.length + ITEMS_PER_PAGE) return;
      setPageItems(allCows.slice(initialItem, currentItems));
      setCurrentPage(nextPage);
    }
  };
  /********************************************MOUNT FUNCTIONS*************************************************/
  useEffect(() => {
    dispatch(getAllCows());
    setLoading(true);// loader will be runing until the information from the api arrives 
  }, []);
  useEffect(() => {
    settingPageItems();
  }, [allCows, allCowsSearch]);
  const settingPageItems = () => {//in the case the user creates or search a cow or the information from the api arrives, the items of the pagination will update
    // another cow the webapp will take that change that's been done 
    if (allCowsSearch.length) {
      setPageItems(allCowsSearch.slice(0, ITEMS_PER_PAGE)); 
      setCurrentPage(1);
      
      setLoading(false);
    } else {
      setPageItems(allCows.slice(0, ITEMS_PER_PAGE)); 
      setCurrentPage(1);
      if (allCows.length) {
        setLoading(false);
      }
    }
  };
  /****************************MODAL FOR UPDATE OR CREATION******************************************/
  const openModalUpdate = (cow) => {
    setIsCreating(false);
    setToUpdateOrCreateCow(cow);
    setShowModalCreate(true);
  };
  const openModalCreate = () => {
    setIsCreating(true);

    setToUpdateOrCreateCow({
      idSENASA: "",
      type: "",
      weight: "",
      fieldName: "",
      device: "",
      deviceNumber: "",
    });
    setShowModalCreate(true);
  };

  /**********************************DELETE DATA************************************ */
  const deleteRegister = (id) => {
    setShowModalDelete(true);
    setIdDelete(id);
  };

    /*********************************SEARCH DATA************************************* */

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (!inputSearch) {
      return;
    }
    setLoading(true); // loader activated
    dispatch(getSearchCows(inputSearch));
  };

    /************************************RESET CHANGES IN THE WEB********************************** */

  const restartHome = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(resetSearch());
    setInputSearch("");
  };

  return (
    <div
      style={{
        fontFamily: "Montserrat",
        backgroundColor: "rgb(230, 230, 230)",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <p
        style={{
          color: "#8db42f",
          fontWeight: "600",
          marginLeft: "30px",
          marginTop: "15px",
        }}
      >
        Menu / Animales
      </p>

      <h2
        style={{
          fontWeight: "800",
          marginLeft: "30px",
          fontSize: "37px",
          marginTop: "10px",
        }}
      >
        Gestión de animales
      </h2>
      <Button
        onClick={() => {
          openModalCreate();
        }}
        style={{
          color: "white",
          backgroundColor: "#8db42f",
          marginLeft: "30px",
          marginTop: "5px",
        }}
      >
        Nuevo Animal
      </Button>
      <ModalCreate
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
        isCreating={isCreating}
        dispatch={dispatch}
        toUpdateOrCreateCow={toUpdateOrCreateCow}
        setToUpdateOrCreateCow={setToUpdateOrCreateCow}
      />
      <ModalDelete
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        dispatch={dispatch}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      />
      <h2
        style={{
          fontWeight: "700",
          marginLeft: "30px",
          fontSize: "20px",
          marginTop: "15px",
        }}
      >
        Nombre/ID SENASA Animal
      </h2>
      <div className={home.containerSearchBar}>
        <form onSubmit={(e) => onSubmitSearch(e)}>
          <input
            className={home.searchBar}
            style={{ width: "600px", marginLeft: "30px" }}
            placeholder="Buscar por nombre/ID SENASA"
            value={inputSearch}
            onChange={(e) => {
              e.preventDefault();
              setInputSearch(e.target.value);
            }}
          />
          <Button type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
        </form>

        <button
          className={home.searchBarButton}
          onClick={(e) => restartHome(e)}
        >
          Reset
        </button>
      </div>

      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      ) : (
        <div
          style={{
            width: "80%",
            border: "1px black",
            marginTop: "20px",
            marginLeft: "40px",
          }}
        >
          <TableContainer>
            <Table variant="simple" size="sm">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>idSENASA</Th>
                  <Th>Tipo animal</Th>
                  <Th>Peso (kg)</Th>
                  <Th>Nombre de potrero</Th>
                  <Th>Tipo de dispositivo</Th>
                  <Th>Numero de dispositivo</Th>
                  <Th></Th>
                  <Th isNumeric></Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageItems.length
                  ? pageItems.map((cow) => {
                      return (
                        <Tr key={cow._id}>
                          <Td>{cow.idSENASA}</Td>
                          <Td>{cow.type}</Td>
                          <Td>{cow.weight}</Td>
                          <Td>{cow.fieldName}</Td>
                          <Td>{cow.device}</Td>
                          <Td>{cow.deviceNumber}</Td>
                          <Td
                            onClick={() => {
                              openModalUpdate(cow);
                            }}
                          >
                            <i
                              class="fa-solid fa-pen-to-square"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </Td>
                          <Td>
                            <div onClick={() => deleteRegister(cow._id)}>
                              <i
                                class="fa-solid fa-trash"
                                style={{ color: "red", cursor: "pointer" }}
                              ></i>
                            </div>
                          </Td>
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
          <div className={home.containerPagination}>
            <button className={home.buttonPagination} onClick={prevHandler}>
              <i class="fa-solid fa-angle-left"></i>Prev
            </button>
            <h6 className={home.currentPage}>{currentPage}</h6>

            <button className={home.buttonPagination} onClick={nextHandler}>
              Next<i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Landing;
