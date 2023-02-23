import React from "react";

const ChangeStatus = ({ data, isClicked, id }) => {
  console.log(data, "ppp");
  console.log(id, "ppp");
  return (
    <>
      {/* {isClicked
        ? data.map((item) => {
            if (item.id === id) {
              return <div className="status-change">Promijeni status</div>;
            }
          })
        : null} */}
      {isClicked && data.clicked && (
        <div className="status-change">Promijeni status</div>
      )}
    </>
  );
};

export default ChangeStatus;
