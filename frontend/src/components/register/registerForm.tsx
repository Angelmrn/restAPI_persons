"use client";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useActionState } from "react";
import { register } from "../../actions/user";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
        p: 4,
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        my: 6,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "black" }}>
        Crea tu cuenta
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "black" }}>
        Brindanos tu información para crear tu cuenta.
      </Typography>

      <form action={formAction}>
        <TextField
          fullWidth
          type="text"
          name="username"
          label="Nombre(s)"
          margin="normal"
          variant="outlined"
          defaultValue={state?.formData?.username || ""}
          error={!!state?.errors?.username}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "40px" } }}
        />
        {state?.errors?.username && (
          <Typography color="error" variant="body2" mt={1}>
            {state.errors.username}
          </Typography>
        )}
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Correo electrónico"
          margin="normal"
          variant="outlined"
          defaultValue={state?.formData?.email || ""}
          error={!!state?.errors?.email}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "40px" } }}
        />
        {state?.errors?.email && (
          <Typography color="error" variant="body2" mt={1}>
            {state.errors.email}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 5,
            backgroundColor: pending ? "#BDBDBD" : "primary.main",
            color: "white",
            fontWeight: 600,
            fontSize: 18,
            "&: hover": {
              backgroundColor: "primary.dark",
            },
          }}
          disabled={pending}
        >
          {pending ? "Registering..." : "Register"}
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ mt: 2, color: "primary.main", fontWeight: 600 }}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </form>
    </Box>
  );
}
