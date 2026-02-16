"use client";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchUserById, deleteUser } from "../../api/users";
import type { User } from "../../types/user";
import { useState, useEffect, useActionState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formats";
import { UpdateUser } from "../../actions/user";

export default function UserInfo() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  const updateUserWithId = UpdateUser.bind(null, Number(id));
  const [state, formAction, isPending] = useActionState(
    updateUserWithId,
    undefined,
  );

  useEffect(() => {
    const loadUser = async () => {
      if (!id) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetchUserById(Number(id));
        setUser(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  useEffect(() => {
    if (state?.message === "User updated successfully" && state.formData) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              username: state.formData.username,
              email: state.formData.email,
            }
          : prev,
      );
      setIsEditing(false);
    }
  }, [state]);

  const handleDeleteUser = async () => {
    if (!user) return;
    try {
      await deleteUser(user.id);
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  if (!user) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography>User not found</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        my: 6,
        px: 2,
      }}
    >
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {isEditing ? "Editando usuario" : `${user.username} information`}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />
          {state?.message && state.message !== "User updated successfully" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {state.message}
            </Alert>
          )}
          {state?.message === "User updated successfully" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Usuario actualizado correctamente
            </Alert>
          )}

          {!isEditing && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="ID"
                value={user.id}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />
              <TextField
                label="Username"
                value={user.username}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />
              <TextField
                label="Email"
                value={user.email}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />
              <TextField
                label="Join Date"
                value={formatDate(user.createdAt)}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Edit User
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </Button>
              </Box>
            </Box>
          )}

          {isEditing && (
            <Box
              component="form"
              action={formAction}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="ID"
                value={user.id}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />

              <TextField
                label="Username"
                name="username"
                defaultValue={user.username}
                error={!!state?.errors?.username}
                helperText={state?.errors?.username?.[0]}
                fullWidth
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                defaultValue={user.email}
                error={!!state?.errors?.email}
                helperText={state?.errors?.email?.[0]}
                fullWidth
                required
              />

              <TextField
                label="Join Date"
                value={formatDate(user.createdAt)}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="contained" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
