import React, { useState } from "react";
import { ShoppingBag, Package, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import BuyPlants from "./BuyPlants";
import Orders from "./Orders";
import Cart from "./Cart";
import "./Marketplace.css";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "orders" | "cart">("buy");
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <div className="marketplace-page">
      {/* Tabs Navigation */}
      <div className="marketplace-tabs-wrapper">
        <div className="marketplace-tabs-card">
          <button
            onClick={() => setActiveTab("buy")}
            className={`marketplace-tab-btn ${
              activeTab === "buy" ? "active" : ""
            }`}
          >
            <ShoppingBag size={20} />
            <span className="marketplace-tab-text">Buy Plants</span>
          </button>

          {/*<button
            onClick={() => setActiveTab("orders")}
            className={`marketplace-tab-btn ${
              activeTab === "orders" ? "active" : ""
            }`}
          >
            <Package size={20} />
            <span className="marketplace-tab-text">My Orders</span>
          </button>
 */}
          <button
            onClick={() => setActiveTab("cart")}
            className={`marketplace-tab-btn ${
              activeTab === "cart" ? "active" : ""
            } marketplace-cart-btn`}
          >
            <ShoppingCart size={20} />
            <span className="marketplace-tab-text">Cart</span>

            {cartCount > 0 && (
              <span className="marketplace-cart-badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "buy" && <BuyPlants />}
        {/* {activeTab === "orders" && <Orders />} */}
        {activeTab === "cart" && <Cart />}
      </div>
    </div>
  );
};

export default Marketplace;
