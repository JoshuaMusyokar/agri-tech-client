import React, { useState } from "react";
import tomatoes from "../../assets/imgs/products/tomatoes.jpg";
import eggs from "../../assets/imgs/products/eggs.jpg";
import honey from "../../assets/imgs/products/honey.jpg";
import spinach from "../../assets/imgs/products/spinach.jpg";
import coffee from "../../assets/imgs/products/coffee.jpg";
import beef from "../../assets/imgs/products/beef.jpg";

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Filter,
  Grid,
  List,
  Star,
  StarHalf,
  ListOrdered,
  ChevronDown,
  Menu,
  X,
  Package,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Organic Tomatoes",
    category: "Vegetables",
    price: 4.99,
    unit: "kg",
    rating: 4.5,
    reviews: 128,
    image: tomatoes,
    seller: "Green Farms Co.",
    available: true,
    description:
      "Fresh, organically grown tomatoes perfect for salads and cooking.",
    origin: "California, USA",
  },
  {
    id: 2,
    name: "Fresh Farm Eggs",
    category: "Dairy & Eggs",
    price: 6.99,
    unit: "dozen",
    rating: 5.0,
    reviews: 89,
    image: eggs,
    seller: "Happy Hens Farm",
    available: true,
    description: "Free-range eggs from ethically raised chickens.",
    origin: "Iowa, USA",
  },
  {
    id: 3,
    name: "Artisanal Honey",
    category: "Specialty",
    price: 12.99,
    unit: "500g",
    rating: 4.8,
    reviews: 56,
    image: honey,
    seller: "Bee Haven Apiaries",
    available: true,
    description: "Raw, unfiltered honey from local wildflower meadows.",
    origin: "Vermont, USA",
  },
  {
    id: 4,
    name: "Organic Baby Spinach",
    category: "Vegetables",
    price: 3.99,
    unit: "250g",
    rating: 4.3,
    reviews: 92,
    image: spinach,
    seller: "Fresh Greens Inc.",
    available: true,
    description: "Tender, young spinach leaves perfect for salads.",
    origin: "Oregon, USA",
  },
  {
    id: 5,
    name: "Premium Ground Coffee",
    category: "Beverages",
    price: 15.99,
    unit: "500g",
    rating: 4.9,
    reviews: 234,
    image: coffee,
    seller: "Mountain Coffee Roasters",
    available: true,
    description: "Single-origin Arabica coffee, medium roast.",
    origin: "Colombia",
  },
  {
    id: 6,
    name: "Grass-Fed Ground Beef",
    category: "Meat",
    price: 9.99,
    unit: "lb",
    rating: 4.7,
    reviews: 167,
    image: beef,
    seller: "Green Pastures Ranch",
    available: true,
    description: "100% grass-fed beef from sustainable farms.",
    origin: "Montana, USA",
  },
];

const categories = [
  "All Categories",
  "Vegetables",
  "Fruits",
  "Meat",
  "Dairy & Eggs",
  "Beverages",
  "Specialty",
  "Grains",
  "Herbs & Spices",
];

const Marketplace = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="text-warning"
          size={16}
          fill="#ffc107"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="text-warning"
          size={16}
          fill="#ffc107"
        />
      );
    }
    return stars;
  };
  interface Product {
    name: string;
    image: string;
    price: number;
    unit: string;
    reviews: number;
    seller: string;
    description: string;
    rating: number;
    available: boolean;
  }
  const ProductCard = ({ product }: { product: Product }) => (
    <div
      className={`col-12 ${
        viewMode === "grid" ? "col-md-6 col-lg-4" : ""
      } mb-4`}
    >
      <div
        className={`card h-100 shadow-sm hover-shadow transition-all ${
          product.available ? "" : "bg-light"
        }`}
      >
        <div className="position-relative">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <button
            className="btn btn-light btn-sm position-absolute top-0 end-0 m-2"
            onClick={() => setCartCount((prev) => prev + 1)}
            title="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
          <button
            className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 me-5"
            title="Add to favorites"
          >
            <Heart size={16} />
          </button>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{product.name}</h5>
            <span className="badge bg-success">
              ${product.price}/{product.unit}
            </span>
          </div>
          <p className="text-muted small mb-2">{product.seller}</p>
          <div className="mb-2 d-flex align-items-center">
            {renderStars(product.rating)}
            <span className="ms-2 text-muted small">({product.reviews})</span>
          </div>
          <p className="card-text small text-muted">{product.description}</p>
          <div className="mt-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => setCartCount((prev) => prev + 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Package className="text-primary me-2" />
            <span className="fw-bold">FarmMarket</span>
          </a>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link text-dark d-lg-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              title="Toggle mobile menu"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${
              showMobileMenu ? "show" : ""
            }`}
          >
            <div className="mx-lg-auto w-100 max-w-xl px-lg-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary">
                  <Search size={20} />
                </button>
              </div>
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link position-relative" href="#">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Heart size={20} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <User size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        {/* Features */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 bg-primary bg-opacity-10 h-100">
              <div className="card-body text-center">
                <Truck size={32} className="text-primary mb-3" />
                <h6 className="mb-2">Free Shipping</h6>
                <p className="small text-muted">On orders over $50</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-success bg-opacity-10 h-100">
              <div className="card-body text-center">
                <ShieldCheck size={32} className="text-success mb-3" />
                <h6 className="mb-2">Quality Guarantee</h6>
                <p className="small text-muted">100% satisfaction</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-warning bg-opacity-10 h-100">
              <div className="card-body text-center">
                <Clock size={32} className="text-warning mb-3" />
                <h6 className="mb-2">Quick Delivery</h6>
                <p className="small text-muted">Delivering within 2-5 days</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 bg-info bg-opacity-10 h-100">
              <div className="card-body text-center">
                <ListOrdered size={32} className="text-info mb-3" />
                <h6 className="mb-2">Order tracking</h6>
                <p className="small text-muted">Effective order tracking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="d-flex justify-content-between mb-3">
          <h5>Products</h5>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowFilters(!showFilters)}
            title="Toggle filters"
          >
            <Filter size={20} />
          </button>
        </div>
        {showFilters && (
          <div className="mb-4">
            <h6>Categories</h6>
            <div className="btn-group mb-3" role="group">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`btn ${
                    selectedCategory === category ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={`row ${viewMode === "grid" ? "" : "row-cols-1"}`}>
          {products
            .filter(
              (product) =>
                selectedCategory === "All Categories" ||
                product.category === selectedCategory
            )
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {/* View Mode Toggle */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className={`btn btn-outline-secondary me-2 ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={20} />
          </button>
          <button
            className={`btn btn-outline-secondary ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center py-3">
        <div className="container">
          <p className="text-muted mb-0">
            © 2024 FarmMarket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
