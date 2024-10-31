// InventorySystem.tsx

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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  BarChart2,
  Filter,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";

// Interfaces
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  reorderPoint: number;
  lastUpdated: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  supplier: string;
  location: string;
}

interface AnalyticsData {
  month: string;
  inStock: number;
  outStock: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface SortConfig {
  key: keyof InventoryItem;
  direction: "asc" | "desc";
}

type ViewType = "dashboard" | "inventory" | "orders";

const InventorySystem: React.FC = () => {
  // States with proper typing
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Sample data
  const inventoryData: InventoryItem[] = [
    {
      id: "001",
      name: "Widget A",
      category: "Electronics",
      quantity: 150,
      price: 29.99,
      reorderPoint: 50,
      lastUpdated: "2024-10-25",
      status: "In Stock",
      supplier: "Tech Supply Co",
      location: "Warehouse A",
    },
    {
      id: "002",
      name: "Gadget B",
      category: "Electronics",
      quantity: 30,
      price: 49.99,
      reorderPoint: 40,
      lastUpdated: "2024-10-24",
      status: "Low Stock",
      supplier: "Gadget World",
      location: "Warehouse B",
    },
    {
      id: "003",
      name: "Tool C",
      category: "Hardware",
      quantity: 0,
      price: 15.99,
      reorderPoint: 20,
      lastUpdated: "2024-10-23",
      status: "Out of Stock",
      supplier: "Hardware Plus",
      location: "Warehouse A",
    },
  ];

  const analyticsData: AnalyticsData[] = [
    { month: "Jul", inStock: 450, outStock: 50 },
    { month: "Aug", inStock: 420, outStock: 80 },
    { month: "Sep", inStock: 480, outStock: 20 },
    { month: "Oct", inStock: 460, outStock: 40 },
  ];

  const categoryData: CategoryData[] = [
    { name: "Electronics", value: 45 },
    { name: "Hardware", value: 30 },
    { name: "Office Supplies", value: 15 },
    { name: "Others", value: 10 },
  ];

  const COLORS: string[] = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Event handlers with TypeScript
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCategoryFilter(e.target.value);
  };

  const handleSort = (key: keyof InventoryItem): void => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filtering and sorting logic with proper typing
  const filteredItems: InventoryItem[] = inventoryData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || item.category === categoryFilter)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  // Helper function for status badge color
  const getStatusBadgeClass = (status: InventoryItem["status"]): string => {
    switch (status) {
      case "In Stock":
        return "bg-success";
      case "Low Stock":
        return "bg-warning";
      case "Out of Stock":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded mb-4">
        <div className="container-fluid">
          <span className="navbar-brand d-flex align-items-center">
            <Package className="me-2" />
            Enterprise Inventory System
          </span>
          <div className="navbar-nav">
            {(["dashboard", "inventory", "orders"] as ViewType[]).map(
              (view) => (
                <button
                  key={view}
                  className={`nav-link btn ${
                    activeView === view ? "active" : ""
                  }`}
                  onClick={() => setActiveView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Items</h6>
                  <h3 className="mb-0">1,234</h3>
                  <small className="text-success">
                    <ArrowUpRight size={16} className="me-1" />
                    +3.2% this week
                  </small>
                </div>
                <Package size={40} className="text-primary opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Low Stock Items</h6>
                  <h3 className="mb-0">28</h3>
                  <small className="text-danger">
                    <ArrowUpRight size={16} className="me-1" />
                    +5 since yesterday
                  </small>
                </div>
                <AlertTriangle size={40} className="text-warning opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Value</h6>
                  <h3 className="mb-0">$52,432</h3>
                  <small className="text-success">
                    <ArrowUpRight size={16} className="me-1" />
                    +2.4% this month
                  </small>
                </div>
                <DollarSign size={40} className="text-success opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Orders</h6>
                  <h3 className="mb-0">15</h3>
                  <small className="text-warning">
                    <RefreshCw size={16} className="me-1" />5 processing
                  </small>
                </div>
                <ShoppingCart size={40} className="text-info opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Left Column - Main Content */}
        <div className="col-md-8">
          {/* Search and Filters */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search inventory..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <Filter size={18} />
                    </span>
                    <select
                      className="form-select"
                      value={categoryFilter}
                      onChange={handleCategoryChange}
                    >
                      <option value="all">All Categories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus size={18} className="me-2" />
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory List */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("category")}>Category</th>
                    <th onClick={() => handleSort("quantity")}>Quantity</th>
                    <th onClick={() => handleSort("price")}>Price</th>
                    <th>Status</th>
                    <th>Supplier</th>
                    <th>Location</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.supplier}</td>
                      <td>{item.location}</td>
                      <td>{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Analytics */}
        <div className="col-md-4">
          {/* Analytics Charts */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title">Stock Overview</h5>
              <BarChart width={300} height={200} data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inStock" fill="#0088FE" />
                <Bar dataKey="outStock" fill="#FF8042" />
              </BarChart>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Category Distribution</h5>
              <PieChart width={300} height={200}>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">
                      Item Name
                    </label>
                    <input type="text" className="form-control" id="itemName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select className="form-select" id="category">
                      <option value="Electronics">Electronics</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="price"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventorySystem;
