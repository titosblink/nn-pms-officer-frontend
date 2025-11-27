// src/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidenav from "./Sidenav";
import Home from "./Home";
import Footer from "./Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* Header */}
      <Header user={user} handleLogout={handleLogout} toggleSidebar={toggleSidebar} />

      {/* Layout container */}
      <div className="lg:ps-64 flex grow flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidenav isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <Home />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
