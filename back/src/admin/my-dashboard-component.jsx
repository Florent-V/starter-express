// customDashboard.jsx
import { ApiClient } from 'adminjs';
import React, { useEffect, useState } from 'react';

const CustomDashboard = () => {
  const [stats, setStats] = useState(null);
  const api = new ApiClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getDashboard();
        setStats(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue dans l'interface d'administration</h1>
      <div style={styles.statsContainer}>
        {stats.map((item, index) => (
          <div style={styles.statBox} key={index}>
            <h2 style={styles.statTitle}>{capitalize(item.entity)}</h2>
            <p style={styles.statValue}>{item.quantity}</p>
            <a style={styles.manageLink} href={`/admin/${item.entity.toLowerCase()}`}>Gérer</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f4f4f9',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statBoxHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
  statTitle: {
    fontSize: '22px',
    marginBottom: '15px',
    color: '#555',
    fontWeight: '600',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  manageLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '14px',
    backgroundColor: '#007BFF',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    marginTop: 'auto',
  },
  manageLinkHover: {
    backgroundColor: '#0056b3',
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  loader: {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 2s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default CustomDashboard;
