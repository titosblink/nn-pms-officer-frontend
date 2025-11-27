// src/Dashboard/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Load user from localStorage
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const officersCount = 5000;

  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* Header */}
      <div className="bg-base-100 border-base-content/20 lg:ps-64 sticky top-0 z-50 flex border-b">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="navbar py-2">
            <div className="navbar-start items-center gap-2">
              {/* Mobile Sidebar Toggle */}
              <button
                type="button"
                className="btn btn-soft btn-square btn-sm lg:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
              >
                <span className="icon-[tabler--menu-2] size-4.5"></span>
              </button>

              {/* Search */}
              <div className="input no-focus border-0 px-0">
                <span className="icon-[tabler--search] text-base-content/80 my-auto me-2 size-4 shrink-0"></span>
                <input
                  type="search"
                  className="grow placeholder:text-sm"
                  placeholder="Type to Search..."
                  id="kbdInput"
                />
                <label className="sr-only" htmlFor="kbdInput">
                  Search
                </label>
              </div>
            </div>

            {/* Navbar End */}
            <div className="navbar-end items-end gap-6">
              {/* GitHub Button */}
              <div className="max-md:hidden">
                <a
                  className="github-button"
                  href="https://github.com/themeselection/flyonui"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star themeselection/flyonui on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star
                </a>
              </div>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="avatar"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span className="rounded-field size-9.5">
                    <img src="assets/img/avatars/2.png" alt="User Avatar" />
                  </span>
                </button>

                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-56 bg-base-100 shadow-lg rounded-md z-50">
                    <li className="flex items-center gap-3 px-4 py-2 border-b border-base-content/20">
                      <div className="avatar w-10">
                        <img src="assets/img/avatars/2.png" alt="avatar" />
                      </div>
                      <div>
                        <h6 className="font-semibold">{user?.name || "OC Aluu"}</h6>
                        <p className="text-sm text-base-content/80">Lieutenant</p>
                      </div>
                    </li>
                    <li>
                      <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-base-200">
                        <span className="icon-[tabler--settings] size-5"></span>
                        Change Password
                      </button>
                    </li>
                    <li>
                      <hr className="my-1 border-base-content/20" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-error hover:bg-base-200"
                      >
                        <span className="icon-[tabler--logout] size-5"></span>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Sidebar */}
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        <aside
          className={`fixed inset-y-0 start-0 z-50 h-full w-64 transform overflow-y-auto border-r border-base-content/20 bg-base-100 p-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <button
              type="button"
              className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden"
              aria-label="Close Sidebar"
              onClick={toggleSidebar}
            >
              <span className="icon-[tabler--x] size-4.5"></span>
            </button>

            {/* User Info */}
            <div className="flex flex-col items-center gap-4 border-b border-base-content/20 px-4 py-6 text-base-content">
              <div className="avatar">
                <div className="size-17 rounded-full">
                  <img src="assets/img/avatars/2.png" alt="avatar" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{user?.name || "OC Aluu"}</h3>
                <p className="text-base-content/80">{user?.email || "aluu.nn4545@navy.mil.ng"}</p>
              </div>
              <div className="flex gap-3">Administrator</div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto">
              <ul className="accordion menu menu-sm gap-1 p-3">
                <li className="accordion-item active">
                  <button className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal">
                    <span className="icon-[tabler--dashboard] size-4.5"></span>
                    <span className="grow">Dashboard</span>
                  </button>
                </li>
                <li className="text-base-content/50 mt-2 p-2 text-xs uppercase relative before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5 before:bg-base-content/20">
                  Pages
                </li>
                <li className="accordion-item">
                  <button className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal">
                    <span className="icon-[tabler--users] size-4.5"></span>
                    <span className="grow">Officers</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </>

      {/* Main Content */}
      <div className="lg:ps-64 flex grow flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
          <div className="shadow-base-300/10 rounded-box bg-base-100 flex gap-4 p-6 shadow-md max-xl:flex-col">
            <Link to="/officers" className="flex flex-1 gap-4 max-sm:flex-col">
              <div className="flex flex-1 flex-col gap-4">
                <div className="text-base-content flex items-center gap-2">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-base-200 rounded-field size-9">
                      <span className="icon-[tabler--users] size-5"></span>
                    </div>
                  </div>
                  <h5 className="text-lg font-medium">Officers</h5>
                </div>
                <div>
                  <div className="text-base-content text-xl font-semibold">
                    {officersCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-base-content/50 font-medium">Click to view</span>
                  </div>
                </div>
              </div>
              <div className="divider sm:divider-horizontal" />
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
          <div className="flex items-center justify-between gap-3 max-lg:flex-col">
            <p className="text-base-content text-center">
              ©2025{" "}
              <a href="https://flyonui.com/" className="text-primary">
                Nigerian Navy
              </a>
            </p>
            <div className="flex items-center gap-4 justify-center max-sm:flex-col">
              <a
                href="#"
                className="link link-primary link-animated font-normal"
                aria-label="More Templates"
                target="_blank"
              >
                Designed by OC Aluu
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
