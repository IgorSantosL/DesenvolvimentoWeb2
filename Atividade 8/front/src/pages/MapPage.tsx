// src/pages/MapPage.tsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCensus } from '../hooks/useCensus';
import { getSectorByPoint } from '../services/api';
import { CityList } from '../components/CityList';
import { InfoBox } from '../components/InfoBox';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
`;

const MapContent = () => {
  const { data, setSelectedSector } = useCensus();
  const map = useMap();
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  // Atualiza o centro do mapa ao trocar de cidade
  useEffect(() => {
    if (data) {
      map.setView([data.centroid.latitude, data.centroid.longitude], 12);
    }
  }, [data, map]);

  // Lida com clique em setor censitário
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: async () => {
        const center = layer.getBounds().getCenter();
        const res = await getSectorByPoint(center.lat, center.lng);
        setSelectedSector(res.data);
      },
    });
  };

  const parseGeom = (geom: string | any) => {
    try {
      return typeof geom === 'string' ? JSON.parse(geom) : geom;
    } catch {
      return null;
    }
  };

  return (
    <>
      {data?.polygons.map((poly, idx) => {
        const parsed = parseGeom(poly.geom);
        return parsed ? (
          <GeoJSON
            key={idx}
            data={parsed}
            onEachFeature={onEachFeature}
            style={{ color: 'blue', weight: 2, fillOpacity: 0.3 }}
            ref={(ref) => {
              if (idx === 0) geoJsonRef.current = ref;
            }}
          />
        ) : null;
      })}
    </>
  );
};

export const MapPage = () => {
  const { data, selectedSector } = useCensus();

  const parseGeom = (geom: string | any) => {
    try {
      return typeof geom === 'string' ? JSON.parse(geom) : geom;
    } catch {
      return null;
    }
  };

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
          {selectedSector && selectedSector.geom && (
            <GeoJSON
              data={parseGeom(selectedSector.geom)}
              style={{ color: 'red', weight: 3 }}
            />
          )}
        </MapContainer>
      )}
      <CityList />
      <InfoBox />
    </Wrapper>
  );
};
