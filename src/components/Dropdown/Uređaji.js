import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Uređaj from "../UI/Uređaj";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Groups from "../UI/Groups";
import Button from "../UI/Buttons/ButtonSearch";
import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";

const Uređaji = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/logeri/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Uređaji";
  const subtitle = "Uređaji";
  const params = {
    id: Math.random(),
    params: [
      "Naziv",
      "Klijent",
      "Email 1",
      "Email 2",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
      "Status",
      "Akcije",
    ],
  };

  const devices = {
    deviceId: Math.random(),
    title: "Uređaji",
  };

  const [groupValue, setGroupValue] = useState("");
  const [subGroupValue, setSubGroupValue] = useState("");

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
      }}
    >
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <div className="select-div">
          <Groups
            groupValue={groupValue}
            handleGroupValue={handleGroupValue}
            subGroupValue={subGroupValue}
            handleSubGroupValue={handleSubGroupValue}
          />
          <Button />
        </div>
        <TablicaUređaj
          groupValue={groupValue}
          subGroupValue={subGroupValue}
          title={title}
          data={data}
          params={params}
        />
        {/* <Uređaj params={params} /> */}
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Uređaji;
