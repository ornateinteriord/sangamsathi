import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Footer from "../footer/Footer";
import { useGetRecentRegisters } from "../api/Auth";

const Members = () => {
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isMediumScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(min-width:600px)");

  // Destructure properly with loading and error states
  const { data: recentregisters, isLoading, error } = useGetRecentRegisters();

  const getSlidesPerView = () => {
    if (isLargeScreen) return 3;
    if (isMediumScreen) return 2;
    if (isSmallScreen) return 1.5;
    return 1;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container sx={{ mt: 3 }}>
        <Alert severity="error">Error loading recent registers: {error.message}</Alert>
      </Container>
    );
  }

  // Ensure recentregisters is an array before mapping
  const membersData = Array.isArray(recentregisters) ? recentregisters : [];

  // If no data available
  if (membersData.length === 0) {
    return (
      <Container sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h6">No recent registers found.</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          mt: { xs: 3, sm: 5 },
          mb: { xs: 5, sm: 10 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography variant="h6" sx={{ color: '#c774e8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', mb: 1, fontSize: '0.85rem' }}>
            New Members
          </Typography>
          <Typography variant="h3" sx={{
            color: '#1a1a1a',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.75rem' },
            '& span': { color: '#5e0476' }
          }}>
            Recent <span>Registers</span>
          </Typography>
          <Box sx={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #5e0476, #c774e8)', mx: 'auto', mt: 2, borderRadius: 2 }} />
        </Box>

        <Box sx={{ px: { xs: 0, sm: 2 } }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={getSlidesPerView()}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={1000}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-pre",
            }}
            loop
          >
            {membersData.map((member) => (
              <SwiperSlide key={member._id}>
                <Box
                  sx={{
                    px: { xs: 1, sm: 0 },
                    pb: 4,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: '24px',
                      background: '#fff',
                      boxShadow: '0 10px 40px rgba(94, 4, 118, 0.08)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      border: '1px solid rgba(94, 4, 118, 0.05)',
                      height: '100%',
                      minHeight: '420px',
                    }}
                  >
                    {/* Top gradient banner */}
                    <Box sx={{
                      width: '100%',
                      height: '100px',
                      background: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' fill=\'rgba(255,255,255,0.05)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'none\'/%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23p)\'/%3E%3C/svg%3E"), linear-gradient(135deg, #5e0476 0%, #c774e8 100%)',
                      position: 'relative',
                    }}>
                      <Typography sx={{
                        position: 'absolute', top: 12, right: 16,
                        color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem',
                        fontWeight: 600, letterSpacing: '1px',
                        background: 'rgba(0,0,0,0.2)', px: 1.5, py: 0.5, borderRadius: '12px'
                      }}>
                        #{member.registration_no}
                      </Typography>
                    </Box>

                    {/* Avatar Profile */}
                    <Box sx={{ position: 'relative', mt: '-50px', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                      <Box sx={{
                        width: 100, height: 100, borderRadius: '50%',
                        background: '#fff', padding: '4px',
                        boxShadow: '0 8px 24px rgba(94,4,118,0.15)',
                      }}>
                        <Box sx={{
                          width: '100%', height: '100%', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#5e0476', fontSize: '2.5rem', fontWeight: 'bold'
                        }}>
                          {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                        </Box>
                      </Box>
                    </Box>

                    {/* Profile Info */}
                    <Box sx={{ p: 3, pt: 2, display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 800, mb: 0.5, fontSize: '1.4rem' }}>
                        {member.name || 'Unknown'}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                        <Typography variant="body2" sx={{
                          color: '#5e0476', fontWeight: 600, px: 1.5, py: 0.5,
                          background: 'rgba(94,4,118,0.06)', borderRadius: '20px', fontSize: '0.8rem'
                        }}>
                          {member.age || 'N/A'} yrs
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>•</Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>
                          {member.city || 'Location N/A'}
                        </Typography>
                      </Box>

                      {/* Details Grid */}
                      <Box sx={{
                        width: '100%', mt: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr',
                        gap: 2, background: 'rgba(249,242,252,0.5)', borderRadius: '16px', p: 2,
                        border: '1px solid rgba(94,4,118,0.03)'
                      }}>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Caste
                          </Typography>
                          <Typography sx={{ color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600 }}>
                            {member.caste || 'N/A'}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Education
                          </Typography>
                          <Typography sx={{ color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {member.educational_qualification || 'N/A'}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left', gridColumn: 'span 2' }}>
                          <Typography sx={{ color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Occupation
                          </Typography>
                          <Typography sx={{ color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600 }}>
                            {member.occupation || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Members;