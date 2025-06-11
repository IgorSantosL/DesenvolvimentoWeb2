import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCensusContext } from '../context/CensusContext';
import { getSectorByPoint } from '../services/api';
import { CityList } from '../components/CityList';
import { InfoBox } from '../components/InfoBox';
import styled from 'styled-components';
import type { Feature, MultiPolygon } from 'geojson';
import type { Layer, PathOptions, LatLngBounds } from 'leaflet';

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

interface CustomLayer extends Layer {
  feature?: Feature;
  setStyle: (style: PathOptions) => this;
  bringToFront: () => this;
  getBounds: () => LatLngBounds;
}

const MapContent = () => {
  const { data, setSelectedSector } = useCensusContext();
  const map = useMap();
  const selectedLayerRef = useRef<CustomLayer | null>(null);
  const lastCityRef = useRef<string | null>(null);

  useEffect(() => {
    if (data) {
      map.flyTo([data.centroid.latitude, data.centroid.longitude], 12, {
        animate: true,
        duration: 1.5
      });
    }
  }, [data, map]);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const customLayer = layer as CustomLayer;

    customLayer.setStyle({
      color: '#3388ff',
      weight: 1,
      fillOpacity: 0.2,
      fillColor: '#3388ff'
    });

    customLayer.on('click', async () => {
      try {
        if (selectedLayerRef.current) {
          selectedLayerRef.current.setStyle({
            color: '#3388ff',
            weight: 1,
            fillOpacity: 0.2,
            fillColor: '#3388ff'
          });
        }

        customLayer.setStyle({
          color: '#ff0000',
          weight: 3,
          fillOpacity: 0.7,
          fillColor: '#ff0000'
        });
        customLayer.bringToFront();
        selectedLayerRef.current = customLayer;

        const bounds = customLayer.getBounds();
        const center = bounds.getCenter();
        const res = await getSectorByPoint(center.lat, center.lng);
        setSelectedSector(res.data);
      } catch (error) {
        console.error('Erro ao buscar setor:', error);
      }
    });
  };

  return (
    <>
      {data?.polygons.map((poly, idx) => {
        try {
          const geom = typeof poly.geom === 'string' ? JSON.parse(poly.geom) : poly.geom;

          if (geom.type !== 'MultiPolygon') return null;

          const feature: Feature<MultiPolygon> = {
            type: 'Feature',
            geometry: geom,
            properties: { cd_setor: String(poly.cd_setor) }
          };

          return (
            <GeoJSON
              key={`${poly.cd_setor}-${idx}`}
              data={feature}
              onEachFeature={onEachFeature}
            />
          );
        } catch (error) {
          console.error('Erro ao parsear geometria:', error);
          return null;
        }
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
          preferCanvas={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
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
