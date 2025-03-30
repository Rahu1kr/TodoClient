import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Todolist from './Todolist';
import Login from './Login';
import Register from './Register';

const App = () => {
  const userdata = localStorage.getItem("userdata");
  const [isAuthenticated, setIsAuthenticated] = useState(userdata !== null); // Checking if the user is logged in

  console.log(isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    setIsAuthenticated(false); // Properly update the state
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "lightskyblue",
      padding: "10px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {isAuthenticated && (
        <button 
          onClick={handleLogout} 
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
            border: "none",
            marginBottom: "10px"
          }}
        >
          Logout
        </button>
      )}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Todolist /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
};

export default App;
