import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/Landing";
import Marketplace from "./features/market-place";
import StockManagement from "./features/crop-management";
import InventorySystem from "./features/inventory";
import AgriWeatherDashboard from "./features/weather";
import AuthPage from "./features/auth";
import LivestockInventory from "./features/inventory/livestock";
import CropInventory from "./features/inventory/crops";
import FarmerMarketplaceDashboard from "./features/market-place/admin";
import CropDetailsPage from "./features/blog";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/market-place" element={<Marketplace />} />
          <Route path="/stock-management" element={<StockManagement />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/inventory" element={<InventorySystem />} />
          <Route path="/weather" element={<AgriWeatherDashboard />} />
          <Route path="/livestock" element={<LivestockInventory />} />
          <Route path="/cropinventory" element={<CropInventory />} />
          <Route path="/blog" element={<CropDetailsPage />} />
          <Route path="/admin" element={<FarmerMarketplaceDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
