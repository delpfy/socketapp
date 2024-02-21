import axios from "axios";

const instance = axios.create({
  /* baseURL: "https://www.sidebyside-tech.cm" */
  baseURL: "https://enthusiastic-pear-scarf.cyclic.app"
  
  /* baseURL: "http://localhost:4000" */
  /* baseURL: "https://socket-express.vercel.app", */
  /* baseURL: "https://enthusiastic-pear-scarf.cyclic.app/" */,
  /*  baseURL: process.env.REACT_APP_API_URL, */
});

export default instance;
