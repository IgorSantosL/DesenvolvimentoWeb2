import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCensusByCity } from '../services/api';

interface PolygonData {
  geom: string;
}

interface CensusData {
  centroid: { latitude: number; longitude: number };
  polygons: PolygonData[];
}

interface SectorDetails {
  cd_setor: string;
  situacao: string;
  area_km2: number;
  nm_mun: string;
  geom: string | object;
}

interface CensusContextType {
  city: string;
  data: CensusData | null;
  selectedSector: SectorDetails | null;
  setCity: (city: string) => void;
  setSelectedSector: (sector: SectorDetails) => void;
}

const CensusContext = createContext({} as CensusContextType);

export const CensusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('Jacareí');
  const [data, setData] = useState<CensusData | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorDetails | null>(null);

  useEffect(() => {
    getCensusByCity(city).then((res) => setData(res.data));
  }, [city]);

  return (
    <CensusContext.Provider value={{ city, data, selectedSector, setCity, setSelectedSector }}>
      {children}
    </CensusContext.Provider>
  );
};

export const useCensusContext = () => useContext(CensusContext);