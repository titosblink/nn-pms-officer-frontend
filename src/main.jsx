import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Dashboard/Home";
import Officers from "./Dashboard/Officers";   // ✅ IMPORT THIS
import Addofficer from "./Dashboard/Addofficer ";
import Dashboard from "./Dashboard/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/officers" element={<Officers />} />
      <Route path="/add-officer" element={<Addofficer />} />
    </Routes>
  </BrowserRouter>
);
