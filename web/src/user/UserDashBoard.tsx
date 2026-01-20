import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PlantCard from "../components/PlantCard";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, LogOut } from "lucide-react";

const UserDashboard = () => {
  const [bookmarkedPlants, setBookmarkedPlants] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username || "");
        }
      } else {
        // Redirect to login if not authenticated
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        const bookmarkIds = userDoc.data()?.bookmarks || [];

        if (bookmarkIds.length > 0) {
          const plantPromises = bookmarkIds.map(async (id: string) => {
            const plantDoc = await getDoc(doc(db, "plants", id));
            if (plantDoc.exists()) {
              return { id: plantDoc.id, ...plantDoc.data() };
            }
            return null;
          });

          const plants = await Promise.all(plantPromises);
          setBookmarkedPlants(plants.filter((p) => p !== null));
        } else {
          setBookmarkedPlants([]);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure auth is ready or just called when component mounts 
    // but relies on auth.currentUser which might need a moment. 
    // Better to listen to auth state but for simplicity calling it here 
    // and relying on the check inside.
    const timer = setTimeout(() => {
      if (auth.currentUser) fetchBookmarks();
    }, 500);

    return () => clearTimeout(timer);
  }, []); // Could depend on auth.currentUser but that changes often on load

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f0ead8] p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#556b2f] mb-2 font-serif">
              My Garden
            </h1>
            <p className="text-[#556b2f]/80 text-lg">
              Welcome back, <span className="font-semibold">{username}</span>!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-white/50 hover:bg-white/80 text-[#556b2f] px-6 py-2.5 rounded-full transition-all shadow-sm border border-[#556b2f]/20 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-[#fdfbf7] rounded-3xl p-8 shadow-sm border border-[#556b2f]/5 min-h-[400px]">
          <h2 className="text-2xl font-semibold text-[#556b2f] mb-8 flex items-center gap-2">
            <Leaf className="fill-[#556b2f]" size={24} />
            Your Collection
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#556b2f]"></div>
            </div>
          ) : bookmarkedPlants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-[#556b2f]/10 rounded-full flex items-center justify-center mb-6">
                <Leaf size={48} className="text-[#556b2f]/40" />
              </div>
              <h3 className="text-xl font-medium text-[#556b2f] mb-2">
                Your garden is empty
              </h3>
              <p className="text-[#556b2f]/60 mb-8 max-w-md">
                Start building your personal collection of medicinal plants.
                Bookmark plants you want to learn more about!
              </p>
              <Link
                to="/explore"
                className="bg-[#556b2f] text-white px-8 py-3 rounded-full hover:bg-[#3e4e23] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
              >
                Explore Plants
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {bookmarkedPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
