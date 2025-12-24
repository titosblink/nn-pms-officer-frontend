// src/Dashboard/Sidenav.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidenav({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        id="layout-sidebar"
        className={`fixed inset-y-0 start-0 z-50 h-full w-64 transform overflow-y-auto border-r border-base-content/20 bg-base-100 p-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col">
          {/* Close button (mobile only) */}
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
              <h3 className="text-lg font-semibold">{/* User Name */}OC Aluu</h3>
              <p className="text-base-content/80">aluu.nn4545@navy.mil.ng</p>
            </div>
            <div className="flex gap-3">Administrator</div>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto">
            <ul className="accordion menu menu-sm gap-1 p-3">
              {/* Dashboard */}
              <li
                className={`accordion-item ${
                  activeItem === "dashboard" ? "active" : ""
                }`}
              >
                <button
                  className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal"
                  onClick={() => setActiveItem("dashboard")}
                >
                  <span className="icon-[tabler--dashboard] size-4.5"></span>
                  <span className="grow">Dashboard</span>
                </button>
              </li>

              {/* Section Divider */}
              <li className="text-base-content/50 mt-2 p-2 text-xs uppercase relative before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5 before:bg-base-content/20">
                Pages
              </li>

              {/* Officers */}
              <li
                className={`accordion-item ${
                  activeItem === "officers" ? "active" : ""
                }`}
              >
                <button
                  className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal"
                  onClick={() => setActiveItem("officers")}
                >
                  <Link to="/add-officer">
                    <span className="icon-[tabler--users] size-4.5"></span>
                    <span className="grow">Officers</span>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
