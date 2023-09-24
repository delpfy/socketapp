import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.sidebyside-tech.com"
  
  /* baseURL: "http://localhost:4000" */
  /* baseURL: "https://socket-express.vercel.app", */
  /* baseURL: "https://www.sidebyside-tech.com/" */,
  /*  baseURL: process.env.REACT_APP_API_URL, */
});

export default instance;
