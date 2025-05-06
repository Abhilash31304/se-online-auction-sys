import { useState, useEffect } from "react";
import "./PaymentCheckoutPage.css";
import { useNavigate } from "react-router-dom";

export default function PaymentCheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [confirming, setConfirming] = useState(false);
  const [winningBid, setWinningBid] = useState<{
    item: string;
    finalPrice: number;
    image: string;
    category: string;
  } | null>(null);
  const [transactionHistory] = useState([
    { id: 1, item: "Antique Vase", amount: "$200", status: "Completed" },
    { id: 2, item: "Gaming Laptop", amount: "$1200", status: "Completed" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedBid = localStorage.getItem('winningBid');
    if (savedBid) {
      setWinningBid(JSON.parse(savedBid));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handlePayment = () => {
    if (!winningBid) return;
    setConfirming(true);
    
    setTimeout(() => {
      alert("Payment successful!");
      
      // Store completed payment in localStorage
      const completedAuction = {
        id: Date.now(),
        title: winningBid.item,
        bid: `$${winningBid.finalPrice}`,
        image: winningBid.image,
        category: winningBid.category,
        status: "Completed"
      };

      // Add to bidding history
      const bidHistoryEntry = {
        id: Date.now(),
        auction: winningBid.item,
        amount: `$${winningBid.finalPrice}`,
        bidder: "You",
        time: new Date().toLocaleString(),
        status: "Won"
      };

      // Get existing bid history or initialize
      const existingHistory = localStorage.getItem('biddingHistory') || '[]';
      const biddingHistory = JSON.parse(existingHistory);
      biddingHistory.push(bidHistoryEntry);
      localStorage.setItem('biddingHistory', JSON.stringify(biddingHistory));

      // Store completed auction
      const existingCompleted = localStorage.getItem('completedAuctions');
      const completedAuctions = existingCompleted ? JSON.parse(existingCompleted) : [];
      completedAuctions.push(completedAuction);
      localStorage.setItem('completedAuctions', JSON.stringify(completedAuctions));

      localStorage.removeItem('winningBid');
      setConfirming(false);
      
      setTimeout(() => {
        navigate("/bidding-history");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Checkout</h2>

      {winningBid && (
        <div className="auction-summary">
          <h3>Won Auction Summary</h3>
          <p>
            <strong>Item:</strong> {winningBid.item}
          </p>
          <p>
            <strong>Category:</strong> {winningBid.category}
          </p>
          <p>
            <strong>Final Bid Price:</strong> ${winningBid.finalPrice}
          </p>
          <img 
            src={winningBid.image} 
            alt={winningBid.item} 
            style={{ maxWidth: '200px', marginTop: '10px' }} 
          />
        </div>
      )}

      <div className="payment-methods">
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="credit-card"
            checked={paymentMethod === "credit-card"}
            onChange={() => setPaymentMethod("credit-card")}
          />
          Credit/Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="PhonePe"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Paytm"
            checked={paymentMethod === "stripe"}
            onChange={() => setPaymentMethod("stripe")}
          />
          Stripe
        </label>
      </div>

      <button
        className="pay-button"
        onClick={handlePayment}
        disabled={confirming}
      >
        {confirming ? "Processing..." : "Confirm & Pay"}
      </button>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul>
          {transactionHistory.map((transaction) => (
            <li key={transaction.id}>
              {transaction.item} - {transaction.amount} ({transaction.status})
            </li>
          ))}
        </ul>
      </div>

      <p className="security-msg">
        🔒 Secure transaction with end-to-end encryption
      </p>
    </div>
  );
}
