import { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCensusContext } from '../context/CensusContext';
import { getSectorByPoint } from '../services/api';
import { CityList } from '../components/CityList';
import { InfoBox } from '../components/InfoBox';
import styled from 'styled-components';
import type { Feature, MultiPolygon } from 'geojson';
import type { Layer } from 'leaflet';

interface SectorLayer extends Layer {
  feature?: Feature;
  setStyle?: (style: L.PathOptions) => void;
  bringToFront?: () => void;
  getBounds?: () => L.LatLngBounds;
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const StyledInfoBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
`;

const parseGeom = (
  geom: string | object,
  cd_setor: string | number
): Feature<MultiPolygon> | null => {
  try {
    const parsed = typeof geom === 'string' ? JSON.parse(geom) : geom;
    if (parsed.type !== 'MultiPolygon') return null;
    return {
      type: 'Feature',
      geometry: parsed,
      properties: { cd_setor: String(cd_setor) },
    };
  } catch {
    return null;
  }
};

const MapContent = () => {
  const { data, setSelectedSector, selectedSector } = useCensusContext();
  const map = useMap();
  const layersRef = useRef<SectorLayer[]>([]);

  // Limpa as referências sempre que os dados mudam
  useEffect(() => {
    layersRef.current = [];
  }, [data]);

  const applyStyles = useCallback(() => {
    layersRef.current.forEach((layer) => {
      const feature = layer.feature;
      const featureCd = String(feature?.properties?.cd_setor || '');
      const selectedCd = String(selectedSector?.cd_setor || '');
      const isSelected = featureCd === selectedCd;

      const style = isSelected
        ? { color: 'red', weight: 3, fillOpacity: 0.7 }
        : { color: 'blue', weight: 1, fillOpacity: 0.2 };

      layer.setStyle?.(style);
    });
  }, [selectedSector]);

  useEffect(() => {
    if (data) {
      map.setView([data.centroid.latitude, data.centroid.longitude], 12);
    }
  }, [data, map]);

  useEffect(() => {
    applyStyles();
  }, [applyStyles]);

  const onEachFeature = useCallback(
    (feature: Feature, layer: SectorLayer) => {
      // Adiciona o layer apenas se ainda não estiver no array
      if (!layersRef.current.includes(layer)) {
        layersRef.current.push(layer);
      }
      layer.setStyle?.({ color: 'blue', weight: 1, fillOpacity: 0.2 });

      layer.on('click', async () => {
        if (layer.getBounds) {
          const center = layer.getBounds().getCenter();
          try {
            const res = await getSectorByPoint(center.lat, center.lng);
            setSelectedSector(res.data);
            layer.bringToFront?.();
            // Não chame applyStyles aqui, pois o estado já dispara o efeito
          } catch (error) {
            console.error('Erro ao buscar setor:', error);
          }
        }
      });
    },
    [setSelectedSector]
  );

  return (
    <>
      {data?.polygons.map((poly, idx) => {
        const parsed = parseGeom(poly.geom, poly.cd_setor);
        return parsed ? (
          <GeoJSON
            key={`${data.centroid.latitude}-${idx}`}
            data={parsed}
            onEachFeature={(feature, layer) => {
              (layer as SectorLayer).feature = feature;
              onEachFeature(feature, layer as SectorLayer);
            }}
          />
        ) : null;
      })}
    </>
  );
};

export const MapPage = () => {
  const { data } = useCensusContext();

  return (
    <Wrapper>
      {data && (
        <MapContainer
          center={[data.centroid.latitude, data.centroid.longitude]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapContent />
        </MapContainer>
      )}
      <CityList />
      <StyledInfoBox>
        <InfoBox />
      </StyledInfoBox>
    </Wrapper>
  );
};