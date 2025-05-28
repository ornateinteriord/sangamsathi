import  { useState,} from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";
import MembershipDialog from "../Userprofile/MembershipDailog/MembershipDailog";
import { membershipOptions } from '../Userprofile/MembershipDailog/MemberShipPlans'




const HomeUserTable = ({ userId }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentMembership, setCurrentMembership] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

 

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Container
        sx={{
          mb: 0,
          mt: 0,
          px: isSmallScreen ? 1 : 3,
          maxWidth: isSmallScreen ? "100%" : "lg",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight={700}
            color="primary"
            sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
          >
            Upgrade Your Membership
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            mt={1}
            sx={{ fontSize: isSmallScreen ? "0.9rem" : "1rem" }}
          >
            Choose your plan and enjoy <strong>exclusive benefits</strong> tailored for you!
          </Typography>
        </Box>

        {currentMembership && (
          <Box
            sx={{
              border: "1px solid black",
              padding: isSmallScreen ? "8px" : "10px",
              borderRadius: "10px",
              background: "black",
              mb: 3,
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: isSmallScreen ? 1 : 0,
            }}
          >
            <Typography
              variant={isSmallScreen ? "subtitle1" : "h6"}
              sx={{ fontWeight: "bold", color: "#fff", textAlign: isSmallScreen ? "center" : "left" }}
            >
              Current Plan: <span style={{ color: "#fff" }}>{currentMembership.type}</span>
            </Typography>
            <Typography
              variant={isSmallScreen ? "subtitle1" : "h6"}
              sx={{ color: "#fff", fontWeight: "bold", textAlign: isSmallScreen ? "center" : "left" }}
            >
              Price: {currentMembership.price}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                fontSize: isSmallScreen ? "14px" : "16px",
                fontWeight: "bold",
                background: "red",
                color: "#fff",
                textTransform: "capitalize",
                border: "none",
                width: isSmallScreen ? "100%" : "auto",
                mt: isSmallScreen ? 1 : 0,
              }}
              // onClick={handleRemoveMembership}
            >
              Remove Membership
            </Button>
          </Box>
        )}

        <Grid
          container
          spacing={isSmallScreen ? 2 : 4}
          justifyContent="center"
          sx={{
            padding: isSmallScreen ? "0 8px" : 0,
            marginLeft: isSmallScreen ? "-8px" : 0,
          }}
        >
          {membershipOptions.map((option) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={option.type}
              sx={{
                display: "flex",
                justifyContent: "center",
                maxWidth: isSmallScreen ? "100%" : "400px",
              }}
            >
              <Card
                sx={{
                  p: 0,
                  textAlign: "center",
                  boxShadow: 6,
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  background: option.gradient,
                  color: "#fff",
                  width: "300px",
                  marginBottom: "15px",
                }}
              >
                <CardContent sx={{ p: isSmallScreen ? 2 : 3 }}>
                  <Typography
                    variant={isSmallScreen ? "h6" : "h5"}
                    fontWeight={700}
                    sx={{ fontSize: isSmallScreen ? "1.25rem" : "1.5rem" }}
                  >
                    {option.type} Membership
                  </Typography>
                  <Typography
                    variant={isSmallScreen ? "subtitle1" : "h6"}
                    sx={{ mt: 0, opacity: 0.9 }}
                  >
                    {option.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#fff",
                      color: "#333",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      fontSize: isSmallScreen ? "0.875rem" : "1rem",
                      padding: isSmallScreen ? "6px 16px" : "8px 22px",
                      "&:hover": { backgroundColor: "#eee" },
                    }}
                    onClick={() => handleUpgrade(option)}
                  >
                    Upgrade to {option.type}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <MembershipDialog
        open={open}
        onClose={handleClose}
        selectedPlan={selectedPlan}
        // onConfirm={handleConfirmUpgrade}
      />
    </Box>
  );
};

export default HomeUserTable;