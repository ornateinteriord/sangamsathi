import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { calculateAge, isSilverOrPremiumUser } from "../../utils/common";

const UserCard = ({
  profile,
  connection = null,
  onViewMore = () => { },
  onCancelRequest = () => { },
  onRemoveConnection = () => { },
  interestId = null,
  showCancelButton = false,
  onResponse = () => { },
  showResponseButtons = false,
  showRemoveButton = false,
}) => {
  const age = profile?.age || calculateAge(profile?.date_of_birth);
  const isPremium = isSilverOrPremiumUser(profile?.type_of_user || profile?.type_of_use);

  return (
    <Card
      sx={{
        width: { xs: 280, sm: 280, md: 280, lg: 300 },
        height: 420,
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(11,25,44,0.1)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(11,25,44,0.15)",
        },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "#fff",
        border: "1px solid rgba(11,25,44,0.05)",
      }}
    >
      {/* Top 60% Full Bleed Image */}
      <Box sx={{
        width: '100%',
        height: '65%',
        position: 'relative',
        background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
        overflow: 'hidden'
      }}>
        {profile?.image ? (
          <img
            src={profile.image}
            alt={profile?.first_name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '5rem', fontWeight: 800, color: '#94A3B8'
          }}>
            {profile?.first_name?.charAt(0) || '?'}
          </Box>
        )}

        {/* Dark Gradient Overlay for text */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to top, rgba(11,25,44,0.9) 0%, rgba(11,25,44,0) 100%)',
          zIndex: 1
        }} />

        {/* Badges Overlay */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
          {isPremium ? (
            <Chip
              label="★ PREMIUM"
              size="small"
              sx={{
                fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.5px",
                background: "linear-gradient(135deg, #D4AF37, #FFB200)",
                color: "#1E293B", border: "none",
                boxShadow: "0 2px 8px rgba(212,175,55,0.4)", height: 22,
              }}
            />
          ) : <Box />}

          {connection && (
            <Box sx={{
              backgroundColor: connection?.direction === "sent" ? "rgba(255,255,255,0.9)" : "#D4AF37",
              color: connection?.direction === "sent" ? "#0F172A" : "#1E293B",
              borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: "bold", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }} title={connection?.direction === "sent" ? "Request Sent" : "Request Received"}>
              {connection?.direction === "sent" ? "↑" : "↓"}
            </Box>
          )}
        </Box>

        {/* Name & Age Overlay */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#fff", lineHeight: 1.2, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {profile?.first_name} {profile?.last_name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#D4AF37", fontWeight: 700, background: "rgba(212,175,55,0.15)", px: 1.5, py: 0.25, borderRadius: "20px", backdropFilter: 'blur(4px)' }}>
              {age || "N/A"} yrs
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "#cbd5e1" }}>• {profile?.religion || "N/A"}</Typography>
          </Box>
        </Box>
      </Box >

      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          px: 2.5,
          pt: 2.5,
          pb: "16px !important",
        }}
      >
        {/* Minimal Info Strip */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: "auto" }}>
          {/* Occupation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaBriefcase size={12} color="#64748B" />
            </Box>
            <Typography variant="body2" sx={{ color: "#334155", fontSize: "0.85rem", fontWeight: 500 }}>
              {profile?.occupation || "Not specified"}
            </Typography>
          </Box>

          {/* Location */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaMapMarkerAlt size={12} color="#64748B" />
            </Box>
            <Typography variant="body2" sx={{ color: "#334155", fontSize: "0.85rem", fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {[profile?.city, profile?.state, profile?.country].filter(Boolean).join(", ") || "Location not specified"}
            </Typography>
          </Box>
        </Box>

        {/* Floating Action Buttons */}
        <Box
          display="flex"
          justifyContent="center"
          gap={1.5}
          width="100%"
          mt={2}
          flexWrap="wrap"
        >
          {showResponseButtons && (
            <Box sx={{ display: "flex", gap: 1.5, width: "100%", mb: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: "#64748B",
                  borderColor: "#E2E8F0",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "50px",
                  fontSize: "0.85rem",
                  flex: 1,
                  "&:hover": {
                    background: "#F1F5F9",
                    borderColor: "#CBD5E1",
                    color: "#0F172A"
                  },
                }}
                onClick={(e) => { e.stopPropagation(); onResponse(profile?.registration_no, false) }}
              >
                Pass
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #0B192C, #1A365D)",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "50px",
                  fontSize: "0.85rem",
                  flex: 1,
                  boxShadow: "0 4px 12px rgba(11,25,44,0.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1A365D, #0B192C)",
                    boxShadow: "0 6px 16px rgba(11,25,44,0.3)",
                  },
                }}
                onClick={(e) => { e.stopPropagation(); onResponse(profile?.registration_no, true) }}
              >
                Accept
              </Button>
            </Box>
          )}

          {/* View More */}
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => { e.stopPropagation(); onViewMore(profile) }}
            sx={{
              background: showResponseButtons ? "#F1F5F9" : "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
              color: showResponseButtons ? "#0F172A" : "#fff",
              "&:hover": {
                background: showResponseButtons ? "#E2E8F0" : "linear-gradient(135deg, #1A365D 0%, #0B192C 100%)",
                boxShadow: showResponseButtons ? "none" : "0 8px 20px rgba(11,25,44,0.3)",
              },
              fontWeight: 700,
              borderRadius: "50px",
              py: 1,
              textTransform: "none",
              fontSize: "0.9rem",
              boxShadow: showResponseButtons ? "none" : "0 4px 12px rgba(11,25,44,0.2)",
            }}
          >
            View Profile
          </Button>

          {showRemoveButton && (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => onRemoveConnection(interestId)}
              sx={{
                flex: 1,
                borderRadius: "10px",
                py: 0.9,
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                color: "#d32f2f",
                borderColor: "rgba(211,47,47,0.4)",
                "&:hover": {
                  background: "rgba(211,47,47,0.06)",
                  borderColor: "#d32f2f",
                },
              }}
            >
              Remove Connection
            </Button>
          )}

          {showCancelButton && (
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => { e.stopPropagation(); onCancelRequest(interestId) }}
              sx={{
                flex: 1,
                borderRadius: "50px",
                py: 0.9,
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                color: "#64748B",
                borderColor: "#E2E8F0",
                "&:hover": {
                  background: "#F1F5F9",
                  borderColor: "#CBD5E1",
                },
              }}
            >
              Cancel Request
            </Button>
          )}
        </Box>
      </CardContent>
    </Card >
  );
};

export default UserCard;

export const ProfileInfo = ({ label, value }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", px: 0.5 }}>
    <Typography
      variant="caption"
      sx={{ fontWeight: 700, color: "#64748B", fontSize: "0.68rem", letterSpacing: "0.5px", textTransform: "uppercase" }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.85rem" }}>
      {value}
    </Typography>
  </Box>
);
