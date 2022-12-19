import React from "react";
import "./Uređaj.css";

const Uređaj = (props) => {
  return (
    <div className="params-style">
      <table>
        <tr className="border-bottom">
          {props.params.params.map((parameter) => {
            return (
              <th className="th-desc-style" key={parameter.toString()}>
                {parameter}
              </th>
            );
          })}
        </tr>

        {/* PREGLED MJERENJA VAN OPSEGA */}

        {/* <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data out-of-range">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr> */}

      {/* PREGLED AKTIVNOSTI UREDJAJA */}

        <tr className="border-bottom background-activity">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>


      </table>
    </div>

  );
};

export default Uređaj;
