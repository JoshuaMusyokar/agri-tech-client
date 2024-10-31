import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Badge,
  Card,
  Nav,
  Tab,
  ListGroup,
  ProgressBar,
  Dropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  LeafIcon,
  CloudRainIcon,
  SunIcon,
  TrendingUpIcon,
  CalendarIcon,
} from "lucide-react";

// Crop interface
interface Crop {
  id: number;
  name: string;
  adaptiveFeatures: string[];
  lifecycle: { stage: string; duration: string; icon: React.ReactNode }[];
  production: number[];
  regions: string[];
  imageUrl: string;
}

// Sample crop data
const crops: Crop[] = [
  {
    id: 1,
    name: "Maize",
    adaptiveFeatures: [
      "Drought-resistant",
      "Thrives in well-drained soils",
      "Requires moderate sunlight",
    ],
    lifecycle: [
      { stage: "Planting", duration: "7 days", icon: <LeafIcon /> },
      { stage: "Growing", duration: "30 days", icon: <SunIcon /> },
      { stage: "Harvesting", duration: "15 days", icon: <TrendingUpIcon /> },
    ],
    production: [50, 80, 60, 90, 100, 120, 110], // Weekly yield
    regions: ["Kenya", "Uganda", "Tanzania"],
    imageUrl: "/images/maize.jpg",
  },
  {
    id: 2,
    name: "Rice",
    adaptiveFeatures: [
      "Requires flooded soil",
      "Thrives in humid climates",
      "Needs 4-5 hours of sunlight",
    ],
    lifecycle: [
      { stage: "Seedling", duration: "10 days", icon: <LeafIcon /> },
      { stage: "Growing", duration: "60 days", icon: <CloudRainIcon /> },
      { stage: "Harvest", duration: "20 days", icon: <TrendingUpIcon /> },
    ],
    production: [70, 90, 85, 95, 100, 130, 120], // Weekly yield
    regions: ["India", "Thailand", "Vietnam"],
    imageUrl: "/images/rice.jpg",
  },
];

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#82ca9d"];

const CropDetailsPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop>(crops[0]);

  return (
    <Container fluid className="min-vh-100 bg-light py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary fw-bold">Agri-Tech Crop Overview</h2>
          <p className="text-muted">
            Explore crop lifecycle, production trends, and adaptive features.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Img variant="top" src={selectedCrop.imageUrl} />
            <Card.Body>
              <Card.Title>{selectedCrop.name}</Card.Title>
              <Dropdown>
                <Dropdown.Toggle variant="primary" size="sm">
                  Select Crop
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {crops.map((crop) => (
                    <Dropdown.Item
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                    >
                      {crop.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <ListGroup className="mt-3">
                <ListGroup.Item>
                  <b>Adaptive Features:</b>
                  <ul className="mt-2">
                    {selectedCrop.adaptiveFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Regions Grown:</b> {selectedCrop.regions.join(", ")}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Tab.Container defaultActiveKey="lifecycle">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="lifecycle">Lifecycle</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="production">Production</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* Lifecycle Tab */}
              <Tab.Pane eventKey="lifecycle">
                <Row>
                  {selectedCrop.lifecycle.map((stage, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Card className="border-0 shadow-sm text-center">
                        <Card.Body>
                          {stage.icon}
                          <Card.Title className="mt-2">
                            {stage.stage}
                          </Card.Title>
                          <Card.Text>{stage.duration}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>

              {/* Production Tab */}
              <Tab.Pane eventKey="production">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Weekly Production Trend</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={selectedCrop.production.map((value, i) => ({
                          name: `Week ${i + 1}`,
                          yield: value,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="yield" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Region-wise Distribution</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={selectedCrop.regions.map((region, i) => ({
                            name: region,
                            value: 100 / selectedCrop.regions.length,
                          }))}
                          dataKey="value"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          label
                        >
                          {selectedCrop.regions.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CropDetailsPage;
