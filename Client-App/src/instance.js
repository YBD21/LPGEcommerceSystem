import axios from "axios";
export const url = "http://localhost:5000";
// export const url = "https://final-year-project-3eyh.onrender.com";
const instance = axios.create({
  baseURL: url,
});

export default instance;
