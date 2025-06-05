import { useEffect, useState } from "react";
import { getCities, getIrradiationByCity } from "../services/api";
import { useCity } from "../context/AppContext";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 250px;
  overflow-y: auto;
  background-color: #f4f4f4;
  height: 100vh;
`;

const CityItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

type City = {
  id: number;
  nome: string;
  geom: string;
};

export const CityList = () => {
  const [cities, setCities] = useState<City[]>([]);
  const { setCity } = useCity();

  useEffect(() => {
    getCities().then(res => setCities(res.data));
  }, []);

  const handleCityClick = async (city: City) => {
    const res = await getIrradiationByCity(city.id);
    const { cidade, incidencia } = res.data;
    setCity({
      id: cidade.id,
      nome: cidade.nome,
      geom: cidade.geom,
      irradiation: incidencia[0]
    });
  };

  return (
    <ListContainer>
      {cities.map(city => (
        <CityItem key={city.id} onClick={() => handleCityClick(city)}>
          {city.nome}
        </CityItem>
      ))}
    </ListContainer>
  );
};