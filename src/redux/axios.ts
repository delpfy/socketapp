import axios from "axios";

const instance = axios.create({
  baseURL: "https://socket-express.vercel.app",
  //baseURL: process.env.REACT_APP_API_URL,
});

export default instance;
