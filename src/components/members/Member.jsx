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
        <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8 } }}>
          <Typography variant="subtitle1" sx={{ color: '#D4AF37', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', mb: 1 }}>
            New Members
          </Typography>
          <Typography variant="h3" sx={{
            color: '#0F172A',
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            '& span': { color: '#0B192C' }
          }}>
            Recent <span>Registers</span>
          </Typography>
          <Box sx={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #D4AF37, #FFB200)', mx: 'auto', mt: 3, borderRadius: 2 }} />
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
                      background: '#0B192C',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      border: 'none',
                      height: '100%',
                      minHeight: '460px', // Taller for full-bleed feel
                      boxShadow: '0 15px 35px rgba(11, 25, 44, 0.15)',
                    }}
                  >
                    {/* Full Bleed Avatar / Background */}
                    <Box sx={{
                      width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
                      background: 'linear-gradient(135deg, #1A365D, #0B192C)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.1)', fontSize: '8rem', fontWeight: 'bold'
                    }}>
                      {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                    </Box>

                    {/* Gradient Overlay for Text Readability */}
                    <Box sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%',
                      background: 'linear-gradient(to top, rgba(11,25,44,1) 0%, rgba(11,25,44,0.8) 50%, rgba(11,25,44,0) 100%)',
                      zIndex: 1
                    }} />

                    {/* Registration Tag */}
                    <Typography sx={{
                      position: 'absolute', top: 16, right: 16, zIndex: 2,
                      color: '#0B192C', fontSize: '0.75rem',
                      fontWeight: 700, letterSpacing: '1px',
                      background: 'linear-gradient(135deg, #D4AF37, #FFB200)',
                      px: 2, py: 0.5, borderRadius: '50px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      #{member.registration_no}
                    </Typography>

                    {/* Profile Info Overlay */}
                    <Box sx={{
                      p: 3, pb: 4, display: 'flex', flexDirection: 'column',
                      flex: 1, justifyContent: 'flex-end', textAlign: 'left',
                      position: 'relative', zIndex: 2
                    }}>
                      <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 1, fontSize: '1.8rem' }}>
                        {member.name || 'Unknown'}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, alignItems: 'center' }}>
                        <Typography variant="body2" sx={{
                          color: '#D4AF37', fontWeight: 600, px: 2, py: 0.5,
                          background: 'rgba(212,175,55,0.15)', borderRadius: '20px', fontSize: '0.85rem',
                          border: '1px solid rgba(212,175,55,0.3)'
                        }}>
                          {member.age || 'N/A'} yrs
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>•</Typography>
                        <Typography variant="body2" sx={{ color: '#E2E8F0', fontSize: '0.95rem', fontWeight: 500 }}>
                          {member.city || 'Location N/A'}
                        </Typography>
                      </Box>

                      {/* Details Grid */}
                      <Box sx={{
                        width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr',
                        gap: 2, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', p: 2,
                        border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)'
                      }}>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ color: '#94A3B8', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Caste
                          </Typography>
                          <Typography sx={{ color: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600 }}>
                            {member.caste || 'N/A'}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left' }}>
                          <Typography sx={{ color: '#94A3B8', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Education
                          </Typography>
                          <Typography sx={{ color: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {member.educational_qualification || 'N/A'}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left', gridColumn: 'span 2' }}>
                          <Typography sx={{ color: '#94A3B8', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Occupation
                          </Typography>
                          <Typography sx={{ color: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600 }}>
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