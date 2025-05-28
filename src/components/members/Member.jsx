import React from 'react';
import { Container, Typography, Box, Paper, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './Members.scss';
import card1 from '../../assets/card1.jpg';
import card2 from '../../assets/card2.jpg';
import card3 from '../../assets/card3.jpg';
import card4 from '../../assets/card4.jpg';
import card5 from '../../assets/card5.jpg';
import card6 from '../../assets/card6.jpg';
import Footer from '../footer/Footer';

const Members = () => {
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');
  const isSmallScreen = useMediaQuery('(min-width:600px)');

  const members = [
    { id: 1, name: 'Shobhit & Renu', date: 'Marriage Date', image: card1 },
    { id: 2, name: 'Soni & Pooja', date: 'Marriage Date', image: card2 },
    { id: 3, name: 'Rishabh & Saumya', date: 'Marriage Date 19, April 2024', image: card3 },
    { id: 4, name: 'Amit & Neha', date: 'Marriage Date', image: card4 },
    { id: 5, name: 'Rahul & Priya', date: 'Marriage Date', image: card5 },
    { id: 6, name: 'Arjun & Meera', date: 'Marriage Date', image: card6 },
  ];

  const getSlidesPerView = () => {
    if (isLargeScreen) return 3;
    if (isMediumScreen) return 2;
    if (isSmallScreen) return 1.5;
    return 1;
  };

  return (
    <>
      <Container 
        sx={{ 
          textAlign: 'center', 
          marginTop: { xs: 3, sm: 5 },
          marginBottom: { xs: 5, sm: 10 },
          px: { xs: 2, sm: 3 }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#606c88', 
            fontWeight: 'bold',  
            fontFamily: "Outfit, sans-serif",
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          LAKHS OF HAPPY COUPLES
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            marginBottom: 4,
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontFamily: "Outfit, sans-serif"
          }}
        >
          Matched by <span style={{ color: '#e53935', fontFamily: "Outfit, sans-serif" }}>GIRIJAKALYANA</span>
        </Typography>

        <Box sx={{ px: { xs: 0, sm: 2 } }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={getSlidesPerView()}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={1000}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop
          >
            {members.map((member) => (
              <SwiperSlide key={member.id}>
                <Box 
                  className="member-card" 
                  sx={{
                    fontFamily: "Outfit, sans-serif",
                    px: { xs: 1, sm: 0 },
                    pb: 2
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />
                    <Box 
                      className="member-details"
                      sx={{
                        p: 2,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontFamily: "Outfit, sans-serif",
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontFamily: "Outfit, sans-serif",
                          color: 'black',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' }
                        }}
                      >
                        {member.date}
                      </Typography>
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