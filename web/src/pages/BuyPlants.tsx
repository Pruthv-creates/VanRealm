import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Loader,
  Filter,
  ShoppingCart,
  Check
} from "lucide-react";
import { useCart } from "../context/CartContext";
import "./BuyPlants.css";

interface Plant {
  id: string;
  commonName: string;
  botanicalName?: string;
  description?: string;
  price?: number;
  stock?: number;
  isForSale?: boolean;
  imageUrl?: string;
  categoryTag?: string;
  media?: {
    images?: string[];
  };
}

const SAMPLE_PLANTS: Plant[] = [
  {
    id: "sample-1",
    commonName: "Ashwagandha",
    botanicalName: "Withania somnifera",
    description:
      "Known as Indian Ginseng, Ashwagandha is a powerful adaptogenic herb used in Ayurveda for stress relief, improving energy, and boosting immunity. The roots are primarily used for medicinal purposes.",
    price: 299,
    stock: 25,
    isForSale: true,
    imageUrl: "/assets/images/ashwagandha1.jpg",
    categoryTag: "Adaptogen"
  },
  {
    id: "sample-2",
    commonName: "Brahmi",
    botanicalName: "Bacopa monnieri",
    description:
      "A renowned brain tonic in Ayurveda, Brahmi enhances memory, concentration, and cognitive function. It's also known for its calming properties and is used to reduce anxiety and stress.",
    price: 199,
    stock: 18,
    isForSale: true,
    imageUrl: "/assets/images/brahmi1.jpg",
    categoryTag: "Brain Health"
  },
  {
    id: "sample-3",
    commonName: "Neem",
    botanicalName: "Azadirachta indica",
    description:
      "The 'village pharmacy' of India, Neem has powerful antibacterial, antifungal, and blood-purifying properties. Every part of the plant is used for various medicinal purposes.",
    price: 249,
    stock: 30,
    isForSale: true,
    imageUrl: "/assets/images/neem1.jpg",
    categoryTag: "Antibacterial"
  },
  {
    id: "sample-4",
    commonName: "Turmeric",
    botanicalName: "Curcuma longa",
    description:
      "A golden spice with powerful anti-inflammatory and antioxidant properties. Turmeric is widely used in Ayurveda for joint health, digestion, and skin care. The rhizome is the medicinal part.",
    price: 149,
    stock: 0,
    isForSale: true,
    imageUrl: "/assets/images/turmeric1.jpg",
    categoryTag: "Anti-inflammatory"
  },
  {
    id: "sample-5",
    commonName: "Amla (Indian Gooseberry)",
    botanicalName: "Phyllanthus emblica",
    description:
      "Rich in Vitamin C and antioxidants, Amla is one of the most important rejuvenating herbs in Ayurveda. It supports immunity, digestion, hair health, and overall vitality.",
    price: 179,
    stock: 22,
    isForSale: true,
    imageUrl: "/assets/images/amla1.jpg",
    categoryTag: "Immunity"
  },
  {
    id: "sample-6",
    commonName: "Tulsi (Holy Basil)",
    botanicalName: "Ocimum sanctum",
    description:
      "Sacred in Hindu tradition, Tulsi is a powerful adaptogen that supports respiratory health, reduces stress, and boosts immunity. It's known as the 'Queen of Herbs' in Ayurveda.",
    price: 129,
    stock: 35,
    isForSale: true,
    imageUrl: "/assets/images/tulsi1.jpg",
    categoryTag: "Sacred"
  },
  {
    id: "sample-7",
    commonName: "Aloe Vera",
    botanicalName: "Aloe barbadensis miller",
    description:
      "A succulent plant with cooling and healing properties. Aloe Vera is used for skin care, digestive health, and wound healing. The gel from its leaves has numerous medicinal applications.",
    price: 99,
    stock: 40,
    isForSale: true,
    imageUrl: "/assets/images/aloe1.jpg",
    categoryTag: "Skin Care"
  },
  {
    id: "sample-8",
    commonName: "Ginger",
    botanicalName: "Zingiber officinale",
    description:
      "A warming herb excellent for digestion, nausea relief, and inflammation. Ginger is widely used in both culinary and medicinal applications across various traditional medicine systems.",
    price: 89,
    stock: 28,
    isForSale: true,
    imageUrl: "/assets/images/ginger1.jpg",
    categoryTag: "Digestive"
  }
];

const BuyPlants = () => {
  const [plants, setPlants] = useState<Plant[]>(SAMPLE_PLANTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filteredPlants = plants.filter((plant) =>
    plant.commonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="buyplants-page">
      <div className="buyplants-search">
        <div className="buyplants-search-card">
          <div className="buyplants-search-input-wrapper">
            <Search className="buyplants-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="buyplants-search-input"
            />
          </div>
          <button className="buyplants-filter-btn">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="buyplants-grid-wrapper">
        {loading ? (
          <div className="buyplants-loading">
            <Loader className="buyplants-loader" size={48} />
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="buyplants-empty">
            <ShoppingBag size={64} className="buyplants-empty-icon" />
            <h2>No plants found</h2>
            <p>Currently there are no plants listed for sale matching your criteria.</p>
            <Link to="/add-plant" className="buyplants-empty-link">
              Have something to sell? Contribute now.
            </Link>
          </div>
        ) : (
          <div className="buyplants-grid">
            {filteredPlants.map((plant) => (
              <div key={plant.id} className="buyplants-card">
                <div className="buyplants-card-image">
                  <div className="buyplants-card-overlay" />
                  <img
                    src={
                      plant.imageUrl ||
                      plant.media?.images?.[0] ||
                      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={plant.commonName}
                    className="buyplants-card-img"
                  />
                  {(plant.stock || 0) <= 5 && (plant.stock || 0) > 0 && (
                    <div className="buyplants-stock-badge low">Low Stock</div>
                  )}
                  {(plant.stock || 0) === 0 && (
                    <div className="buyplants-stock-badge out">Out of Stock</div>
                  )}
                </div>

                <div className="buyplants-card-content">
                  <h3 className="buyplants-card-title">{plant.commonName}</h3>
                  <p className="buyplants-card-subtitle">{plant.botanicalName}</p>
                  <p className="buyplants-card-desc">{plant.description}</p>

                  <div className="buyplants-card-footer">
                    <div className="buyplants-price">
                      <span className="buyplants-price-label">Price</span>
                      <span className="buyplants-price-value">₹{plant.price}</span>
                    </div>

                    <button
                      onClick={() => {
                        if ((plant.stock || 0) > 0) {
                          addToCart({
                            id: plant.id,
                            commonName: plant.commonName,
                            botanicalName: plant.botanicalName,
                            price: plant.price || 0,
                            stock: plant.stock || 0,
                            imageUrl: plant.imageUrl || plant.media?.images?.[0]
                          });
                          setAddedToCart(plant.id);
                          setTimeout(() => setAddedToCart(null), 2000);
                        }
                      }}
                      className={`buyplants-add-btn ${addedToCart === plant.id ? "added" : ""} ${((plant.stock || 0) === 0 ? "disabled" : "")}`}
                      disabled={(plant.stock || 0) === 0}
                    >
                      {addedToCart === plant.id ? (
                        <>
                          <Check size={20} />
                          <span className="buyplants-add-text">Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          <span className="buyplants-add-text">Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPlants;
