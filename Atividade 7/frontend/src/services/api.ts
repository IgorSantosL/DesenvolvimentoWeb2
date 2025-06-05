import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getCities = () => api.get("/cidades");
export const getIrradiationByCity = (id: number) => api.get(`/cidades/${id}`);