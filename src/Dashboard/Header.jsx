// src/Dashboard/Header.jsx
import { useState } from "react";

export default function Header({ user, handleLogout, toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-base-100 border-base-content/20 lg:ps-75 sticky top-0 z-50 flex border-b">
      <div className="mx-auto w-full max-w-7xl">
        <nav className="navbar py-2">
          <div className="navbar-start items-center gap-2">
            {/* Mobile menu button */}
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
              >
                Star
              </a>
            </div>

            {/* Profile Dropdown */}
            <div className="relative inline-flex [--offset:21]">
              <button
                id="profile-dropdown"
                type="button"
                className="dropdown-toggle avatar"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="rounded-field size-9.5">
                  <img src="assets/img/avatars/2.png" alt="User Avatar" />
                </span>
              </button>

              {dropdownOpen && (
                <ul
                  className="dropdown-menu max-w-75 absolute right-0 mt-2 w-full space-y-0.5 bg-base-100 shadow-lg rounded-md"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="profile-dropdown"
                >
                  <li className="dropdown-header pt-4.5 mb-1 gap-4 px-5 pb-3.5 flex items-center">
                    <div className="avatar avatar-online-top">
                      <div className="w-10 rounded-full">
                        <img src="assets/img/avatars/2.png" alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-base-content mb-0.5 font-semibold">
                        {user?.name || "OC Aluu"}
                      </h6>
                      <p className="text-base-content/80 font-medium">
                        {user?.rank || "Lieutenant"}
                      </p>
                    </div>
                  </li>

                  <li>
                    <a className="dropdown-item px-3 flex items-center gap-2" href="#">
                      <span className="icon-[tabler--settings] size-5"></span>
                      Change Password
                    </a>
                  </li>

                  <li>
                    <hr className="border-base-content/20 -mx-2 my-1" />
                  </li>

                  <li className="dropdown-footer p-2 pt-1">
                    <button
                      className="btn btn-text btn-error btn-block h-11 justify-start px-3 font-normal flex items-center gap-2 w-full"
                      onClick={handleLogout}
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
  );
}
