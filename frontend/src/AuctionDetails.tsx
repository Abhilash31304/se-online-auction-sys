import React, { useState, useEffect } from "react";
import "./AuctionDetails.css";
import "./PaymentCheckoutPage.tsx";
import { useNavigate } from "react-router-dom";

export default function AuctionDetails() {
  interface AuctionDetailsType {
    image: string;
    title: string;
    category: string;
    bid: string;
  }

  const [auctionDetails, setAuctionDetails] = useState<AuctionDetailsType | null>(null);
  const [highestBid, setHighestBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState<{ id: number; amount: number; bidder: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected auction details from localStorage
    const selectedAuction = localStorage.getItem('selectedAuction');
    if (selectedAuction) {
      const auction = JSON.parse(selectedAuction);
      setAuctionDetails(auction);
      setHighestBid(parseInt(auction.bid.replace('$', '')));
      setBidHistory([
        { id: 1, amount: parseInt(auction.bid.replace('$', '')), bidder: "Initial Bid" }
      ]);
    } else {
      navigate('/dashboard');
    }
  }, []);

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
        // Store winning bid details before navigating
        const winningBid = {
          item: auctionDetails?.title,
          finalPrice: highestBid,
          image: auctionDetails?.image,
          category: auctionDetails?.category
        };
        localStorage.setItem('winningBid', JSON.stringify(winningBid));
        navigate("/payment");
      } else {
        navigate("/");
      }
    }
  }, [timeLeft, navigate, auctionDetails, highestBid]);

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
      {auctionDetails && (
        <>
          <div className="product-image">
            <img src={auctionDetails.image} alt={auctionDetails.title} />
          </div>
          <div className="product-info">
            <h2>{auctionDetails.title}</h2>
            <p>A beautiful {auctionDetails.category} item.</p>

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
        </>
      )}
    </div>
  );
}
