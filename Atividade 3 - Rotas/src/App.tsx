import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApostaLista from "./components/ApostaLista";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apostas" element={<ApostaLista />} />
      </Routes>
    </Router>
  );
};

export default App;