import React, { useState, useEffect } from "react";
import "./AuctionDetails.css";
import "./PaymentCheckoutPage.tsx";
import { useNavigate } from "react-router-dom";

export default function AuctionDetails() {
  const [highestBid, setHighestBid] = useState(500);
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState([
    { id: 1, amount: 500, bidder: "Alice" },
    { id: 2, amount: 450, bidder: "Bob" },
  ]);
  const [timeLeft, setTimeLeft] = useState(3); // 5 minutes
  const navigate = useNavigate();

  // Add authentication check when component mounts
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('user');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('user');
      if (isAuthenticated) {
        navigate("/payment");
      } else {
        navigate("/");
      }
    }
  }, [timeLeft, navigate]);

  // Function to handle bidding
  const handleBid = () => {
    const bidValue = parseInt(bidAmount);
    if (bidValue > highestBid) {
      setHighestBid(bidValue);
      setBidHistory([
        { id: bidHistory.length + 1, amount: bidValue, bidder: "You" },
        ...bidHistory,
      ]);
      setBidAmount("");
    } else {
      alert("Your bid must be higher than the current highest bid!");
    }
  };

  return (
    <div className="auction-container">
      <div className="product-image">
        <img src="pics/download.jpeg" alt="Auction Item" />
      </div>
      <div className="product-info">
        <h2>Vintage Watch</h2>
        <p>A beautiful, antique vintage watch from the 1960s.</p>

        <div className="auction-details">
          <p>
            <strong>Current Highest Bid:</strong> ${highestBid}
          </p>
          <p>
            <strong>Time Left:</strong> {Math.floor(timeLeft / 60)}m{" "}
            {timeLeft % 60}s
          </p>
        </div>

        <div className="bid-section">
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={handleBid}>Bid Now</button>
        </div>

        <div className="bid-history">
          <h3>Bid History</h3>
          <ul>
            {bidHistory.map((bid) => (
              <li key={bid.id}>
                {bid.bidder} bid ${bid.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
