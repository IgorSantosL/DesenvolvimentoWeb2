import './App.css';
import { MegaSena } from './components/MegaSena';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resultados da Mega-Sena</h1>
      </header>
      <main>
        <MegaSena />
      </main>
    </div>
  );
}

export default App;