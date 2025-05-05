import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGavel, FaUser, FaHistory, FaHome, FaPlus } from "react-icons/fa";
import { getAuctions } from './utils/auctionUtils';
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

const useCountdown = (endTime: Date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
};

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
      endTime: new Date(Date.now() + 5 * 60 * 1000),
    },
    {
      id: 2,
      title: "Antique Vase",
      bid: "$500",
      time: "1h 15m",
      image: "pics/download (1).jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 15 * 60 * 1000),
    },
    {
      id: 3,
      title: "Gaming Laptop",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (2).jpeg",
      category: "Electronics",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 4,
      title: "Phone",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (3).jpeg",
      category: "Electronics",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 5,
      title: "CPU",
      bid: "$1200",
      time: "5h 10m",
      image: "pics/download (4).jpeg",
      category: "Electronics",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 6,
      title: "Water Bottle",
      bid: "$20",
      time: "5h 10m",
      image: "pics/download (5).jpeg",
      category: "Miscellaneous",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 7,
      title: "Harry Potter Books",
      bid: "$500",
      time: "5h 10m",
      image: "pics/download (6).jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 8,
      title: "Sneakers",
      bid: "$800",
      time: "5h 10m",
      image: "pics/download (7).jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 9,
      title: "Old Coins",
      bid: "$150",
      time: "5h 10m",
      image: "pics/download (8).jpeg",
      category: "Collectibles",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
  ];

  const [availableAuctions, setAvailableAuctions] = useState(auctions);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('user');
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    try {
      const userAuctions = getAuctions();
      const allAuctions = [...auctions, ...userAuctions].map(auction => ({
        ...auction,
        endTime: auction.endTime instanceof Date ? auction.endTime : new Date(auction.endTime)
      }));
      setAvailableAuctions(allAuctions);
    } catch (error) {
      console.error('Error loading auctions:', error);
      setAvailableAuctions(auctions);
    }
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

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    if (hours <= 0 && minutes <= 0 && seconds <= 0) return "Auction ended";
    return `${hours}h ${minutes}m ${seconds}s`;
  };

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
            filteredAuctions.map((auction) => {
              const timeLeft = useCountdown(auction.endTime || new Date());
              return (
                <div key={auction.id} className="auction-card">
                  <img src={auction.image} alt={auction.title} />
                  <h3>{auction.title}</h3>
                  <p>Highest Bid: {auction.bid}</p>
                  <p>Time Left: {formatTime(timeLeft.hours, timeLeft.minutes, timeLeft.seconds)}</p>
                  <button
                    className="place-bid"
                    onClick={() => handlePlaceBid(auction)}
                    disabled={timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0}
                  >
                    {timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0 
                      ? "Auction Ended" 
                      : "Place Bid"}
                  </button>
                </div>
              );
            })
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
