import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Clock, LogOut, Package, ShoppingBag, Calendar } from "lucide-react";
import './UserDashBoard.css';

interface VisitHistoryItem {
  plantId: string;
  visitedAt: any;
  plantName: string;
  plantImage: string;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: any;
  items: any[];
}

const UserDashboard = () => {
  const [visitHistory, setVisitHistory] = useState<VisitHistoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'visits' | 'orders'>('visits');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username || "");
        }
      } else {
        navigate("/user-login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        const visits = userDoc.data()?.visitHistory || [];
        setVisitHistory(visits);

        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", uid),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Order));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (auth.currentUser) fetchHistory();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const groupVisitsByDate = (visits: VisitHistoryItem[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const groups: { [key: string]: VisitHistoryItem[] } = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      Older: []
    };

    visits.forEach(visit => {
      const visitDate = visit.visitedAt?.toDate ? visit.visitedAt.toDate() : new Date(visit.visitedAt);

      if (visitDate >= today) {
        groups.Today.push(visit);
      } else if (visitDate >= yesterday) {
        groups.Yesterday.push(visit);
      } else if (visitDate >= weekAgo) {
        groups['This Week'].push(visit);
      } else {
        groups.Older.push(visit);
      }
    });

    return groups;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'status-confirmed',
      'pending': 'status-pending',
      'payment_submitted': 'status-payment_submitted',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered'
    };
    return statusMap[status] || 'status-default';
  };

  const groupedVisits = groupVisitsByDate(visitHistory);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <p className="welcome-text">
              Welcome back, <span className="username">{username}</span>!
            </p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            onClick={() => setActiveTab('visits')}
            className={`tab-btn ${activeTab === 'visits' ? 'active' : 'inactive'}`}
          >
            <Clock size={20} />
            Recently Visited
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`tab-btn ${activeTab === 'orders' ? 'active' : 'inactive'}`}
          >
            <Package size={20} />
            Order History
          </button>
        </div>

        {/* Content Section */}
        <div className="content-card">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : activeTab === 'visits' ? (
            // Visited Plants Section
            visitHistory.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Clock size={48} />
                </div>
                <h3 className="empty-title">
                  No visit history yet
                </h3>
                <p className="empty-description">
                  Start exploring our collection of medicinal plants. Your recently viewed plants will appear here!
                </p>
                <Link to="/explore" className="cta-btn">
                  Explore Plants
                </Link>
              </div>
            ) : (
              <div className="visits-container">
                {Object.entries(groupedVisits).map(([period, visits]) =>
                  visits.length > 0 ? (
                    <div key={period} className="period-section">
                      <h3 className="period-title">
                        <Calendar size={20} />
                        {period}
                      </h3>
                      <div className="visits-grid">
                        {visits.map((visit, index) => (
                          <Link
                            key={`${visit.plantId}-${index}`}
                            to={`/plant/${visit.plantId}`}
                            className="visit-card"
                          >
                            <div className="visit-card-content">
                              <div className="plant-image">
                                {visit.plantImage ? (
                                  <img
                                    src={visit.plantImage}
                                    alt={visit.plantName}
                                  />
                                ) : (
                                  <div className="plant-image-placeholder">
                                    🌿
                                  </div>
                                )}
                              </div>
                              <div className="visit-info">
                                <h4 className="plant-name">
                                  {visit.plantName}
                                </h4>
                                <p className="visit-time">
                                  {formatTime(visit.visitedAt)}
                                </p>
                                <p className="visit-date">
                                  {formatDate(visit.visitedAt)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )
          ) : (
            // Orders Section
            orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Package size={48} />
                </div>
                <h3 className="empty-title">
                  No orders yet
                </h3>
                <p className="empty-description">
                  You haven't placed any orders. Start shopping to see your order history here!
                </p>
                <Link to="/buy-plants" className="cta-btn">
                  Browse Plants
                </Link>
              </div>
            ) : (
              <div>
                <div className="orders-header">
                  <h2 className="orders-title">
                    <Package size={24} />
                    Recent Orders
                  </h2>
                  <Link to="/orders" className="view-all-link">
                    View All Orders →
                  </Link>
                </div>
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-id-section">
                          <p className="order-label">Order ID</p>
                          <p className="order-id">
                            {order.id.slice(0, 12)}...
                          </p>
                        </div>
                        <div className="order-meta">
                          <div className="order-date-section">
                            <p className="order-label">Date</p>
                            <p className="order-date">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="order-footer">
                        <div className="order-items-count">
                          <ShoppingBag size={18} />
                          <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="order-total-section">
                          <p className="order-total-label">Total Amount</p>
                          <p className="order-total-amount">
                            ₹{order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
