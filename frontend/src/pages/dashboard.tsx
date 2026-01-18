import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Derive username directly (no useEffect, no setState)
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  // Redirect if not authenticated
  if (!username) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">RepoLens</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Logged in as <b>{username}</b>
            </span>

            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Welcome, {username} 👋
        </h2>

        <p className="text-gray-600">
          GitHub authentication successful.
        </p>

        <p className="text-gray-500 mt-2">
          Repository analysis will appear here.
        </p>
      </main>
    </div>
  );
}
