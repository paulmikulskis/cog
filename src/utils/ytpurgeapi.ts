import axios from "axios";

const ytpurge = axios.create({
  baseURL: process.env.YTPURGE_API || "http://127.0.0.1:7000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ytpurge;
