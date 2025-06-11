import styled from 'styled-components';
import { useCensus } from '../hooks/useCensus';

const Box = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border-radius: 8px;
`;

export const InfoBox = () => {
  const { selectedSector } = useCensus();

  if (!selectedSector) return null;

  return (
    <Box>
      <div><strong>Cód. Setor:</strong> {selectedSector.cd_setor}</div>
      <div><strong>Município:</strong> {selectedSector.nm_mun}</div>
      <div><strong>Situação:</strong> {selectedSector.situacao}</div>
      <div><strong>Área:</strong> {selectedSector.area_km2.toFixed(3)} km²</div>
    </Box>
  );
};
