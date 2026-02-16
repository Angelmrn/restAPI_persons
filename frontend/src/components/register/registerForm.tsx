"use client";
import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import { useActionState } from "react";
import { register } from "../../actions/user";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Create User
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please fill in the details to create a new user.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {state?.message && !state?.errors && (
          <Box
            sx={{
              bgcolor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: "success.main" }}>
              {state.message}
            </Typography>
          </Box>
        )}

        {state?.message && state?.errors && (
          <Box
            sx={{
              bgcolor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            <Typography variant="body2" color="error">
              {state.message}
            </Typography>
          </Box>
        )}

        <form action={formAction}>
          <TextField
            fullWidth
            type="text"
            name="username"
            label="Name"
            margin="normal"
            variant="outlined"
            defaultValue={state?.formData?.username ?? ""}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username?.[0]}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(13,21,38,0.5)",
                "& fieldset": {
                  borderColor: "divider",
                },
                "&:hover fieldset": {
                  borderColor: "primary.light",
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="email"
            name="email"
            label="email"
            margin="normal"
            variant="outlined"
            defaultValue={state?.formData?.email ?? ""}
            error={!!state?.errors?.email}
            helperText={state?.errors?.email?.[0]}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(13,21,38,0.5)",
                "& fieldset": {
                  borderColor: "divider",
                },
                "&:hover fieldset": {
                  borderColor: "primary.light",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={pending}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: "0.95rem",
              "&.Mui-disabled": {
                bgcolor: "primary.main",
                color: "text.disabled",
              },
            }}
          >
            {pending ? "Registering..." : "Register"}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/")}
            sx={{
              mt: 1.5,
              color: "text.secondary",
              fontWeight: 600,
              "&:hover": {
                color: "text.primary",
                bgcolor: "rgba(255,255,255,0.04)",
              },
            }}
          >
            Go Back
          </Button>
        </form>
      </Box>
    </Box>
  );
}
