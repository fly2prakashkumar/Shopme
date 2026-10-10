import { Link, useLocation, Navigate } from "react-router-dom";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-page">
      <header className="checkout-header">
        <Link to="/" className="shop-logo">
          ShopMe<span>.</span>
        </Link>
        <Link to="/" className="back-link">
          Continue shopping
        </Link>
      </header>

      <main className="confirmation-card">
        <div className="success-icon">✓</div>

        <p className="confirmation-label">ORDER CONFIRMED</p>
        <h1>Thank you, {order.customer.name}!</h1>

        <p className="confirmation-description">
          Your demo order has been created successfully.
          No payment was collected and no real delivery was scheduled.
        </p>

        <div className="order-id-box">
          <span>Demo Order ID</span>
          <strong>{order.id}</strong>
          <span className="demo-status">{order.status}</span>
        </div>

        <div className="confirmation-product">
          <img src={order.product.image} alt={order.product.name} />

          <div className="confirmation-product-info">
            <h2>{order.product.name}</h2>
            <p>Quantity: {order.quantity}</p>
            <strong>
              ₹{order.total.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="confirmation-details">
          <h3>Delivery details</h3>
          <p>{order.customer.name}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          <p>
            {order.customer.city}, {order.customer.state} —{" "}
            {order.customer.pincode}
          </p>
        </div>

        <div className="confirmation-total">
          <span>Total amount</span>
          <strong>₹{order.total.toLocaleString("en-IN")}</strong>
        </div>

        <Link to="/" className="continue-shopping-btn">
          Continue Shopping →
        </Link>
      </main>
    </div>
  );
}