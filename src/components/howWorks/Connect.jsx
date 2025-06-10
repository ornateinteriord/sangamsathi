import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Badge,
  Card,
  CardContent
} from '@mui/material';
import {
  FaUserEdit,
  FaUsers,
  FaComments,
  FaUserFriends,
  FaCalendarWeek,
  FaCalendarAlt
} from 'react-icons/fa';
import { useGetDashboardStats } from '../api/Auth';

const Connect = () => {
  const { data: dashboardstats } = useGetDashboardStats();

  const stats = [
    {
      id: 1,
      title: 'Total Profiles',
      value: `${dashboardstats?.stats?.totalProfiles || 0} +`,
      icon: <FaUserFriends style={{ fontSize: 40, color: '#6a1b9a' }} />,
      bgColor: '#ede7f6',
      textColor: '#6a1b9a'
    },
    {
      id: 2,
      title: 'This Week Registrations',
      value: `${dashboardstats?.stats?.thisWeekRegistrations || 0} +`,
      icon: <FaCalendarWeek style={{ fontSize: 40, color: '#00796b' }} />,
      bgColor: '#e0f2f1',
      textColor: '#00796b'
    },
    {
      id: 3,
      title: 'This Month Registrations',
      value: `${dashboardstats?.stats?.thisMonthRegistrations || 0} +`,
      icon: <FaCalendarAlt style={{ fontSize: 40, color: '#c62828' }} />,
      bgColor: '#ffebee',
      textColor: '#c62828'
    }
  ];

  const features = [
    {
      id: 1,
      title: 'Register',
      description: 'Create your profile for free and begin your journey.',
      icon: <FaUserEdit style={{ fontSize: 50, color: '#fff' }} />
    },
    {
      id: 2,
      title: 'Connect',
      description: 'Reach out to like-minded individuals and build connections.',
      icon: <FaUsers style={{ fontSize: 50, color: '#fff' }} />
    },
    {
      id: 3,
      title: 'Communicate',
      description: 'Start meaningful conversations and explore possibilities.',
      icon: <FaComments style={{ fontSize: 50, color: '#fff' }} />
    }
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 6, fontFamily: 'Outfit' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              color: '#4a148c',
              fontWeight: 600,
              mb: 4
            }}
          >
            Platform Overview
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={4} key={stat.id}>
                <Card
                  sx={{
                    backgroundColor: stat.bgColor,
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    p: '20px 40px',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: `${stat.textColor}22`
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: stat.textColor, fontWeight: 600, mb: 1 }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: stat.textColor, fontWeight: 700 }}
                  >
                    {stat.value}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Container sx={{ textAlign: 'center', my: 6 }}>
        <Typography
          variant="h4"
          sx={{ color: '#00796b', fontWeight: 600, mb: 4 }}
        >
          Your Journey Begins Here
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature) => (
            <Grid item xs={12} sm={4} key={feature.id}>
              <Badge
                badgeContent={feature.id}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#fff',
                    color: '#00796b',
                    fontWeight: 700,
                    border: '2px solid #4db6ac'
                  }
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    backgroundColor: '#4a148c',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    margin: '0 auto'
                  }}
                >
                  {feature.icon}
                </Paper>
              </Badge>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: '#4a148c', fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#555', mt: 1 }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Connect;