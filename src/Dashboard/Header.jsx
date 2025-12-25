import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-100 border-base-content/20 lg:ps-75 sticky top-0 z-50 flex border-b">
      <div className="mx-auto w-full max-w-7xl">
        <nav className="navbar py-2">
          <div className="navbar-start items-center gap-2">
            <button
              type="button"
              className="btn btn-soft btn-square btn-sm lg:hidden"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="layout-sidebar"
              data-overlay="#layout-sidebar"
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
            <div className="max-md:hidden">
              <Link
                className="github-button"
                href="#"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
              >
                Welcome {user?.name || ""}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
