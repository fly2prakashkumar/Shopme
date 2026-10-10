import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>
          Back to Shop
        </button>
      </div>
    );
  }

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        quantity,
      },
    });
  };

  return (
    <div className="details-page">
      <header className="details-header">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Shop
        </button>

        <span className="details-logo">
          ShopMe<span>.</span>
        </span>
      </header>

      <main className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <span>★★★★★</span>
            <small>Demo product rating</small>
          </div>

          <p className="details-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="details-description">
            Discover the perfect combination of style,
            quality, and everyday comfort. This
            {` ${product.name.toLowerCase()} `}
            is a great addition to your collection.
            Explore ShopMe for more everyday essentials.
          </p>

          <div className="details-availability">
            <span className="availability-dot"></span>
            Available in demo store
          </div>

          <div className="quantity-section">
            <label htmlFor="quantity">Quantity</label>

            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= 10}
                onClick={() =>
                  setQuantity((q) => Math.min(10, q + 1))
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="details-total">
            <span>Total</span>
            <strong>
              ₹{(product.price * quantity).toLocaleString("en-IN")}
            </strong>
          </div>

          <button
            type="button"
            className="details-buy-button"
            onClick={buyNow}
          >
            Buy Now <span>→</span>
          </button>

          <p className="demo-notice">
            Demo store only. No real payment or delivery.
          </p>
        </div>
      </main>
    </div>
  );
}