import React, { createContext, useContext, useState } from "react";

type Irradiation = {
  id: number;
  lon: number;
  lat: number;
  anual: number;
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  geom: string;
};

type CityData = {
  id: number;
  nome: string;
  geom: string;
  irradiation: Irradiation;
};

type CityContextType = {
  city: CityData | null;
  setCity: (city: CityData | null) => void;
};

const CityContext = createContext<CityContextType>({ city: null, setCity: () => {} });

export const useCity = () => useContext(CityContext);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<CityData | null>(null);
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};