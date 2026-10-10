import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "Fashion",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    description:
      "A comfortable everyday T-shirt with a classic fit, perfect for casual outings and daily wear.",
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "Footwear",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description:
      "Sporty sneakers designed for everyday movement, casual styling, and comfortable walks.",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description:
      "A modern watch-inspired accessory that adds a smart, minimal look to your everyday style.",
  },
  {
    id: 4,
    name: "Leather Handbag",
    category: "Accessories",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    description:
      "A stylish handbag for carrying your daily essentials while complementing your outfit.",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description:
      "Modern headphones with a sleek design, suitable for music, entertainment, and everyday listening.",
  },
  {
    id: 6,
    name: "Sunglasses",
    category: "Accessories",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    description:
      "A versatile pair of sunglasses to complete your everyday look with a stylish finish.",
  },
  {
    id: 7,
    name: "Travel Backpack",
    category: "Bags",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    description:
      "A practical backpack for carrying your essentials during commutes, outings, and trips.",
  },
  {
    id: 8,
    name: "Classic Sneakers",
    category: "Footwear",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
    description:
      "Classic casual sneakers that pair easily with everyday outfits and relaxed styles.",
  },
  {
    id: 9,
    name: "Minimalist Lamp",
    category: "Home",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    description:
      "A minimalist lighting accessory that adds a simple, modern touch to your living space.",
  },
  {
    id: 10,
    name: "Perfume",
    category: "Lifestyle",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    description:
      "A fragrance accessory with an elegant presentation, suitable for everyday use or gifting.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  // Logout
  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  // Open product details
  const handleProductClick = (product) => {
    navigate("/product-details", {
      state: { product },
    });
  };

  // Buy directly from the product card
  const handleBuyNow = (event, product) => {
    event.stopPropagation();

    navigate("/checkout", {
      state: {
        product,
        quantity: 1,
      },
    });
  };

  // Allow opening cards with the keyboard
  const handleProductKeyDown = (event, product) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProductClick(product);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="shop-page">
      {/* Header */}
      <header className="shop-header">
        <Link to="/" className="shop-logo">
          ShopMe<span>.</span>
        </Link>

        <div className="header-search">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="shop-hero">
          <p className="hero-label">YOUR EVERYDAY STORE</p>

          <h1>
            Find your next
            <br />
            favorite thing.
          </h1>

          <p>
            Explore our collection of products picked just for you.
          </p>

          <a className="shop-cta" href="#products">
            Explore Products →
          </a>
        </section>

        {/* Products Section */}
        <section className="products-section" id="products">
          <div className="products-heading">
            <div>
              <p className="section-label">OUR COLLECTION</p>
              <h2>Featured Products</h2>
            </div>

            <span>{filteredProducts.length} products</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
                role="link"
                tabIndex={0}
                aria-label={`View details for ${product.name}`}
                onClick={() => handleProductClick(product)}
                onKeyDown={(event) =>
                  handleProductKeyDown(event, product)
                }
              >
                {/* Product Image */}
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                {filteredProducts.length === 0 && (
                  <div className="no-products">
                    <span>⌕</span>
                    <h3>No products found</h3>
                    <p>Try another product name or category.</p>
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                    >
                      View all products
                    </button>
                  </div>
                )}

                {/* Product Information */}
                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                      type="button"
                      className="buy-now-btn"
                      onClick={(event) =>
                        handleBuyNow(event, product)
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="shop-footer">
        © {new Date().getFullYear()} ShopMe. All rights reserved.
      </footer>
    </div>
  );
}