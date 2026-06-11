import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemsPage from "./pages/ItemsPage";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelItemsPage";

import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/models" element={<ModelsPage />} />
      </Routes>
    </div>
  );
}

export default App;
