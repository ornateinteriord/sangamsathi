import React from 'react';
import { Container, Typography, Grid, Box, Paper, Badge } from '@mui/material';
import { FaUserEdit, FaUsers, FaComments } from 'react-icons/fa';
import Members from '../members/Member';

const Connect=()=> {
  const features = [
    {
      id: 1,
      title: 'Sign Up',
      description: 'Register for free & put up your Matrimony Profile',
      icon: <FaUserEdit style={{ fontSize: 50, color: '#fff' }} />,
    },
    {
      id: 2,
      title: 'Connect',
      description: 'Select & Connect with Matches you like',
      icon: <FaUsers style={{ fontSize: 50, color: '#fff' }} />,
    },
    {
      id: 3,
      title: 'Interact',
      description: 'Become a Premium Member & Start a Conversation',
      icon: <FaComments style={{ fontSize: 50, color: '#fff' }} />,
    },
  ];

  return (
    <>
    <Container sx={{ textAlign: 'center', marginTop: 5,fontFamily: "Outfit",  }}>
      <Typography variant="h4" sx={{ marginBottom: 4, color: '#ff5a5f',fontFamily: "Outfit sans-serif" }}>
        Find your Special Someone
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={4} key={feature.id}>
            <Badge
              badgeContent={feature.id}
              color="error"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  height: '24px',
                  minWidth: '24px',
                  borderRadius: '50%',
                  top: 10,
                  right: 10,
                  backgroundColor: '#fff',
                  color: '#ff5a5f',
                  border: '2px solid #00bcd4',
                },
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  borderRadius: '50%',
                  backgroundColor: 'rgb(192, 9, 88)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 90,
                  height: 90,
                  margin: '0 auto',
                }}
              >
                {feature.icon}
              </Paper>
            </Badge>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" sx={{ color: '#00bcd4',fontFamily: "Outfit sans-serif", }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#777',fontFamily: "Outfit sans-serif", }}>
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
   
    </>
  );
}

export default Connect;
