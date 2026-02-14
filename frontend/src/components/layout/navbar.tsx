import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, People, PersonAdd } from "@mui/icons-material";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para verificar si la ruta está activa
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        {/* Logo / Título */}
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
          🧑‍💻 UserApp
        </Typography>

        {/* Botones de navegación */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              fontWeight: isActive("/") ? 700 : 400,
              borderBottom: isActive("/") ? "3px solid white" : "none",
              borderRadius: 0,
              pb: isActive("/") ? 0.5 : 0,
            }}
          >
            Inicio
          </Button>

          <Button
            color="inherit"
            startIcon={<People />}
            onClick={() => navigate("/users")}
            sx={{
              fontWeight: isActive("/users") ? 700 : 400,
              borderBottom: isActive("/users") ? "3px solid white" : "none",
              borderRadius: 0,
              pb: isActive("/users") ? 0.5 : 0,
            }}
          >
            Usuarios
          </Button>

          <Button
            color="inherit"
            startIcon={<PersonAdd />}
            onClick={() => navigate("/register")}
            sx={{
              fontWeight: isActive("/register") ? 700 : 400,
              borderBottom: isActive("/register") ? "3px solid white" : "none",
              borderRadius: 0,
              pb: isActive("/register") ? 0.5 : 0,
            }}
          >
            Registrar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
