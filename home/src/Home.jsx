import React from "react";

import { useAuth } from "App/AuthHook";

function Home() {
  const { authenticate, user, loading } = useAuth();

  return (
    <div>
      <h1>Home</h1>

      {user ? (
        <p>Usuário logado - {user.name}</p>
      ) : (
        <>
          <button type="button" onClick={authenticate} disabled={loading}>
            {loading ? "Aguarde..." : "Login"}
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
