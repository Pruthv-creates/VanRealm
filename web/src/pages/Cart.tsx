import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from "lucide-react";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-box">
          <div className="cart-empty-icon">
            <ShoppingBag size={64} className="cart-empty-icon-svg" />
          </div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">
            Looks like you haven't added any plants to your cart yet.
          </p>
          <Link to="/buy-plants" className="cart-empty-btn">
            <ShoppingBag size={20} />
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">
            <ShoppingBag size={36} />
            Shopping Cart
          </h1>
          <p className="cart-subtitle">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-inner">
                  <div className="cart-item-image">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"}
                      alt={item.commonName}
                      className="cart-item-img"
                    />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.commonName}</h3>
                    {item.botanicalName && (
                      <p className="cart-item-subtitle">{item.botanicalName}</p>
                    )}

                    <div className="cart-item-bottom">
                      <div className="cart-qty-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="cart-qty-btn"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="cart-qty-number">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="cart-qty-btn"
                        >
                          <Plus size={16} />
                        </button>
                        <span className="cart-qty-stock">
                          ({item.stock} available)
                        </span>
                      </div>

                      <div className="cart-price-remove">
                        <span className="cart-item-price">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cart-remove-btn"
                          title="Remove from cart"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="cart-clear-btn">
              <Trash2 size={16} />
              Clear entire cart
            </button>
          </div>

          <div className="cart-summary">
            <div className="cart-summary-box">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-details">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                </div>

                {shipping === 0 && (
                  <p className="cart-summary-free">
                    <Package size={12} />
                    Free shipping on orders over ₹500
                  </p>
                )}

                <div className="cart-summary-row">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="cart-checkout-btn">
                Proceed to Checkout
                <ArrowRight size={20} className="cart-checkout-arrow" />
              </Link>

              <Link to="/buy-plants" className="cart-continue-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
