import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGavel, FaUser, FaHistory, FaHome, FaPlus } from "react-icons/fa";
import apiService from './utils/api';
import "./Dashboard.css";

interface Auction {
  id: number;
  title: string;
  bid: string;
  time: string;
  image: string;
  category: string;
  endTime?: Date;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableAuctions, setAvailableAuctions] = useState<Auction[]>([]);
  const navigate = useNavigate();

  // Initial dummy data
  const initialAuctions: Auction[] = [
    {
      id: 1,
      title: "Vintage Watch",
      bid: "$200",
      time: "2h 30m",
      image: "pics/download.jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
    {
      id: 1,
      title: "Laptop",
      bid: "$800",
      time: "12h 30m",
      image: "pics/download (2).jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Set initial data first
    setAvailableAuctions(initialAuctions);
    
    // Then fetch from API
    const fetchAuctions = async () => {
      try {
        const response = await apiService.getAllAuctions();
        console.log('API Response:', response);
        
        if (response) {
          const apiAuctions = response.map((auction: any) => ({
            id: auction._id || Date.now(),
            title: auction.title || 'Untitled',
            bid: `$${auction.currentBid || 0}`,
            time: "2h 30m",
            image: auction.images?.[0]?.url || "pics/default.jpeg",
            category: auction.category || "Miscellaneous",
            endTime: new Date(auction.endTime || Date.now() + 24 * 60 * 60 * 1000)
          }));
          setAvailableAuctions([...initialAuctions, ...apiAuctions]);
        }
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setError('Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [navigate]);

  const filteredAuctions = availableAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || auction.category === category)
  );

  const handlePlaceBid = (auction: Auction) => {
    const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('user');
    
    if (isAuthenticated) {
      localStorage.setItem('selectedAuction', JSON.stringify(auction));
      navigate("/AuctionDetails");
    } else {
      navigate("/");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

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
            onClick={() => navigate("/user-dashboard")}
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
            onClick={() => navigate("/user-dashboard")}
          >
            <FaUser /> Profile
          </button>
        </nav>
        <button
          className="create-auction"
          onClick={() => navigate("/user-dashboard")}
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
                <img 
                  src={auction.image}
                  alt={auction.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "pics/default.jpeg";
                  }}
                />
                <h3>{auction.title}</h3>
                <p>Highest Bid: {auction.bid}</p>
                <p>Time Left: {auction.time}</p>
                <button
                  className="place-bid"
                  onClick={() => handlePlaceBid(auction)}
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
