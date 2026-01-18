import React, { useState } from "react";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = () => {
    setLoading(true);

    // 🔥 Redirect to BACKEND, not GitHub
    window.location.href = "http://localhost:3001/api/auth/github";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1>RepoLens</h1>
      <button onClick={handleGitHubLogin} disabled={loading}>
        {loading ? "Redirecting..." : "Sign in with GitHub"}
      </button>
    </div>
  );
};

export default Login;
