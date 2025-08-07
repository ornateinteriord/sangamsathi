import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        color: '#5e0476'
      }}
    >
      <Box sx={{ maxWidth: '600px' }}>
        <Typography 
          variant="h1"
          sx={{ 
            fontSize: '4rem', 
            fontWeight: 700,
            mb: 2,
            color: '#5e0476'
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h2"
          sx={{ 
            fontSize: '1.8rem',
            fontWeight: 600,
            mb: 2,
            color: '#5e0476'
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: '1.1rem',
            color: '#000',
            mb: 3,
            lineHeight: 1.5
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          <br />
          Please check the URL or use the buttons below to navigate.
        </Typography>
        
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
                textTransform:'capitalize',
              backgroundColor: '#5e0476',
              '&:hover': { backgroundColor: 'rgba(93, 32, 110, 1)' },
              px: 3,
              py: 1
            }}
          >
            Return to Home
          </Button>
          
          <Button 
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
                  textTransform:'capitalize',
              color: '#5e0476',
              borderColor: '#5e0476',
              '&:hover': { 
                backgroundColor: '#5e0476',
                color: 'white'
              },
              px: 3,
              py: 1
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotFoundPage;