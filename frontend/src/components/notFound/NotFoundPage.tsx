import { Box, Typography, Button, Container } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{ fontSize: "8rem", fontWeight: 700, mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Página no encontrada
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "var(--bg-secondary)",
            color: "var(--text-secondary)",
            "&:hover": { bgcolor: "#979797" },
          }}
        >
          Volver al inicio
        </Button>
      </Container>
    </Box>
  );
}
