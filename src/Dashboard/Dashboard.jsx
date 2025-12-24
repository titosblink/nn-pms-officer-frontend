import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  if (!user) return <div>Loading...</div>; // avoid blank due to null user

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      <Header user={user} />
      <Sidenav handleLogout={handleLogout} />
      <div className="lg:ps-75 flex grow flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
          <h1 className="text-2xl font-bold">Dashboard Content Here</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}
