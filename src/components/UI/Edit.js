import React from "react";
import Header from "../Header/Header";
import Dropdown from "../Dropdown/Dropdown";
import Wrapper from "./Wrapper";
import Naslov from "./Naslovi/Naslov";
import Podnaslov from "./Naslovi/Podnaslov";
import UserCard from "./UserCard";
import Footer from "../Footer/Footer";
import ButtonSave from "./Buttons/ButtonSave";
import FormAdd from "./Forms/FormAdd";
import FormElements from "./Forms/FormElements";

const Edit = (props) => {
  const { subtitle } = props;
  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov />
        <Podnaslov subtitle={"Podnaslov"} />
        <FormElements title={"Naslov"} />

        {/* <div className="measure-div">
          <Dates devices={data} />
          <Groups />
          <ButtonSearch />
        </div> */}
        {/* <TablicaUređaj params={params} /> */}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Edit;
