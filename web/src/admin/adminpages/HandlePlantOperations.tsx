import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";

const HandlePlantOperations = () => {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [newPlant, setNewPlant] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      const snapshot = await getDocs(collection(db, "plants"));
      setPlants(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPlants();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  const handleAddPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlant.name || !newPlant.description) return;
    await addDoc(collection(db, "plants"), newPlant);
    setNewPlant({ name: "", description: "" });
    // refresh list
    const snapshot = await getDocs(collection(db, "plants"));
    setPlants(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {user && <p className="mb-4">Welcome {user.email}</p>}

      <button
        onClick={handleLogout}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>

      <h2 className="text-xl font-semibold mb-4">Add New Plant</h2>
      <form onSubmit={handleAddPlant} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Plant Name"
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
          className="border px-3 py-2 rounded-md w-full"
        />
        <textarea
          placeholder="Description"
          value={newPlant.description}
          onChange={(e) =>
            setNewPlant({ ...newPlant, description: e.target.value })
          }
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Plant
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Plants</h2>
      <ul className="space-y-3">
        {plants.map((plant) => (
          <li key={plant.id} className="border p-3 rounded-md">
            <strong>{plant.name}</strong> — {plant.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandlePlantOperations;
