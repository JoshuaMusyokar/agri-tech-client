import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Camera,
  AlertTriangle,
  Leaf,
  Calendar,
  Clock,
  Sun,
  Droplet,
  ThermometerSun,
} from "lucide-react";

const StockManagement = () => {
  // Sample data - in a real app this would come from your backend
  const [activeTab, setActiveTab] = useState("crops");

  const cropData = [
    {
      id: 1,
      name: "Wheat Field A",
      status: "Growing",
      health: 92,
      moisture: 76,
      temp: 23,
      lastWatered: "2h ago",
      nextHarvest: "45 days",
    },
    {
      id: 2,
      name: "Corn Field B",
      status: "Ready to Harvest",
      health: 87,
      moisture: 65,
      temp: 25,
      lastWatered: "5h ago",
      nextHarvest: "2 days",
    },
    {
      id: 3,
      name: "Soybean Plot C",
      status: "Early Stage",
      health: 95,
      moisture: 82,
      temp: 22,
      lastWatered: "1h ago",
      nextHarvest: "90 days",
    },
  ];

  const livestockData = [
    {
      id: 1,
      type: "Cattle",
      count: 150,
      healthy: 147,
      quarantine: 3,
      avgWeight: 520,
      lastVaccination: "15 days ago",
      nextCheckup: "7 days",
    },
    {
      id: 2,
      type: "Poultry",
      count: 2500,
      healthy: 2480,
      quarantine: 20,
      avgWeight: 2.1,
      lastVaccination: "5 days ago",
      nextCheckup: "10 days",
    },
    {
      id: 3,
      type: "Sheep",
      count: 300,
      healthy: 298,
      quarantine: 2,
      avgWeight: 45,
      lastVaccination: "20 days ago",
      nextCheckup: "3 days",
    },
  ];

  const yieldData = [
    { month: "Jan", crops: 4200, livestock: 3800 },
    { month: "Feb", crops: 3800, livestock: 4100 },
    { month: "Mar", crops: 4100, livestock: 3900 },
    { month: "Apr", crops: 4800, livestock: 4200 },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4 rounded">
        <div className="container-fluid">
          <span className="navbar-brand d-flex align-items-center">
            <Leaf className="me-2" />
            AgriTech Management System
          </span>
          <div className="navbar-nav">
            <button
              className={`nav-link btn ${
                activeTab === "crops" ? "active" : ""
              }`}
              onClick={() => setActiveTab("crops")}
            >
              Crops
            </button>
            <button
              className={`nav-link btn ${
                activeTab === "livestock" ? "active" : ""
              }`}
              onClick={() => setActiveTab("livestock")}
            >
              Livestock
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Fields</h6>
              <h2 className="card-title">12</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Livestock Count</h6>
              <h2 className="card-title">2,950</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  style={{ width: "88%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Average Yield</h6>
              <h2 className="card-title">92%</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Health Status</h6>
              <h2 className="card-title">Good</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Left Column */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Monthly Performance</h5>
              <LineChart width={700} height={300} data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="crops" stroke="#28a745" />
                <Line type="monotone" dataKey="livestock" stroke="#007bff" />
              </LineChart>
            </div>
          </div>

          {/* Table Section */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                {activeTab === "crops"
                  ? "Crop Management"
                  : "Livestock Management"}
              </h5>
              <div className="table-responsive">
                {activeTab === "crops" ? (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Health</th>
                        <th>Moisture</th>
                        <th>Temperature</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropData.map((crop) => (
                        <tr key={crop.id}>
                          <td>{crop.name}</td>
                          <td>
                            <span className="badge bg-success">
                              {crop.status}
                            </span>
                          </td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: "20px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{ width: `${crop.health}%` }}
                              >
                                {crop.health}%
                              </div>
                            </div>
                          </td>
                          <td>{crop.moisture}%</td>
                          <td>{crop.temp}°C</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <Camera className="w-4 h-4" />
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Health Status</th>
                        <th>Last Vaccination</th>
                        <th>Next Checkup</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {livestockData.map((animal) => (
                        <tr key={animal.id}>
                          <td>{animal.type}</td>
                          <td>{animal.count}</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: "20px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${
                                    (animal.healthy / animal.count) * 100
                                  }%`,
                                }}
                              >
                                {animal.healthy}/{animal.count}
                              </div>
                            </div>
                          </td>
                          <td>{animal.lastVaccination}</td>
                          <td>{animal.nextCheckup}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <Calendar className="w-4 h-4" />
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Monitoring */}
        <div className="col-md-4">
          {/* Weather Monitor */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Environmental Monitoring</h5>
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <ThermometerSun className="me-2 text-warning" />
                    Temperature
                  </div>
                  <span>24°C</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <Droplet className="me-2 text-primary" />
                    Humidity
                  </div>
                  <span>65%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <Sun className="me-2 text-warning" />
                    UV Index
                  </div>
                  <span>Medium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  <Clock className="me-2" />
                  Schedule Irrigation
                </button>
                <button className="btn btn-success">
                  <Calendar className="me-2" />
                  Plan Harvesting
                </button>
                <button className="btn btn-warning">
                  <AlertTriangle className="me-2" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Recent Alerts</h5>
              <div className="list-group">
                <div className="list-group-item list-group-item-warning">
                  Low soil moisture in Wheat Field A
                </div>
                <div className="list-group-item list-group-item-info">
                  Vaccination due for Cattle Group B
                </div>
                <div className="list-group-item list-group-item-success">
                  Corn Field B ready for harvest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
