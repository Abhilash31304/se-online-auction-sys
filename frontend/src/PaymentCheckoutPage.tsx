import { useState } from "react";
import "./PaymentCheckoutPage.css";
import { useNavigate } from "react-router-dom";

export default function PaymentCheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [confirming, setConfirming] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, item: "Antique Vase", amount: "$200", status: "Completed" },
    { id: 2, item: "Gaming Laptop", amount: "$1200", status: "Completed" },
  ]);

  const navigate = useNavigate();

  const handlePayment = () => {
    setConfirming(true);
    
    setTimeout(() => {
      alert("Payment successful!");
      
      setTransactionHistory([
        ...transactionHistory,
        {
          id: transactionHistory.length + 1,
          item: "Vintage Watch",
          amount: "$501",
          status: "Completed",
        },
      ]);
      
      setConfirming(false);
  
      // Delay navigation by 5 seconds (5000 ms)
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 3000);
  
    }, 2000); // Simulate payment processing time
  };
  

  return (
    <div className="payment-container">
      <h2>Checkout</h2>

      <div className="auction-summary">
        <h3>Won Auction Summary</h3>
        <p>
          <strong>Item:</strong> Vintage Watch
        </p>
        <p>
          <strong>Final Bid Price:</strong> $501
        </p>
      </div>

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
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="stripe"
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
