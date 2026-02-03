import RegisterForm from "./components/user/registerForm";
import Box from "@mui/material/Box";

/*function App() {
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

export default App;*/

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "primary.main",
          clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 60%)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          py: 12,
          px: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "lg" }}>
          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
}
