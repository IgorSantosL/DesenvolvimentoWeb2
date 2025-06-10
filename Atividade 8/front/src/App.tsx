import { MapPage } from './pages/MapPage';
import { CensusProvider } from './context/CensusContext';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <CensusProvider>
      <GlobalStyle />
      <MapPage />
    </CensusProvider>
  );
}

export default App;