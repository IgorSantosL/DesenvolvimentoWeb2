import { useCity } from '../context/AppContext';
import styled from 'styled-components';

const InfoContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 16px 24px;
  z-index: 1000;
  min-width: 160px;
`;

export const IrradiationInfo = () => {
  const { city } = useCity();

  if (!city || !city.irradiation) return null;

  const { anual, jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez } = city.irradiation;

  return (
    <InfoContainer>
      <h4>Irradiação</h4>
      <div>Anual: {anual}</div>
      <div>Jan: {jan}</div>
      <div>Fev: {fev}</div>
      <div>Mar: {mar}</div>
      <div>Abr: {abr}</div>
      <div>Mai: {mai}</div>
      <div>Jun: {jun}</div>
      <div>Jul: {jul}</div>
      <div>Ago: {ago}</div>
      <div>Set: {set}</div>
      <div>Out: {out}</div>
      <div>Nov: {nov}</div>
      <div>Dez: {dez}</div>
    </InfoContainer>
  );
};