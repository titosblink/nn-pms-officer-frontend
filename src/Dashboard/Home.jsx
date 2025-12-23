// src/Dashboard/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  // Example officer count
  const officersCount = 5000;
  const token = localStorage.getItem("token");

if (!token) {
  navigate("/");
}

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 grow space-y-6 p-6">
      {/* Stats Card */}
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
                <span className="text-base-content/50 font-medium">
                  Click to view
                </span>
              </div>
            </div>
          </div>

          <div className="divider sm:divider-horizontal"></div>
        </Link>
      </div>

      {/* Additional cards can be added here following the same structure */}
    </main>
  );
}
