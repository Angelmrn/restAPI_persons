import { Box } from "@mui/material";
import RegisterForm from "../../components/register/registerForm";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--bg-primary)",
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
