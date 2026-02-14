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
} from "@mui/material";
import { fetchUserById } from "../../api/users";
import type { User } from "../../types/user";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formats";

export default function UserInfo() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  if (loading) {
    return <p>Loading user information...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
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
              sx={{ fontWeight: 600, mb: 1, color: "black" }}
            >
              Información de {user.username}
            </Typography>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID"
              value={user.id}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Username"
              value={user.username}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Email"
              value={user.email}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Join Date"
              value={formatDate(user.createdAt)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
