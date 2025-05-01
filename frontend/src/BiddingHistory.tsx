import { useState, useEffect } from "react";
import "./BiddingHistory.css";

const BiddingHistory = () => {
  interface Bid {
    id: string;
    auction: string;
    amount: number;
    bidder: string;
    time: string;
    status: string;
  }
  
  const [bids, setBids] = useState<Bid[]>([]);

  const defaultBids = [
    {
      id: "default1",
      auction: "Sample Auction 1",
      amount: "$100",
      bidder: "Example User",
      time: new Date().toLocaleString(),
      status: "Active"
    },
    {
      id: "default2", 
      auction: "Sample Auction 2",
      amount: "$200",
      bidder: "Example User",
      time: new Date().toLocaleString(),
      status: "Active"
    }
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem('biddingHistory');
    // Combine default bids with any saved bids
    const savedBids = savedHistory ? JSON.parse(savedHistory) : [];
    setBids([...defaultBids, ...savedBids]);
  }, []);

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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td>{bid.auction}</td>
                    <td>{bid.amount}</td>
                    <td>{bid.bidder}</td>
                    <td>{bid.time}</td>
                    <td>{bid.status}</td>
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
