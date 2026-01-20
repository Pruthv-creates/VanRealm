import React from "react";

const AdminPlantCard = ({ plant, onEdit, onDelete }) => {
  return (
    <div
      className="admin-plant-card"
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "180px",
          backgroundColor: "#e0e0e0",
        }}
      >
        {plant.media?.images?.[0] ? (
          <img
            src={plant.media.images[0]}
            alt={plant.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#d0d0d0",
              color: "#555",
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          padding: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{ fontSize: "1.1rem", marginBottom: "6px", color: "#2c3e50" }}
        >
          {plant.name}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#555", flex: 1 }}>
          {plant.description}
        </p>

        {/* Admin Controls */}
        <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => onEdit(plant)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(plant)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPlantCard;
