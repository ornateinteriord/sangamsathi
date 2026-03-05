import React from 'react';
import { Container, Typography, Grid, Box, Paper, Badge, Card, CardContent } from '@mui/material';
import { FaUserEdit, FaUsers, FaComments, FaUserFriends, FaCalendarWeek, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';
import { useGetDashboardStats } from '../api/Auth';

const Connect = () => {
  const { data: dashboardstats } = useGetDashboardStats();

  const stats = [
    {
      id: 1,
      title: 'Profiles',
      value: `${dashboardstats?.stats?.totalProfiles || 0}`,
      icon: <FaUserFriends style={{ fontSize: 40, color: '#5e0476' }} />,
      color: '#f8f9fa',
      textColor: 'rgb(192, 9, 88)',

    },
    {
      id: 2,
      title: 'This Week',
      value: `${dashboardstats?.stats?.thisWeekRegistrations || 0}`,
      icon: <FaCalendarWeek style={{ fontSize: 40, color: '#5e0476' }} />,
      color: '#f8f9fa',
      textColor: '#00bcd4',

    },
    {
      id: 3,
      title: 'This Month',
      value: `${dashboardstats?.stats?.thisMonthRegistrations || 0}`,
      icon: <FaCalendarAlt style={{ fontSize: 40, color: '#5e0476' }} />,
      color: '#f8f9fa',
      textColor: '#ff5a5f',

    },
  ];

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
      <Box sx={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,242,252,0.5) 100%)',
        py: { xs: 4, md: 6 },
        overflow: 'hidden'
      }}>
        {/* Background decorative circles */}
        <Box sx={{
          position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,4,118,0.03) 0%, rgba(255,255,255,0) 70%)', zIndex: 0
        }} />
        <Box sx={{
          position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,4,118,0.04) 0%, rgba(255,255,255,0) 70%)', zIndex: 0
        }} />

        <Container maxWidth="xl" sx={{ fontFamily: "Outfit", position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: "100%", mx: 'auto', px: { xs: 2, sm: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Typography variant="h6" sx={{ color: '#c774e8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', mb: 1, fontSize: '0.85rem' }}>
                Join Our Growing Community
              </Typography>
              <Typography variant="h3" sx={{
                color: '#1a1a1a',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem' },
                '& span': { color: '#5e0476' }
              }}>
                Platform <span>Statistics</span>
              </Typography>
              <Box sx={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #5e0476, #c774e8)', mx: 'auto', mt: 2, borderRadius: 2 }} />
            </Box>

            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={stat.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{
                    width: '100%',
                    maxWidth: 360,
                    height: '100%',
                    minHeight: 240,
                    borderRadius: 4,
                    background: '#fff',
                    boxShadow: '0 10px 40px rgba(94, 4, 118, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(94, 4, 118, 0.05)',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 50px rgba(94, 4, 118, 0.15)',
                      borderColor: 'rgba(94, 4, 118, 0.15)',
                      '& .stat-icon-wrapper': {
                        transform: 'scale(1.1) rotate(5deg)',
                        background: 'linear-gradient(135deg, #5e0476, #8e18ab)',
                        '& svg': { color: '#fff !important' }
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                      background: 'linear-gradient(90deg, #5e0476, #c774e8)',
                      borderRadius: '4px 4px 0 0'
                    }
                  }}>
                    <CardContent sx={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', p: { xs: 4, md: 5 }, position: 'relative'
                    }}>
                      <Box className="stat-icon-wrapper" sx={{
                        width: 80, height: 80, borderRadius: '20px',
                        background: 'rgba(94, 4, 118, 0.04)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 3, transition: 'all 0.3s ease',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.03)'
                      }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h3" sx={{
                        color: "#1a1a1a", fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' },
                        lineHeight: 1.2, mb: 1,
                        background: 'linear-gradient(135deg, #5e0476, #1a1a1a)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#666", fontWeight: 500, fontSize: { xs: '1rem', md: '1.1rem' }, letterSpacing: '0.5px' }}>
                        {stat.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: '#fff', position: 'relative' }}>
        <Container sx={{ textAlign: 'center', fontFamily: "Outfit" }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="h6" sx={{ color: '#c774e8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', mb: 1, fontSize: '0.85rem' }}>
              Simple 3-Step Process
            </Typography>
            <Typography variant="h3" sx={{
              color: '#1a1a1a',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.75rem' },
              '& span': { color: '#5e0476' }
            }}>
              Find your <span>Special Someone</span>
            </Typography>
            <Box sx={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #5e0476, #c774e8)', mx: 'auto', mt: 2, borderRadius: 2 }} />
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" sx={{ position: 'relative' }}>
            {/* Connecting lines for desktop */}
            <Box sx={{
              display: { xs: 'block' },
              position: 'absolute',
              top: { xs: '35px', md: '85px' },
              left: '15%',
              right: '15%',
              height: '2px',
              background: 'dashed 2px rgba(94,4,118,0.2)',
              borderTop: '2px dashed rgba(94,4,118,0.2)',
              zIndex: 0
            }} />

            {features.map((feature, index) => (
              <Grid item xs={4} sm={4} key={feature.id} sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .feature-icon': {
                      boxShadow: '0 20px 40px rgba(94, 4, 118, 0.3)',
                      transform: 'scale(1.05)',
                    }
                  }
                }}>
                  <Badge
                    badgeContent={feature.id}
                    color="primary"
                    overlap="circular"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: { xs: '0.8rem', md: '1.2rem' }, fontWeight: 700,
                        height: { xs: '20px', md: '32px' }, minWidth: { xs: '20px', md: '32px' },
                        borderRadius: '50%', top: { xs: 5, md: 15 }, right: { xs: 5, md: 15 },
                        background: '#fff', color: '#5e0476',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        border: { xs: '2px solid #5e0476', md: '3px solid #5e0476' },
                      },
                    }}
                  >
                    <Paper
                      className="feature-icon"
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, md: 3 }, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #5e0476 0%, #8e18ab 100%)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: { xs: 70, md: 110 }, height: { xs: 70, md: 110 }, mx: 'auto', mb: { xs: 1, md: 3 },
                        boxShadow: '0 12px 30px rgba(94,4,118,0.2)',
                        transition: 'all 0.3s ease',
                        border: { xs: '4px solid rgba(94,4,118,0.05)', md: '8px solid rgba(94,4,118,0.05)' },
                        backgroundClip: 'padding-box',
                      }}
                    >
                      <Box sx={{ display: 'flex', '& svg': { fontSize: { xs: '2rem !important', md: '3rem !important' } } }}>
                        {feature.icon}
                      </Box>
                    </Paper>
                  </Badge>

                  <Box sx={{ mt: { xs: 1, md: 2 }, px: { xs: 0.5, md: 2 }, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 700, mb: { xs: 0.5, md: 1.5 }, fontSize: { xs: '0.9rem', md: '1.5rem' } }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.4, fontSize: { xs: '0.65rem', sm: '0.8rem', md: '1rem' } }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Connect;