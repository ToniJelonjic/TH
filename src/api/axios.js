import React from "react";
import axios from "axios";

export default axios.create({
  baseURL: "http://th-control.ml/api/",
});

// export default axios.create({
//   baseURL: "https://localhost:44336/api/",
// });
