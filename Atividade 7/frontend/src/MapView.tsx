import { MapContainer, TileLayer, Marker, Polygon, Popup } from "react-leaflet";
import { useCity } from "./context/AppContext";
import * as wellknown from "wellknown";
import { IrradiationInfo } from "./components/IrradiationInfo";
import { MapFlyToCity } from "./components/Map";

export const MapView = () => {
  const { city } = useCity();

  
  let polygonCoords: [number, number][] = [];
  if (
    city &&
    city.irradiation &&
    typeof city.irradiation.geom === "string" &&
    city.irradiation.geom.startsWith("POLYGON")
  ) {
    const geom = wellknown.parse(city.irradiation.geom);
    if (geom && geom.type === "Polygon") {
      polygonCoords = geom.coordinates[0].map((pos: number[]) => [
        pos[1],
        pos[0],
      ]);
    }
  }

  // Posição do marcador (centro da célula de incidência)
  const markerPosition =
    city && city.irradiation
      ? [city.irradiation.lat, city.irradiation.lon]
      : [-14.235, -51.9253];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer
        center={markerPosition}
        zoom={city ? 11 : 4}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyToCity />
        {city && city.irradiation && (
          <>
            {polygonCoords.length > 0 && (
              <Polygon
                positions={polygonCoords}
                pathOptions={{ color: "red", weight: 2 }}
              />
            )}
            <Marker position={markerPosition}>
              <Popup>
                <b>{city.nome}</b>
                <br />
                Anual: {city.irradiation.anual}
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
      {/* Exibe a tabela de irradiação no canto superior direito */}
      <IrradiationInfo />
    </div>
  );
};
