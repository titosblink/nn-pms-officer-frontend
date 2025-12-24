import { Link } from "react-router-dom";

export default function Sidenav({ handleLogout }) {
    return (
        <aside className="overlay drawer drawer-start sm:w-75 inset-y-0 start-0 hidden lg:block">
            <div className="drawer-body border-base-content/20 h-full border-e p-0">
                <div className="flex h-full flex-col">
                    <div className="text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6">
                        <div className="avatar">
                            <div className="size-17 rounded-full">
                                <img src="assets/img/avatars/2.png" alt="avatar" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">OC Aluu</h3>
                            <p className="text-base-content/80">aluu.nn4545@navy.mil.ng</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <span className="icon-[tabler--logout] size-5" /> Logout
                            </button>
                        </div>
                    </div>
                    <div className="h-full overflow-y-auto">
                        <ul className="accordion menu menu-sm gap-1 p-3">
                            <li className="active accordion-item">
                                <button className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal">
                                    <span className="icon-[tabler--dashboard] size-4.5" />
                                    <span className="grow">Dashboard</span>
                                </button>
                            </li>
                            <li className="text-base-content/50 mt-2 p-2 text-xs uppercase">Pages</li>
                            <li className="accordion-item">
                                <Link to="/add-officer" className="accordion-toggle inline-flex w-full items-center p-2 text-start text-sm font-normal">
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
