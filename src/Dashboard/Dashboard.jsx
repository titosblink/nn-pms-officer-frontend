import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* Header */}
      <Header user={user} />

      {/* Sidebar */}
      <Sidenav handleLogout={handleLogout} />

      {/* Main Layout */}
      <div className="lg:ps-75 flex grow flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
          {/* Dashboard content */}
          <div className="shadow-base-300/10 rounded-box bg-base-100 flex gap-4 p-6 shadow-md max-xl:flex-col">
            <div className="flex flex-1 gap-4 max-sm:flex-col">
              <div className="flex flex-1 flex-col gap-4">
                <div className="text-base-content flex items-center gap-2">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-base-200 rounded-field size-9">
                      <span className="icon-[tabler--users] size-5" />
                    </div>
                  </div>
                  <h5 className="text-lg font-medium">Officers</h5>
                </div>
                <div>
                  <div className="text-base-content text-xl font-semibold">5,000</div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-base-content/50 font-medium">Click to view</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
