import React, { useState, useEffect } from "react";
import "./UserDashboard.css";

interface WonAuction {
  id: number;
  title: string;
  bid: string;
  image: string;
  category: string;
}

export default function UserDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    image: "",
    status: "Pending",
  });
  const [sellingItems, setSellingItems] = useState([
    { id: 4, title: "Smartphone", price: "$400", status: "Pending" },
    { id: 5, title: "Old Coins", price: "$150", status: "Active" },
  ]);

  const myBids = [
    { id: 1, title: "Vintage Watch", bid: "$501", status: "Active" },
    { id: 2, title: "Gaming Laptop", bid: "$1200", status: "Completed" },
  ];

  const [wonAuctions, setWonAuctions] = useState<WonAuction[]>([]);

  // Load won auctions from localStorage on mount and when updated
  useEffect(() => {
    // Get existing won auctions
    const savedWonAuctions = localStorage.getItem('wonAuctions');
    const initialWonAuctions = savedWonAuctions ? JSON.parse(savedWonAuctions) : [];
    
    // Check for newly completed auctions
    const completedAuctions = localStorage.getItem('completedAuctions');
    if (completedAuctions) {
      const completed = JSON.parse(completedAuctions);
      const updatedWonAuctions = [...initialWonAuctions, ...completed];
      setWonAuctions(updatedWonAuctions);
      
      // Save updated won auctions and clear completed
      localStorage.setItem('wonAuctions', JSON.stringify(updatedWonAuctions));
      localStorage.removeItem('completedAuctions');
    } else {
      setWonAuctions(initialWonAuctions);
    }
  }, []);

  // Update localStorage whenever won auctions change
  useEffect(() => {
    localStorage.setItem('wonAuctions', JSON.stringify(wonAuctions));
  }, [wonAuctions]);

  const formatPrice = (value: string) => {
    if (!value.startsWith("$")) {
      return `$${value.replace(/[^0-9.]/g, "")}`;
    }
    return value;
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSellingItems([
      ...sellingItems,
      {
        ...newItem,
        id: sellingItems.length + 1,
        price: formatPrice(newItem.price),
      },
    ]); // Ensure price is formatted
    setShowForm(false);
    setNewItem({ title: "", price: "", image: "", status: "Pending" }); // Reset form fields
  };

  return (
    <div className="dashboard-container">
      {/* Profile Section */}
      <div className="profile-section">
        <img src="pics/IMG_20220928_234425_624.jpg" alt="User" className="profile-pic" />
        <h2>Abhilash</h2>
        <p>se22uari083@mahindrauniversity.edu.in</p>
      </div>

      {/* Dashboard Sections */}
      <div className="dashboard-sections">
        {/* My Bids Section */}
        <div className="dashboard-card">
          <h3>My Bids</h3>
          {myBids.map((item) => (
            <div
              key={item.id}
              className={`auction-item ${item.status.toLowerCase()}`}
            >
              <span>{item.title}</span>
              <span>{item.bid}</span>
              <span className="status">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Updated Won Auctions Section */}
        <div className="dashboard-card">
          <h3>Won Auctions</h3>
          {wonAuctions.map((item) => (
            <div key={item.id} className="auction-item">
              <span>{item.title}</span>
              <span>{item.bid}</span>
              <span className="status">{item.category}</span>
            </div>
          ))}
        </div>

        {/* Selling Items Section (Now Dynamic) */}
        <div className="dashboard-card">
          <h3>Selling Items</h3>
          {sellingItems.map((item) => (
            <div
              key={item.id}
              className={`auction-item ${item.status.toLowerCase()}`}
            >
              <span>{item.title}</span>
              <span>{item.price}</span>
              <span className="status">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* List New Item Button */}
      <button className="list-item-btn" onClick={() => setShowForm(true)}>
        List New Item
      </button>

      {/* New Item Form (Modal) */}
      {showForm && (
        <div className="modal">
          <form onSubmit={handleFormSubmit} className="new-item-form">
            <h3>List a New Item</h3>
            <input
              type="text"
              placeholder="Item Title"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: formatPrice(e.target.value) })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.value })
              }
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
