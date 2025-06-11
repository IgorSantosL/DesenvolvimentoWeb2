import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  // ✅ impede conflitos visuais com as camadas do mapa
  .leaflet-container {
    z-index: 0;
  }

  .leaflet-interactive {
    pointer-events: auto !important;
    shape-rendering: geometricPrecision;
  }
`;

export default GlobalStyle;
