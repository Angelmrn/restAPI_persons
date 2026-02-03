"use client";
import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import { fetchUsers } from "../../api/users.ts";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
  return (
    <>
      <div>
        <h1>User List</h1>
        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} ({user.email}) - Joined on{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
