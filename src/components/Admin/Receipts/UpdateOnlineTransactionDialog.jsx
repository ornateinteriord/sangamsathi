import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useUpdateOnlineTransactionStatus } from "../../api/Admin";

const statusOptions = ["TXN_SUCCESS", "success", "PENDING", "TXN_FAILURE"];
const userTypeOptions = ["SilverUser", "PremiumUser", "FreeUser"];

const UpdateOnlineTransactionDialog = ({ open, handleClose, transaction }) => {
  const [formData, setFormData] = useState({
    status: "",
    usertype: "",
    activateUser: true,
  });

  useEffect(() => {
    if (open && transaction) {
      setFormData({
        status: transaction.status || "TXN_SUCCESS",
        usertype: transaction.usertype || "SilverUser",
        activateUser: true,
      });
    }
  }, [open, transaction]);

  const { mutate: updateStatus, isPending } = useUpdateOnlineTransactionStatus();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!transaction) return;
    const targetId = transaction._id || transaction.transaction_id || transaction.transcation_id;
    
    updateStatus(
      {
        id: targetId,
        status: formData.status,
        usertype: formData.usertype,
        activateUser: formData.activateUser,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "Outfit sans-serif", fontWeight: 600, color: "#34495e" }}>
        Update Online Transaction
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mt: 1 }}>
        <Box mb={3} p={2} sx={{ bgcolor: "#f8f9fa", borderRadius: 2, border: "1px solid #e9ecef" }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Transaction Details
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Reg No:</strong> {transaction.registration_no || "-"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Amount:</strong> Rs. {transaction.amount || 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Bank Ref:</strong> {transaction.bank_ref_num || "-"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Mode:</strong> {transaction.mode || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>Order No:</strong> {transaction.orderno || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" flexDirection="column" gap={2.5}>
          <TextField
            select
            label="Transaction Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="User Plan Type"
            name="usertype"
            value={formData.usertype}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          >
            {userTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ bgcolor: "#e8f5e9", p: 1.5, borderRadius: 1.5, border: "1px solid #c8e6c9" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="activateUser"
                  checked={formData.activateUser}
                  onChange={handleChange}
                  color="success"
                />
              }
              label={
                <Typography variant="body2" fontWeight={600} color="#2e7d32">
                  Activate user membership & send activation email
                </Typography>
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit" sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          sx={{
            bgcolor: "#0B192C",
            "&:hover": { bgcolor: "#1A365D" },
            textTransform: "none",
            px: 3,
          }}
        >
          {isPending ? "Updating..." : "Save & Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOnlineTransactionDialog;
