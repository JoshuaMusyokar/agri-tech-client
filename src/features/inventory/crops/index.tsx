import React, { useState } from "react";
import { format } from "date-fns";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Crop {
  id: number;
  name: string;
  quantity: number;
  planted: string;
  harvested: string;
}

const CropInventoryDashboard: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: "Tomatoes",
      quantity: 100,
      planted: "2023-05-01",
      harvested: "2023-07-15",
    },
    {
      id: 2,
      name: "Corn",
      quantity: 80,
      planted: "2023-04-15",
      harvested: "2023-08-01",
    },
    {
      id: 3,
      name: "Lettuce",
      quantity: 50,
      planted: "2023-03-20",
      harvested: "2023-05-01",
    },
    {
      id: 4,
      name: "Carrots",
      quantity: 120,
      planted: "2023-04-01",
      harvested: "2023-06-30",
    },
  ]);

  const [newCrop, setNewCrop] = useState<Crop>({
    id: 0,
    name: "",
    quantity: 0,
    planted: "",
    harvested: "",
  });

  const handleAddCrop = () => {
    const newId =
      crops.length > 0 ? Math.max(...crops.map((c) => c.id)) + 1 : 1;
    setCrops([...crops, { ...newCrop, id: newId }]);
    setNewCrop({ id: 0, name: "", quantity: 0, planted: "", harvested: "" });
  };

  const handleRemoveCrop = (id: number) => {
    setCrops(crops.filter((c) => c.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Crop
  ) => {
    setNewCrop({ ...newCrop, [field]: e.target.value });
  };

  // Calculate summary statistics
  const totalQuantity = crops.reduce((sum, crop) => sum + crop.quantity, 0);
  const averageQuantity = totalQuantity / crops.length;
  const maxQuantity = Math.max(...crops.map((crop) => crop.quantity));
  const minQuantity = Math.min(...crops.map((crop) => crop.quantity));

  // Prepare data for the line chart
  const chartData = crops.map((crop) => ({
    name: crop.name,
    quantity: crop.quantity,
  }));

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="card mb-4">
            <div className="card-header">Crop Inventory</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th className="text-end">Quantity</th>
                    <th>Planted</th>
                    <th>Harvested</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop.id}>
                      <td>{crop.name}</td>
                      <td className="text-end">{crop.quantity}</td>
                      <td>{format(new Date(crop.planted), "MMM d, yyyy")}</td>
                      <td>{format(new Date(crop.harvested), "MMM d, yyyy")}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveCrop(crop.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <TrashIcon className="me-2" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card mb-4">
            <div className="card-header">Add New Crop</div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Crop Name"
                  value={newCrop.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newCrop.quantity.toString()}
                  onChange={(e) => handleInputChange(e, "quantity")}
                  className="form-control"
                />
              </div>
              <button onClick={handleAddCrop} className="btn btn-primary">
                <PlusIcon className="me-2" />
                Add
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Summary</div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Total Quantity:</strong>{" "}
                {totalQuantity.toLocaleString()}
              </div>
              <div className="mb-3">
                <strong>Average Quantity:</strong> {averageQuantity.toFixed(2)}
              </div>
              <div className="mb-3">
                <strong>Max Quantity:</strong> {maxQuantity.toLocaleString()}
              </div>
              <div className="mb-3">
                <strong>Min Quantity:</strong> {minQuantity.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">Crop Quantities</div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInventoryDashboard;
