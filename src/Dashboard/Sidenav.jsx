import { Link } from "react-router-dom";

export default function Sidenav({ handleLogout }) {
    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-75 bg-base-100 transition-transform 
  ${props.isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
  {/* Menu content */}
<div className="drawer-body border-base-content/20 h-full border-e p-0">
                        <div className="flex h-full max-h-full flex-col">
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden" aria-label="Close" data-overlay="#layout-sidebar">
                                <span className="icon-[tabler--x] size-4.5" />
                            </button>
                            <div className="text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6">
                                <div className="avatar">
                                    <div className="size-17 rounded-full">
                                        <img src="assets/img/avatars/2.png" alt="avatar" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-base-content text-lg font-semibold">OC Aluu</h3>
                                    <p className="text-base-content/80">aluu.nn4545@navy.mil.ng</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                                        onClick={handleLogout}
                                    >
                                        <span className="icon-[tabler--logout] size-5" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <div className="h-full overflow-y-auto">
                                <ul className="accordion menu menu-sm gap-1 p-3">
                                    {/* Accordion Menu Item (Level 0) */}
                                    <li className="active accordion-item" id="dashboard">
                                        <button className="accordion-toggle accordion-item-active:bg-neutral/10 inline-flex w-full items-center p-2 text-start text-sm font-normal" aria-controls="dashboard-collapse-dashboard" aria-expanded="true">
                                            <span className="icon-[tabler--dashboard] size-4.5" />
                                            <span className="grow">Dashboard</span>
                                        </button>
                                    </li>
                                    {/* Section Divider */}
                                    <li className="text-base-content/50 before:bg-base-content/20 mt-2 p-2 text-xs uppercase before:absolute before:-start-3 before:top-1/2 before:h-0.5 before:w-2.5">Pages</li>
                                    {/* Accordion Menu Item (Level 0) */}
                                    <li className="accordion-item" id="account-settings">
                                        <Link
                                            to="/add-officer"
                                            className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal"
                                            onClick={() => setActiveItem("officers")}
                                        >
                                            <span className="icon-[tabler--users] size-4.5"></span>
                                            <span className="grow">Officers</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
    );
}
