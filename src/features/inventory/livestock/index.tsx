import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Milk,
  Cloud,
  PiggyBank,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  Edit,
  Trash,
} from "lucide-react";

// Interfaces
interface LivestockItem {
  id: string;
  type: "Cow" | "Sheep" | "Pig";
  tag: string;
  age: number;
  weight: number;
  healthStatus: "Healthy" | "Sick" | "Quarantined";
  location: string;
  lastCheckup: string;
}

interface FilterConfig {
  type: "Cow" | "Sheep" | "Pig" | "All";
  healthStatus: "Healthy" | "Sick" | "Quarantined" | "All";
  sortBy: keyof LivestockItem;
  sortDirection: "asc" | "desc";
}

const LivestockInventory: React.FC = () => {
  // States
  const [livestock, setLivestock] = useState<LivestockItem[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    type: "All",
    healthStatus: "All",
    sortBy: "tag",
    sortDirection: "asc",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<LivestockItem | null>(null);

  // Sample data
  useEffect(() => {
    const sampleData: LivestockItem[] = [
      {
        id: "1",
        type: "Cow",
        tag: "COW-001",
        age: 3,
        weight: 650,
        healthStatus: "Healthy",
        location: "Barn A",
        lastCheckup: "2024-10-01",
      },
      {
        id: "2",
        type: "Sheep",
        tag: "SHEEP-002",
        age: 2,
        weight: 120,
        healthStatus: "Sick",
        location: "Pasture B",
        lastCheckup: "2024-09-28",
      },
      {
        id: "3",
        type: "Pig",
        tag: "PIG-003",
        age: 1,
        weight: 220,
        healthStatus: "Quarantined",
        location: "Barn C",
        lastCheckup: "2024-10-05",
      },
    ];
    setLivestock(sampleData);
  }, []);

  // Filtering and sorting
  const filteredLivestock = livestock
    .filter((item) => {
      if (filterConfig.type !== "All" && item.type !== filterConfig.type)
        return false;
      if (
        filterConfig.healthStatus !== "All" &&
        item.healthStatus !== filterConfig.healthStatus
      )
        return false;
      return item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (a[filterConfig.sortBy] < b[filterConfig.sortBy])
        return filterConfig.sortDirection === "asc" ? -1 : 1;
      if (a[filterConfig.sortBy] > b[filterConfig.sortBy])
        return filterConfig.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Event handlers
  const handleFilterChange = (key: keyof FilterConfig, value: any) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  const handleSort = (key: keyof LivestockItem) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      sortBy: key,
      sortDirection:
        prevConfig.sortBy === key && prevConfig.sortDirection === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleEdit = (item: LivestockItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setLivestock((prevLivestock) =>
      prevLivestock.filter((item) => item.id !== id)
    );
  };

  // Helper functions
  const getHealthStatusColor = (
    status: LivestockItem["healthStatus"]
  ): string => {
    switch (status) {
      case "Healthy":
        return "text-success";
      case "Sick":
        return "text-danger";
      case "Quarantined":
        return "text-warning";
      default:
        return "text-secondary";
    }
  };

  const getHealthStatusIcon = (
    status: LivestockItem["healthStatus"]
  ): React.ReactNode => {
    switch (status) {
      case "Healthy":
        return <Milk className="text-success" />;
      case "Sick":
        return <Cloud className="text-danger" />;
      case "Quarantined":
        return <PiggyBank className="text-warning" />;
      default:
        return <Milk className="text-secondary" />;
    }
  };

  // Render the component
  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Livestock Inventory</h2>
          <p className="text-muted">Manage your livestock data</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="me-2" /> Add New Livestock
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Filter size={18} />
                </span>
                <select
                  className="form-select"
                  value={filterConfig.type}
                  onChange={(e) =>
                    handleFilterChange(
                      "type",
                      e.target.value as "Cow" | "Sheep" | "Pig" | "All"
                    )
                  }
                >
                  <option value="All">All Types</option>
                  <option value="Cow">Cows</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Pig">Pigs</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Filter size={18} />
                </span>
                <select
                  className="form-select"
                  value={filterConfig.healthStatus}
                  onChange={(e) =>
                    handleFilterChange(
                      "healthStatus",
                      e.target.value as
                        | "Healthy"
                        | "Sick"
                        | "Quarantined"
                        | "All"
                    )
                  }
                >
                  <option value="All">All Health Statuses</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Sick">Sick</option>
                  <option value="Quarantined">Quarantined</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  {filterConfig.sortDirection === "asc" ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
                <select
                  className="form-select"
                  value={filterConfig.sortBy}
                  onChange={(e) =>
                    handleFilterChange(
                      "sortBy",
                      e.target.value as keyof LivestockItem
                    )
                  }
                >
                  <option value="tag">Sort by Tag</option>
                  <option value="age">Sort by Age</option>
                  <option value="weight">Sort by Weight</option>
                  <option value="healthStatus">Sort by Health Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Livestock Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Type</th>
                  <th onClick={() => handleSort("tag")}>Tag</th>
                  <th onClick={() => handleSort("age")}>Age</th>
                  <th onClick={() => handleSort("weight")}>Weight</th>
                  <th onClick={() => handleSort("healthStatus")}>
                    Health Status
                  </th>
                  <th>Location</th>
                  <th>Last Checkup</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLivestock.map((item) => (
                  <tr key={item.id}>
                    <td>{getHealthStatusIcon(item.healthStatus)}</td>
                    <td>{item.tag}</td>
                    <td>{item.age} years</td>
                    <td>{item.weight} kg</td>
                    <td>
                      <span className={getHealthStatusColor(item.healthStatus)}>
                        {item.healthStatus}
                      </span>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.lastCheckup}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Livestock Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Livestock</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">{/* Add form fields here */}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Add Livestock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Livestock Modal */}
      {showEditModal && selectedItem && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Livestock</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">{/* Edit form fields here */}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockInventory;
