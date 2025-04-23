import { useState } from "react";
import { Link } from "react-router-dom";
import "./BiddingHistory.css";

const BiddingHistory = () => {
  const bids = [
    {
      id: 1,
      auction: "Vintage Watch",
      amount: "$120",
      bidder: "Alice",
      time: "2025-03-20 14:32",
    },
    {
      id: 2,
      auction: "Gaming Laptop",
      amount: "$950",
      bidder: "Bob",
      time: "2025-03-19 16:45",
    },
    {
      id: 3,
      auction: "Art Piece",
      amount: "$450",
      bidder: "Charlie",
      time: "2025-03-18 11:20",
    },
  ];

  return (
    <div className="bidding-history-wrapper">
      <div className="bidding-history-container">
        <h2 className="bidding-history-title">Bidding History</h2>
        <div className="bidding-history-card">
          <div className="overflow-x-auto">
            <table className="bidding-history-table">
              <thead>
                <tr>
                  <th>Auction Item</th>
                  <th>Bid Amount</th>
                  <th>Bidder</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td>{bid.auction}</td>
                    <td>{bid.amount}</td>
                    <td>{bid.bidder}</td>
                    <td>{bid.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingHistory;
