import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import "../../globals.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          onClick={() => navigate("/")}
        >
          User API
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<PersonAdd />}
            onClick={() => navigate("/register")}
            sx={{
              fontWeight: isActive("/register") ? 700 : 400,
              borderBottom: isActive("/register")
                ? "3px solid var(--text-primary)"
                : "none",
              borderRadius: 0,
              pb: isActive("/register") ? 0.5 : 0,
            }}
          >
            Add User
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
