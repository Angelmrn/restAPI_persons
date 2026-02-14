import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </Box>
    </Box>
  );
}
