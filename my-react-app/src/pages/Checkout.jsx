import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="checkout-message">
        <h2>No product selected</h2>
        <Link to="/">Go back to shopping</Link>
      </div>
    );
  }

  const total = product.price * quantity;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    const order = {
      id: `SHOP${Date.now().toString().slice(-8)}`,
      product,
      quantity,
      total,
      customer: form,
      status: "Demo order placed",
      date: new Date().toLocaleString("en-IN"),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("shopmeOrders") || "[]"
    );

    localStorage.setItem(
      "shopmeOrders",
      JSON.stringify([order, ...existingOrders])
    );

    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="shop-logo">
          ShopMe<span>.</span>
        </Link>
        <Link to="/" className="back-link">
          ← Continue shopping
        </Link>
      </header>

      <main className="checkout-layout">
        <section className="checkout-form-card">
          <p className="checkout-label">YOUR ORDER</p>
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Enter your delivery details to place a demo order.
          </p>

          <form onSubmit={handleSubmit}>
            <h2>Delivery information</h2>

            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              maxLength={100}
            />

            <label htmlFor="phone">Mobile number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              required
            />

            <label htmlFor="address">Full address</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House number, street, area"
              rows={3}
              maxLength={300}
              required
            />

            <div className="checkout-two-columns">
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <label htmlFor="pincode">PIN code</label>
            <input
              id="pincode"
              name="pincode"
              inputMode="numeric"
              value={form.pincode}
              onChange={handleChange}
              placeholder="6-digit PIN code"
              maxLength={6}
              required
            />

            {error && (
              <p className="checkout-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="place-order-btn">
              Place Demo Order · ₹{total.toLocaleString("en-IN")}
            </button>

            <p className="demo-notice">
              Demo only. No payment will be collected and no real delivery
              will be arranged.
            </p>
          </form>
        </section>

        <aside className="order-summary-card">
          <h2>Order summary</h2>

          <div className="summary-product">
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <div className="quantity-control">
            <span>Quantity</span>
            <div className="quantity-buttons">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= 10}
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">FREE</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          <p className="summary-demo-note">
            <span>ⓘ</span> This is a simulated order for demonstration.
          </p>
        </aside>
      </main>
    </div>
  );
}