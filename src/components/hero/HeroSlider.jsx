import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wall1 from '../../assets/wallpaper/wall1.jpg';
import card4 from '../../assets/card4.jpg';
import wall2 from '../../assets/wallpaper/wall2.jpg';
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.scss";
import useAuth from "../hook/UseAuth";
import TokenService from "../token/tokenService";
import ThemedButton from "../UI/ThemedButton";

// Defined outside component so React doesn't treat them as new types every render
const HeroWrapper = styled(Box)({
  position: "relative",
  textAlign: "center",
  color: "#fff",
  height: "100vh",
  overflow: "hidden",
});

const SlideImage = styled(Box)({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
  objectPosition: "center",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 1,
});

const Content = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  textAlign: "center",
  width: "90%",
  maxWidth: "600px",
  padding: { xs: theme.spacing(3, 2), md: theme.spacing(5, 6) },
  background: "rgba(11, 25, 44, 0.6)", // Navy background
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
}));

const HeroSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const isAdmin = TokenService.getRole()?.toLowerCase() === 'admin'
  const { isLoggedIn } = useAuth();

  const images = [
    { src: wall1, alt: "Happy Couple 1" },
    { src: card4, alt: "Happy Couple 2" },
    { src: wall2, alt: "Happy Couple 3" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: !isMobile,
    adaptiveHeight: true,
  };


  return (
    <Box className="hero-main-container">
      <HeroWrapper>
        <Navbar />
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box key={index}>
              <SlideImage
                component="img"
                src={image.src}
                alt={image.alt}
              />
            </Box>
          ))}
        </Slider>
        <Overlay />
        <Content>
          <Typography
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
            component="h1"
            fontWeight={800}
            gutterBottom
            fontFamily={'Outfit, sans-serif'}
            sx={{
              color: '#fff',
              mb: isMobile ? 1.5 : 2,
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
              lineHeight: 1.2,
              letterSpacing: '-1px'
            }}
          >
            Find Your <span style={{ color: '#D4AF37' }}>Perfect Match</span>
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            fontWeight={400}
            paragraph
            fontFamily={'Outfit, sans-serif'}
            sx={{
              color: '#cbd5e1',
              mb: isMobile ? 3 : 4,
              fontSize: isMobile ? '1.05rem' : '1.15rem',
              lineHeight: 1.6,
            }}
          >
            Join the most trusted premium platform and start your elegant journey towards a lifetime of happiness.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? 1 : 2,
              flexWrap: 'nowrap',
              mt: isMobile ? 1 : 2,
              mb: isMobile ? 1 : 2,
            }}
          >
            {isLoggedIn ? (
              <ThemedButton
                title="Get Started"
                size={isMobile ? "small" : "large"}
                sx={{
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1.5 : 2,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontFamily: 'Outfit, sans-serif',
                  minWidth: isMobile ? '160px' : '200px',
                  borderRadius: "50px", // Pill shape
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFB200 100%)',
                  color: '#0B192C',
                  fontWeight: 700,
                  boxShadow: '0 8px 16px rgba(212, 175, 55, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(212, 175, 55, 0.4)',
                  }
                }}
                onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/user/userDashboard')}
              />
            ) : (
              <>
                <ThemedButton
                  title="Free Register"
                  size={isMobile ? "small" : "large"}
                  sx={{
                    px: isMobile ? 3 : 4,
                    py: isMobile ? 1.5 : 2,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontFamily: 'Outfit, sans-serif',
                    minWidth: isMobile ? '140px' : '180px',
                    borderRadius: "50px",
                    background: 'linear-gradient(135deg, #D4AF37 0%, #FFB200 100%)',
                    color: '#0B192C',
                    fontWeight: 700,
                    boxShadow: '0 8px 16px rgba(212, 175, 55, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 20px rgba(212, 175, 55, 0.4)',
                    }
                  }}
                  onClick={() => navigate('/register')}
                />

                <ThemedButton
                  title="Premium"
                  size={isMobile ? "small" : "large"}
                  sx={{
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: '#fff',
                      transform: 'translateY(-2px)',
                    },
                    color: '#fff',
                    px: isMobile ? 3 : 4,
                    py: isMobile ? 1.5 : 2,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontFamily: 'Outfit, sans-serif',
                    minWidth: isMobile ? '140px' : '180px',
                    borderRadius: "50px",
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => navigate('/membership')}
                />
              </>
            )}
          </Box>
        </Content>
      </HeroWrapper>
    </Box>
  );
};

export default HeroSlider;