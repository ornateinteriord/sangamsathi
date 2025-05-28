import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { useGetMemberDetails } from "../../api/User/useGetProfileDetails";
import { LoadingComponent } from "../../../App";
import { toast } from "react-toastify";
import { useVerifiedImage } from "../../hook/ImageVerification";
import TokenService from "../../token/tokenService";


  const ProfileInfo = ({ label, value }) => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );

const InterestCard = ({ senderRefNo, recipientRefNo, handleResponse }) => {
  const {
    data: senderDetails,
    isLoading,
    isError,
    error,
  } = useGetMemberDetails(senderRefNo);
   const {getVerifiedImage} = useVerifiedImage()
   const loggedInUserRole = TokenService.getRole()

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Failed to load profile");
    }
  }, [isError, error]);

  if (isLoading) return <LoadingComponent />;

  const profile = senderDetails;

  return (
    <Card
      sx={{
        width: { xs: 300, sm: 280, md: 260, lg: 280 },
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 1,
        position: "relative",
      }}
    >
      {profile?.user_role === "PremiumUser" && (
        <Chip
          label="PREMIUM"
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: "bold",
            fontSize: { xs: "0.6rem", sm: "0.7rem" },
          }}
        />
      )}

      <Box
        sx={{
          width: { xs: 100, sm: 120, md: 110, lg: 120 },
          height: { xs: 100, sm: 120, md: 110, lg: 120 },
          borderRadius: "50%",
          border: "3px solid #87CEEB",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          mb: 1,
          position: "relative",
          zIndex: 1,
          padding: "2px",
          background: "linear-gradient(45deg, #87CEEB, #E0F7FA)",
        }}
      >
        <Avatar
          src={getVerifiedImage(profile,loggedInUserRole)}
          alt={profile?.first_name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: 0,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
          {profile?.first_name} {profile?.last_name}
        </Typography>
        <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
          {profile?.age || "N/A"} yrs
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:'center',
            mb: 0.5,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          <FaBriefcase size={14} color="#777" style={{ marginRight: 6 }} />
          <Typography variant="body2" color="text.secondary">
            {profile?.occupation || "Not specified"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
             justifyContent:'center',
            mb: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          <FaMapMarkerAlt size={14} color="#777" style={{ marginRight: 6 }} />
          <Typography variant="body2">
            {[profile?.city, profile?.state, profile?.country]
              .filter(Boolean)
              .join(", ") || "Location not specified"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" justifyContent="space-around" width="100%" my={2}>
          <ProfileInfo label="Height" value={profile?.height || "N/A"} />
          <ProfileInfo label="Religion" value={profile?.religion || "N/A"} />
          <ProfileInfo label="Caste" value={profile?.caste || "N/A"} />
        </Box>

        <Box display="flex" gap={1} mt={2} width="100%">
          <Button
            fullWidth
            variant="outlined"
             
            sx={{
              background: "#fff",
              color: "red",
              fontWeight: "bold",
              borderColor: "red",
              textTransform:"capitalize"
            }}
            onClick={() => handleResponse(senderRefNo, recipientRefNo, false)}
          >
            Reject
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              color: "#fff",
             textTransform:"capitalize"
            }}
            onClick={() => handleResponse(senderRefNo, recipientRefNo, true)}
          >
            Accept
          </Button>
        </Box>
        
      </CardContent>
    </Card>
  );

};

export default InterestCard;
