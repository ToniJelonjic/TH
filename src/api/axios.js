import React from "react";
import axios from "axios";

export default axios.create({
  baseURL: "https://virtuals.dev/api/",
});

// export default axios.create({
//   baseURL: "https://localhost:44336/api/",
// });
