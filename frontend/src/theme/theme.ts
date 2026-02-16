import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#080C14",
      paper: "#111827",
    },
    primary: {
      main: "#2e477e",
      light: "#60A5FA",
      dark: "#1D3557",
    },
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    text: {
      primary: "#F0F6FF",
      secondary: "#94A3B8",
      disabled: "#475569",
    },
    divider: "#1E2D45",
  },

  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            backgroundColor: "#0D1526",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            backgroundColor: "#111827",
            borderBottom: "1px solid #1E2D45",
            "&:hover": {
              backgroundColor: "#162033 !important",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #1E2D45",
          color: "#94A3B8",
        },
        head: {
          color: "#F0F6FF",
          fontWeight: 700,
          backgroundColor: "#0D1526",
          letterSpacing: "0.05em",
          fontSize: "0.8rem",
          textTransform: "uppercase",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#111827",
          backgroundImage: "none",
          border: "1px solid #1E2D45",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: "#1E2D45",
          color: "#94A3B8",
          fontFamily: "monospace",
          fontSize: "0.7rem",
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #2563EB, #60A5FA)",
          fontWeight: 700,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#0D1526",
          border: "1px solid #1E2D45",
          color: "#94A3B8",
          fontSize: "0.75rem",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#162033",
          },
        },
      },
    },
  },
});
