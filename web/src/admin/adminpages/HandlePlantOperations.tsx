import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./HandlePlantOperations.css";

import AdminPlantCard from "./AdminPlantCard";

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
    <div className="plant-ops-container">
      {/* Existing Plants */}
      <div className="plants-grid">
        {plants.map((plant) => (
          <AdminPlantCard
            key={plant.id}
            plant={plant}
            onEdit={(p) => console.log("Edit", p)}
            onDelete={(p) => console.log("Delete", p)}
          />
        ))}
      </div>
    </div>
  );
};

export default HandlePlantOperations;
