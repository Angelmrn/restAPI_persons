import { Box } from "@mui/material";
import UsersTable from "../../components/user/usersTable";

function App() {
  return (
    <Box sx={{ backgroundColor: "background.default", height: "100vh" }}>
      <UsersTable />
    </Box>
  );
}

export default App;
