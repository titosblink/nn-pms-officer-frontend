// src/Dashboard/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Load user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const officersCount = 5000;

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* ---------- HEADER ---------- */}
      <div className="bg-base-100 border-base-content/20 lg:ps-75 sticky top-0 z-50 flex border-b">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="navbar py-2">
            <div className="navbar-start items-center gap-2">
              {/* Sidebar Toggle (mobile) */}
              <button
                type="button"
                className="btn btn-soft btn-square btn-sm lg:hidden"
                aria-label="Toggle Sidebar"
                onClick={toggleSidebar}
              >
                <span className="icon-[tabler--menu-2] size-4.5" />
              </button>

              {/* Search */}
              <div className="input no-focus border-0 px-0">
                <span className="icon-[tabler--search] text-base-content/80 my-auto me-2 size-4 shrink-0" />
                <input
                  type="search"
                  className="grow placeholder:text-sm"
                  placeholder="Type to Search..."
                  id="kbdInput"
                />
                <label className="sr-only" htmlFor="kbdInput">Search</label>
              </div>
            </div>

            <div className="navbar-end items-end gap-6">
              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="dropdown relative inline-flex [--offset:21]">
                <button
                  id="profile-dropdown"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="dropdown-toggle avatar"
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  aria-label="Dropdown"
                >
                  <span className="rounded-field size-9.5">
                    <img src="assets/img/avatars/2.png" alt="User Avatar" />
                  </span>
                </button>

                <ul
                  className={`dropdown-menu dropdown-open:opacity-100 max-w-75 space-y-0.5 transition-all duration-300 ease-in-out transform ${
                    dropdownOpen ? "opacity-100 scale-100 block" : "opacity-0 scale-95 hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="profile-dropdown"
                >
                  <li className="dropdown-header pt-4.5 mb-1 gap-4 px-5 pb-3.5">
                    <div className="avatar avatar-online-top">
                      <div className="w-10 rounded-full">
                        <img src="assets/img/avatars/2.png" alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-base-content mb-0.5 font-semibold">{user?.name || "OC Aluu"}</h6>
                      <p className="text-base-content/80 font-medium">Lieutenant</p>
                    </div>
                  </li>

                  <li>
                    <button className="dropdown-item px-3 flex items-center gap-2 w-full text-left">
                      <span className="icon-[tabler--settings] size-5" />
                      Change Password
                    </button>
                  </li>
                  <li>
                    <hr className="border-base-content/20 -mx-2 my-1" />
                  </li>
                  <li className="dropdown-footer p-2 pt-1">
                    <button
                      onClick={handleLogout}
                      className="btn btn-text btn-error btn-block h-11 justify-start px-3 font-normal flex items-center gap-2"
                    >
                      <span className="icon-[tabler--logout] size-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* ---------- SIDEBAR ---------- */}
      <aside
        ref={sidebarRef}
        id="layout-sidebar"
        className={`overlay drawer drawer-start sm:w-75 inset-y-0 start-0 lg:z-50 lg:block lg:shadow-none transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        tabIndex={-1}
      >
        <div className="drawer-body border-base-content/20 h-full border-e p-0">
          <div className="flex h-full max-h-full flex-col">
            <button
              type="button"
              className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden"
              aria-label="Close"
              onClick={toggleSidebar}
            >
              <span className="icon-[tabler--x] size-4.5" />
            </button>

            {/* Sidebar User Info */}
            <div className="text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6">
              <div className="avatar">
                <div className="size-17 rounded-full">
                  <img src="assets/img/avatars/2.png" alt="avatar" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-base-content text-lg font-semibold">{user?.name || "OC Aluu"}</h3>
                <p className="text-base-content/80">{user?.email || "aluu.nn4545@navy.mil.ng"}</p>
              </div>
              <div className="flex gap-3">Administrator</div>
            </div>

            {/* Sidebar Menu */}
            <div className="h-full overflow-y-auto">
              <ul className="accordion menu menu-sm gap-1 p-3">
                <li className="active accordion-item" id="dashboard">
                  <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal">
                    <span className="icon-[tabler--dashboard] size-4.5" />
                    <span className="grow">Dashboard</span>
                  </button>
                </li>

                <li className="text-base-content/50 before:bg-base-content/20 mt-2 p-2 text-xs uppercase before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5">
                  Pages
                </li>

                <li className="accordion-item" id="account-settings">
                  <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal">
                    <span className="icon-[tabler--users] size-4.5" />
                    <span className="grow">Officers</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="lg:ps-75 flex grow flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
          {/* Officers Card */}
          <Link to="/officers">
            <div className="shadow-base-300/10 rounded-box bg-base-100 flex gap-4 p-6 shadow-md max-xl:flex-col transition-all duration-300 hover:scale-[1.01]">
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
                    <div className="text-base-content text-xl font-semibold">{officersCount.toLocaleString()}</div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-base-content/50 font-medium">Click to view</span>
                    </div>
                  </div>
                </div>
                <div className="divider sm:divider-horizontal" />
              </div>
            </div>
          </Link>
        </main>

        {/* ---------- FOOTER ---------- */}
        <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
          <div className="flex items-center justify-between gap-3 max-lg:flex-col">
            <p className="text-base-content text-center">
              ©2025 <a href="https://flyonui.com/" className="text-primary">Nigerian Navy</a>
            </p>
            <div className="flex items-center gap-4 max-sm:flex-col justify-center">
              <a href="#" className="link link-primary link-animated font-normal" target="_blank" rel="noopener noreferrer">
                Designed by OC Aluu
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
