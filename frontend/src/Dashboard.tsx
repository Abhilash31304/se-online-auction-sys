import { useState } from "react";
import { FaGavel, FaUser, FaHistory, FaHome, FaPlus } from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const auctions = [
    {
      id: 1,
      title: "Vintage Watch",
      bid: "$200",
      time: "2h 30m",
      image: "pics/download.jpeg",
      category: "Collectibles",
    },
    {
      id: 2,
      title: "Antique Vase",
      bid: "$500",
      time: "1h 15m",
      image: "pics/download (1).jpeg",
      category: "Collectibles",
    },
    {
      id: 3,
      title: "Gaming Laptop",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (2).jpeg",
      category: "Electronics",
    },
    {
      id: 4,
      title: "Phone",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (3).jpeg",
      category: "Electronics",
    },
    {
      id: 5,
      title: "CPU",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (4).jpeg",
      category: "Electronics",
    },
    {
      id: 6,
      title: "Water Bottle",
      bid: "$20",
      time: "5h 10m",
      image: "pics/download (5).jpeg",
      category: "Miscellaneous",
    },
  ];

  const filteredAuctions = auctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || auction.category === category)
  );

  return (
    <div className="dashboard-container">
      <header className="top-nav">
        <img src="/pics/logo.png" alt="logo" id="main-logo" />

        <nav>
          <button className="nav-clicks" onClick={() => navigate("/Dashboard")}>
            <FaHome /> Home
          </button>
          <button
            className="nav-clicks"
            onClick={() => navigate("/UserDashboard")}
          >
            <FaGavel /> My Auctions
          </button>
          <button
            className="nav-clicks"
            onClick={() => navigate("/bidding-history")}
          >
            <FaHistory /> Bidding History
          </button>
          <button
            className="nav-clicks"
            onClick={() => navigate("/UserDashboard")}
          >
            <FaUser /> Profile
          </button>
        </nav>
        <button
          className="create-auction"
          onClick={() => navigate("/UserDashboard")}
        >
          <FaPlus /> Create Auction
        </button>
      </header>


      <main className="main-content">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search auctions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Collectibles</option>
            <option>Furniture</option>
            <option>Miscellaneous</option>
          </select>
        </div>

        <div className="auction-list-horizontal">
          {filteredAuctions.length > 0 ? (
            filteredAuctions.map((auction) => (
              <div key={auction.id} className="auction-card">
                <img src={auction.image} alt={auction.title} />
                <h3>{auction.title}</h3>
                <p>Highest Bid: {auction.bid}</p>
                <p>Time Left: {auction.time}</p>
                <button
                  className="place-bid"
                  onClick={() => navigate("/AuctionDetails")}
                >
                  Place Bid
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign: "center", width: "100%" }}>
              No auctions found.
            </p>
          )}
        </div>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Bid Box. All rights reserved.</p>
        <p>
          Contact us: <a href="mailto:support@bidbox.com">support@bidbox.com</a>
        </p>
      </footer>
    </div>
  );
}
