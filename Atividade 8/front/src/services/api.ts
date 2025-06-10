import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// ✅ Exporte corretamente aqui
export const getCensusByCity = (city: string) => api.get(`/censo?city=${encodeURIComponent(city)}`);
export const getSectorByPoint = (lat: number, lon: number) => api.get(`/censo/point?y=${lat}&x=${lon}`);

export default api;
