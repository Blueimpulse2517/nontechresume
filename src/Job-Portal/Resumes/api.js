import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const checkEmail = async (email) => {
  return API.post("/jobseeker/check-email", { email });
};

export const createJobseeker = async (data) => {
  return API.post("/jobseeker/create", data);
};

export default API;
