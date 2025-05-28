import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { membershipOptions } from "./MemberShipPlans"; // Import the data

const MembershipDialog = ({ open, onClose, selectedPlan, onConfirm }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // Find the selected plan from the imported data
  const selectedPlanType = membershipOptions.find(
    (plan) => plan.type === selectedPlan
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isSmallScreen}
    >
      <DialogTitle
        sx={{
          fontSize: isSmallScreen ? "1.25rem" : "1.5rem",
          fontWeight: 700,
          textAlign: "center",
          p: isSmallScreen ? 2 : 3,
        }}
      >
        {selectedPlan?.type} Membership
        <IconButton
          sx={{
            position: "absolute",
            right: isSmallScreen ? 8 : 15,
            top: isSmallScreen ? 8 : 15,
          }}
          onClick={onClose}
        >
          <AiOutlineClose size={isSmallScreen ? 20 : 24} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: isSmallScreen ? 2 : 3 }}>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: isSmallScreen ? "1.1rem" : "1.25rem",
          }}
        >
          Benefits of {selectedPlan?.type} Plan:
        </Typography>
        <Box component="ul" sx={{ pl: isSmallScreen ? 2 : 3, mb: 0 }}>
          {selectedPlan?.benefits?.map((benefit, index) => (
            <Typography
              key={index}
              variant="body1"
              component="li"
              sx={{
                fontSize: isSmallScreen ? "0.9rem" : "1rem",
                mb: 1,
              }}
            >
              {benefit}
            </Typography>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column",
          alignItems: "center",
          p: isSmallScreen ? 2 : 3,
          pt: 1,
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: isSmallScreen ? "1.1rem" : "1.25rem",
          }}
        >
          Total: {selectedPlan?.price}
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            fontWeight: "bold",
            fontSize: isSmallScreen ? "1rem" : "1.125rem",
            borderRadius: "12px",
            padding: isSmallScreen ? "6px 20px" : "8px 24px",
            width: isSmallScreen ? "100%" : "auto",
          }}
          onClick={onConfirm}
        >
          Proceed to Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembershipDialog;
