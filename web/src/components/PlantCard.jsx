import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
    return (
        <div className="plant-card" style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-soft)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#e0e0e0' }}>
                {plant.media?.images?.[0] ? (
                    <img
                        src={plant.media.images[0]}
                        alt={plant.commonName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d0d0d0' }}>
                        No Image
                    </div>
                )}
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--color-text-dark)' }}>{plant.commonName}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', fontStyle: 'italic', marginBottom: '12px' }}>
                    {plant.botanicalName}
                </p>

                <div style={{ marginTop: 'auto' }}>
                    {plant.categoryTag && (
                        <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-primary)',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}>
                            {plant.categoryTag}
                        </span>
                    )}

                    <Link to={`/plant/${plant.id}`} className="btn-outline" style={{
                        marginTop: '15px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        padding: '8px'
                    }}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;
