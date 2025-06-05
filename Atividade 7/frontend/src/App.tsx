import { CityProvider } from "./context/AppContext";
import { CityList } from "./components/CityList";
import { MapView } from "./MapView";

function App() {
  return (
    <CityProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <CityList />
        <div style={{ flex: 1 }}>
          <MapView />
        </div>
      </div>
    </CityProvider>
  );
}

export default App;