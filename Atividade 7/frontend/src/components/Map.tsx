import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useCity } from "../context/AppContext";

export const MapFlyToCity = () => {
  const { city } = useCity();
  const map = useMap();

  useEffect(() => {
    if (city && city.irradiation) {
      map.flyTo([city.irradiation.lat, city.irradiation.lon], 11, { duration: 1.5 });
    }
  }, [city, map]);

  return null;
};