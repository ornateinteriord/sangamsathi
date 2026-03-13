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
      icon: <FaUserFriends style={{ fontSize: 40, color: '#D4AF37' }} />,
      color: '#f8f9fa',
      textColor: '#D4AF37',

    },
    {
      id: 2,
      title: 'This Week',
      value: `${dashboardstats?.stats?.thisWeekRegistrations || 0}`,
      icon: <FaCalendarWeek style={{ fontSize: 40, color: '#D4AF37' }} />,
      color: '#f8f9fa',
      textColor: '#D4AF37',

    },
    {
      id: 3,
      title: 'This Month',
      value: `${dashboardstats?.stats?.thisMonthRegistrations || 0}`,
      icon: <FaCalendarAlt style={{ fontSize: 40, color: '#D4AF37' }} />,
      color: '#f8f9fa',
      textColor: '#D4AF37',

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
        background: '#F8FAFC',
        py: { xs: 6, md: 8 },
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ fontFamily: "Outfit", position: 'relative', zIndex: 1 }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #0B192C 0%, #1A365D 100%)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(11, 25, 44, 0.15)',
            p: { xs: 4, md: 6 },
            mt: { xs: 4, md: 5 }, // Added margin-top as requested
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden'
          }}>
            {/* Decorative gold accent */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #D4AF37, #FFB200)' }} />

            <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.2 }}>
                  Platform <span style={{ color: '#D4AF37' }}>Impact</span>
                </Typography>
                <Typography sx={{ color: '#94A3B8', mt: 1 }}>Join our growing community</Typography>
              </Grid>

              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={stat.id}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-4px)', background: 'rgba(255,255,255,0.08)' }
                      }}>
                        <Box sx={{
                          width: 60, height: 60, borderRadius: '12px',
                          background: 'rgba(212, 175, 55, 0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#D4AF37'
                        }}>
                          {React.cloneElement(stat.icon, { style: { fontSize: 30, color: '#D4AF37' } })}
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>{stat.value}</Typography>
                          <Typography variant="body2" sx={{ color: '#94A3B8' }}>{stat.title}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff', position: 'relative' }}>
        <Container maxWidth="lg" sx={{ fontFamily: "Outfit", textAlign: 'center' }}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography variant="subtitle1" sx={{ color: '#D4AF37', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', mb: 1 }}>
              Simple 3-Step Process
            </Typography>
            <Typography variant="h3" sx={{
              color: '#0F172A',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              '& span': { color: '#0B192C' }
            }}>
              Find your <span>Special Someone</span>
            </Typography>
            <Box sx={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #D4AF37, #FFB200)', mx: 'auto', mt: 3, borderRadius: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 2 }, position: 'relative' }}>
            {/* Connecting lines for desktop */}
            <Box sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '80px',
              left: '15%',
              right: '15%',
              height: '3px',
              background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.1))',
              zIndex: 0
            }} />

            {features.map((feature, index) => (
              <Box key={feature.id} sx={{ flex: 1, position: 'relative', zIndex: 1, width: '100%' }}>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  transition: 'transform 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    '& .feature-icon': {
                      boxShadow: '0 20px 40px rgba(11, 25, 44, 0.15)',
                      transform: 'scale(1.1)',
                      borderColor: '#D4AF37'
                    }
                  }
                }}>
                  <Paper
                    className="feature-icon"
                    elevation={0}
                    sx={{
                      p: 4, borderRadius: '50%',
                      background: '#fff',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      width: 140, height: 140, mx: 'auto', mb: 4,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: '4px solid #F8FAFC',
                      position: 'relative'
                    }}
                  >
                    {/* Step Number Badge */}
                    <Box sx={{
                      position: 'absolute', top: 0, right: 0,
                      width: 36, height: 36, borderRadius: '50%',
                      background: '#0B192C', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1.2rem',
                      boxShadow: '0 4px 10px rgba(11, 25, 44, 0.3)'
                    }}>
                      {feature.id}
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      '& svg': { fontSize: '3.5rem !important', color: '#0B192C !important' },
                      background: 'rgba(212, 175, 55, 0.1)',
                      p: 2,
                      borderRadius: '50%'
                    }}>
                      {feature.icon}
                    </Box>
                  </Paper>

                  <Box sx={{ px: { xs: 2, md: 4 }, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#0F172A', fontWeight: 800, mb: 2, fontSize: '1.75rem' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.6, fontSize: '1.1rem' }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Connect;