import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";
import FormAdd from "../UI/Forms/FormAdd";

const Zaposlenici = (props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/korisnici/GetAll"
    );
    setData(data);
    //console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const title = "Zaposlenici";
  const subtitle = "Zaposlenici";
  const table_rows = [
    "Ime i prezime",
    "Korisničko ime",
    "Uloga",
    "Status",
    "Akcije",
  ];
  const addButton = "+ Dodaj zaposlenika";
  const formInfo = {
    title: "Zaposlenici",
    subtitle: "Novi zaposlenik",
  };
  const editFormInfo = {
    title: "Zaspolenici",
    subtitle: "Uredi informacije",
  };

  const [isUserClicked, setIsUserClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  let isClicked = false;

  let updatedData = data.map((item) => {
    //console.log(item, "item");
    let updated = { ...item, isClicked };
    return updated;
  });

  //console.log(updatedData, "updated");

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        formInfo,
        editFormInfo,
        addButton,
        setIsAddClicked,
      }}
    >
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        <>
          {/* <Naslov title={title} /> */}
          <Podnaslov subtitle={subtitle} />
          <TablicaInfo rows={table_rows} />
        </>
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Zaposlenici;
