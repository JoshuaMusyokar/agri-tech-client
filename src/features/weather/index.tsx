import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Leaf,
  Timer,
  Filter,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react";

// Interfaces
interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  soilMoisture: number;
  solarRadiation: number;
}

interface ForecastData {
  date: string;
  tempHigh: number;
  tempLow: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

interface CropHealth {
  id: string;
  field: string;
  crop: string;
  stage: string;
  gdd: number;
  stress: "Low" | "Medium" | "High";
  soilMoisture: number;
  lastIrrigation: string;
}

interface Location {
  id: string;
  name: string;
  lat: number;
  long: number;
}

const AgriWeatherDashboard: React.FC = () => {
  // States
  const [selectedLocation, setSelectedLocation] = useState<string>("field-1");
  const [dateRange, setDateRange] = useState<"24h" | "7d" | "30d">("24h");
  const [showAlert, setShowAlert] = useState<boolean>(true);

  // Sample data
  const locations: Location[] = [
    { id: "field-1", name: "North Field", lat: 42.3601, long: -71.0589 },
    { id: "field-2", name: "South Valley", lat: 42.3555, long: -71.0486 },
    { id: "field-3", name: "West Plains", lat: 42.3526, long: -71.0642 },
  ];

  const hourlyData: WeatherData[] = [
    {
      timestamp: "08:00",
      temperature: 18.5,
      humidity: 65,
      precipitation: 0,
      windSpeed: 12,
      soilMoisture: 45,
      solarRadiation: 750,
    },
    // Add more hourly data points...
  ];

  const forecastData: ForecastData[] = [
    {
      date: "2024-10-27",
      tempHigh: 25,
      tempLow: 15,
      precipitation: 30,
      humidity: 75,
      windSpeed: 15,
    },
    // Add more forecast data...
  ];

  const cropData: CropHealth[] = [
    {
      id: "crop-1",
      field: "North Field",
      crop: "Corn",
      stage: "Vegetative",
      gdd: 1250,
      stress: "Low",
      soilMoisture: 42,
      lastIrrigation: "2024-10-25",
    },
    // Add more crop data...
  ];

  // Helper functions
  const getStressColor = (stress: CropHealth["stress"]): string => {
    switch (stress) {
      case "Low":
        return "bg-success";
      case "Medium":
        return "bg-warning";
      case "High":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const calculateGDDProgress = (gdd: number): number => {
    const maxGDD = 2000; // Example maximum GDD for corn
    return (gdd / maxGDD) * 100;
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Agricultural Weather Service</h2>
          <p className="text-muted">
            Real-time weather monitoring and forecasting
          </p>
        </div>
        <div className="d-flex gap-3">
          <select
            className="form-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          <div className="btn-group">
            {(["24h", "7d", "30d"] as const).map((range) => (
              <button
                key={range}
                className={`btn btn-outline-primary ${
                  dateRange === range ? "active" : ""
                }`}
                onClick={() => setDateRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Alert */}
      {showAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <AlertTriangle className="me-2" />
          <strong>Weather Alert:</strong> Heavy rainfall expected in the next 24
          hours. Consider adjusting irrigation schedules.
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      {/* Current Conditions */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Temperature</h6>
                  <h3 className="mb-0">22.5°C</h3>
                  <small className="text-muted">Feels like 24°C</small>
                </div>
                <Thermometer size={40} className="text-danger opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Soil Moisture</h6>
                  <h3 className="mb-0">42%</h3>
                  <small className="text-success">Optimal Range</small>
                </div>
                <Droplets size={40} className="text-primary opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Solar Radiation</h6>
                  <h3 className="mb-0">750 W/m²</h3>
                  <small className="text-warning">High</small>
                </div>
                <Sun size={40} className="text-warning opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Wind Speed</h6>
                  <h3 className="mb-0">12 km/h</h3>
                  <small className="text-muted">NE Direction</small>
                </div>
                <Wind size={40} className="text-info opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Left Column - Weather Charts */}
        <div className="col-md-8">
          {/* Temperature and Humidity Chart */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title">Temperature & Humidity Trends</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis yAxisId="temp" />
                  <YAxis yAxisId="humidity" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ff7300"
                    name="Temperature (°C)"
                  />
                  <Line
                    yAxisId="humidity"
                    type="monotone"
                    dataKey="humidity"
                    stroke="#82ca9d"
                    name="Humidity (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Soil Moisture and Precipitation */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title">Soil Moisture & Precipitation</h5>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="soilMoisture"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Soil Moisture (%)"
                  />
                  <Area
                    type="monotone"
                    dataKey="precipitation"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Precipitation (mm)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Forecasts & Crop Health */}
        <div className="col-md-4">
          {/* 7-Day Forecast */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title">7-Day Forecast</h5>
              <div className="list-group list-group-flush">
                {forecastData.map((day, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0">{day.date}</h6>
                        <small className="text-muted">
                          {day.precipitation}% precipitation
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="mb-1">
                          <strong>{day.tempHigh}°C</strong> / {day.tempLow}°C
                        </div>
                        <small className="text-muted">
                          Wind: {day.windSpeed} km/h
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crop Health Status */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Crop Health Status</h5>
              <div className="list-group list-group-flush">
                {cropData.map((crop) => (
                  <div key={crop.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">
                        {crop.crop} - {crop.field}
                      </h6>
                      <span className={`badge ${getStressColor(crop.stress)}`}>
                        {crop.stress} Stress
                      </span>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">
                        Growth Stage: {crop.stage}
                      </small>
                    </div>
                    <div className="progress mb-2" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${calculateGDDProgress(crop.gdd)}%` }}
                        aria-valuenow={calculateGDDProgress(crop.gdd)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <small className="text-muted">
                      GDD: {crop.gdd} • Last Irrigation: {crop.lastIrrigation}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriWeatherDashboard;
