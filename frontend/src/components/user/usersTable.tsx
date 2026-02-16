import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Avatar,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Container,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import {
  Visibility,
  Delete,
  PersonAdd,
  WarningAmber,
} from "@mui/icons-material";
import type { User } from "../../types/user";
import { fetchUsers, deleteUser } from "../../api/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formats";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    userId: number | null;
    username: string;
  }>({ open: false, userId: null, username: "" });

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchUsers();
      setUsers(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    navigate(`/user/${userId}`);
  };

  const handleDeleteClick = (
    userId: number,
    username: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setDeleteDialog({ open: true, userId, username });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.userId) return;
    try {
      await deleteUser(deleteDialog.userId);
      setDeleteDialog({ open: false, userId: null, username: "" });
      loadUsers();
    } catch (err) {
      setError((err as Error).message);
      setDeleteDialog({ open: false, userId: null, username: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null, username: "" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 3,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="textSecondary">
          Loading users...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert
          severity="error"
          action={
            <IconButton color="inherit" size="small" onClick={loadUsers}>
              Try Again
            </IconButton>
          }
        >
          Error loading users: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Users
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage and view all system users
            </Typography>
          </Box>
        </Stack>
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell width={80}>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" color="textSecondary">
                    No hay usuarios registrados
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Comienza agregando tu primer usuario
                  </Typography>
                  <IconButton
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/register")}
                  >
                    <PersonAdd fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  selected={selectedUserId === user.id}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": { bgcolor: "action.hover" },
                    "&.Mui-selected": { bgcolor: "primary.dark" },
                  }}
                  onClick={() => handleUserClick(user.id)}
                >
                  <TableCell>
                    <Chip
                      label={`#${user.id}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 40,
                          height: 40,
                          fontWeight: 700,
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user.username}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="primary">
                      {user.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2">
                      {formatDate(user.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleUserClick(user.id)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>

                      {/* ✅ Ahora usa handleDeleteClick con el username */}
                      <Tooltip title="Delete user">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) =>
                            handleDeleteClick(user.id, user.username, e)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Dialog dentro del return principal */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            minWidth: 380,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                bgcolor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "50%",
                p: 1,
                display: "flex",
              }}
            >
              <WarningAmber sx={{ color: "error.main", fontSize: 22 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Delete User
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            ¿Are you sure you want to delete this user{" "}
            <Box
              component="span"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {deleteDialog.username}
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleDeleteCancel}
            fullWidth
            sx={{ borderColor: "divider", color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            fullWidth
            sx={{
              fontWeight: 700,
              "&:hover": { boxShadow: "0 0 16px rgba(239,68,68,0.4)" },
            }}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
