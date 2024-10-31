import React, { useState } from "react";
import { format } from "date-fns";
import {
  PlusIcon,
  SearchIcon,
  TrashIcon,
  EditIcon,
  BellIcon,
  TrendingUpIcon,
  PackageIcon,
  DollarSignIcon,
  UsersIcon,
  AlertTriangleIcon,
  FilterIcon,
  DownloadIcon,
  Settings2Icon,
  LineChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Modal,
  Button,
  Form,
  Badge,
  Pagination,
  Tooltip as BSTooltip,
  Dropdown,
  Nav,
  Tab,
  Alert,
} from "react-bootstrap";

interface FarmerProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  orders: number;
  createdAt: string;
  status: "Available" | "Out of Stock" | "Low Stock";
  sku: string;
  discount: number;
  rating: number;
  reviews: number;
  sales: number[];
}

interface Notification {
  id: number;
  message: string;
  type: "warning" | "success" | "info";
  time: string;
}

const FarmerMarketplaceDashboard: React.FC = () => {
  // Sample data with more realistic values
  const [products, setProducts] = useState<FarmerProduct[]>([
    {
      id: 1,
      name: "Organic Tomatoes",
      description: "Fresh, locally grown organic tomatoes",
      price: 2.99,
      quantity: 50,
      category: "Vegetables",
      imageUrl: "/api/placeholder/150/150",
      orders: 25,
      createdAt: "2024-04-01",
      status: "Available",
      sku: "VEG-TOM-001",
      discount: 10,
      rating: 4.5,
      reviews: 128,
      sales: [23, 34, 45, 56, 45, 34, 45],
    },
    {
      id: 2,
      name: "Free Range Eggs",
      description: "Farm fresh free-range eggs",
      price: 4.99,
      quantity: 8,
      category: "Dairy & Eggs",
      imageUrl: "/api/placeholder/150/150",
      orders: 42,
      createdAt: "2024-04-01",
      status: "Low Stock",
      sku: "DAI-EGG-002",
      discount: 0,
      rating: 4.8,
      reviews: 256,
      sales: [45, 56, 67, 78, 67, 56, 67],
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Low stock alert: Free Range Eggs",
      type: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New order received for Organic Tomatoes",
      type: "success",
      time: "5 hours ago",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FarmerProduct | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7days");

  // Analytics Data
  const revenueData = [
    { name: "Mon", revenue: 1200 },
    { name: "Tue", revenue: 1800 },
    { name: "Wed", revenue: 1600 },
    { name: "Thu", revenue: 2100 },
    { name: "Fri", revenue: 1900 },
    { name: "Sat", revenue: 2400 },
    { name: "Sun", revenue: 2200 },
  ];

  const categoryData = [
    { name: "Vegetables", value: 35 },
    { name: "Fruits", value: 25 },
    { name: "Dairy", value: 20 },
    { name: "Grains", value: 15 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary" href="#">
            <PackageIcon className="me-2" />
            FarmersMarket Admin
          </a>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <BellIcon className="cursor-pointer" />
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {notifications.length}
              </Badge>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Admin User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-3">
        {/* Quick Stats */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Revenue</h6>
                    <h3 className="mb-0">$12,845</h3>
                    <small className="text-success">
                      <TrendingUpIcon size={16} /> +15.3%
                    </small>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <DollarSignIcon className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Orders</h6>
                    <h3 className="mb-0">384</h3>
                    <small className="text-success">
                      <TrendingUpIcon size={16} /> +8.2%
                    </small>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <PackageIcon className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Active Products</h6>
                    <h3 className="mb-0">{products.length}</h3>
                    <small className="text-warning">
                      {products.filter((p) => p.status === "Low Stock").length}{" "}
                      low stock
                    </small>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <PackageIcon className="text-warning" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Customer Reviews</h6>
                    <h3 className="mb-0">4.8</h3>
                    <small className="text-success">384 total reviews</small>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <UsersIcon className="text-info" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tab.Container defaultActiveKey="overview">
          <Nav variant="pills" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="overview">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="products">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="analytics">Analytics</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="overview">
              <div className="row">
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Revenue Overview</h5>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm">
                            {selectedTimeRange}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => setSelectedTimeRange("7days")}
                            >
                              Last 7 Days
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setSelectedTimeRange("30days")}
                            >
                              Last 30 Days
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setSelectedTimeRange("90days")}
                            >
                              Last 90 Days
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="card-body">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8884d8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Category Distribution</h5>
                    </div>
                    <div className="card-body">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Recent Activity</h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          {notification.type === "warning" && (
                            <AlertTriangleIcon className="text-warning me-2" />
                          )}
                          {notification.type === "success" && (
                            <PackageIcon className="text-success me-2" />
                          )}
                          {notification.type === "info" && (
                            <LineChartIcon className="text-info me-2" />
                          )}
                          <div>
                            <p className="mb-0">{notification.message}</p>
                            <small className="text-muted">
                              {notification.time}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Pane>

            {/* Products Tab */}
            <Tab.Pane eventKey="products">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Products</h5>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  <PlusIcon className="me-2" /> Add Product
                </Button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <Badge
                            bg={
                              product.status === "Available"
                                ? "success"
                                : product.status === "Low Stock"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="warning"
                            className="me-2"
                            onClick={() => setEditingProduct(product)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <TrashIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Pane>

            {/* Orders Tab */}
            <Tab.Pane eventKey="orders">
              <h5>Orders Overview</h5>
              <Alert variant="info">Orders management coming soon!</Alert>
            </Tab.Pane>

            {/* Analytics Tab */}
            <Tab.Pane eventKey="analytics">
              <h5>Sales Analytics</h5>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Product Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  defaultValue={editingProduct?.name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  defaultValue={editingProduct?.price}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  defaultValue={editingProduct?.category}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  defaultValue={editingProduct?.quantity}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary">Save Product</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );

  function handleDeleteProduct(productId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  }
};

export default FarmerMarketplaceDashboard;
