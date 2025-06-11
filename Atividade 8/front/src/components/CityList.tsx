import styled from 'styled-components';
import { useCensus } from '../hooks/useCensus';

const cities = ['Campinas', 'Jacareí', 'São José dos Campos', 'Sorocaba', 'Ribeirão Preto', 'São José do Rio Preto', 'Piracicaba'];

const List = styled.ul`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  list-style: none;
  z-index: 1000;
`;


const Item = styled.li`
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

export const CityList = () => {
  const { setCity } = useCensus();
  return (
    <List>
      <strong>Cidades:</strong>
      {cities.map(city => (
        <Item key={city} onClick={() => setCity(city)}>{city}</Item>
      ))}
    </List>
  );
};
