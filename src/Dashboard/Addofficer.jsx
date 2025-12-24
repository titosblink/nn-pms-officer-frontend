import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Addofficer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState("add-officer");

  // Auth check
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

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* HEADER */}
      <div className="bg-base-100 border-base-content/20 sticky top-0 z-50 border-b">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="navbar py-2">
            <div className="navbar-start gap-2">
              <div className="input border-0 px-0">
                <input
                  type="search"
                  className="grow placeholder:text-sm"
                  placeholder="Type to search..."
                />
              </div>
            </div>

            <div className="navbar-end">
              <span className="font-medium">Welcome</span>
            </div>
          </nav>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="drawer drawer-start lg:block">
        <div className="drawer-body border-base-content/20 border-e p-0">
          <div className="flex flex-col h-full">
            {/* USER INFO */}
            <div className="border-base-content/20 border-b px-4 py-6 text-center">
              <div className="avatar mb-2">
                <div className="size-16 rounded-full">
                  <img src="/assets/img/avatars/2.png" alt="avatar" />
                </div>
              </div>
              <h3 className="font-semibold">OC Aluu</h3>
              <p className="text-sm text-base-content/70">
                aluu.nn4545@navy.mil.ng
              </p>

              <button
                onClick={handleLogout}
                className="mt-3 btn btn-sm btn-outline w-full"
              >
                Logout
              </button>
            </div>

            {/* MENU */}
            <ul className="menu menu-sm p-3 gap-1">
              <li className={activeItem === "add-officer" ? "active" : ""}>
                <Link
                  to="/add-officer"
                  onClick={() => setActiveItem("add-officer")}
                >
                  Officers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 p-6">
        <div className="rounded-box bg-base-100 p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Officers</h2>

          <div className="flex items-center gap-4">
            <div className="avatar avatar-placeholder">
              <div className="bg-base-200 rounded-full size-10">
                <span className="text-lg">👮</span>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold">5,000</p>
              <p className="text-sm text-base-content/60">
                Click to view officers
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mx-auto w-full max-w-[1280px] px-6 py-4 text-sm">
        <div className="flex justify-between items-center">
          <p>
            ©2025 <span className="text-primary">Nigerian Navy</span>
          </p>
          <span>Designed by OC Aluu</span>
        </div>
      </footer>
    </div>
  );
}
