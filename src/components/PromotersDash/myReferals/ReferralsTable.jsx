import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { useGetMyUsers } from '../../api/Promoter';
import TokenService from '../../token/tokenService';

const ReferralsTable = ({ statusFilter }) => {
  // We need to get the promoter ID from the token
  // If the backend was just updated, the user might need to log in again to have this in the token.
  // Alternatively, we could fetch it from the token's username if promoter_id is missing, but username might be email.
  const decodedToken = TokenService.decodeToken();
  const promoterId = decodedToken?.promoter_id || decodedToken?.username; // Fallback to username if promoter_id is not in token yet

  const { data, isLoading, error } = useGetMyUsers(promoterId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading users</Typography>
      </Box>
    );
  }

  const users = data?.users || [];

  // Filter users based on the statusFilter passed from the parent tabs
  const filteredUsers = users.filter(user => {
    switch (statusFilter) {
      case 'Pending':
        return user.type_of_user === 'FreeUser' || user.status === 'Pending' || user.status === 'pending';
      case 'Success':
        return user.type_of_user === 'PremiumUser' || user.type_of_user === 'SilverUser';
      case 'Expired':
        // Assuming expiry_date exists and can be compared, or fallback to an explicit status
        // If there is no specific field, we just check status === 'Expired'
        return user.status === 'Expired' || user.status === 'expired';
      case 'inActive':
        return user.status === 'inactive' || user.status === 'inActive';
      case 'TeamUsers':
        // Not entirely sure what defines a Team User, assuming maybe a specific profile type or just all users for now
        return true; 
      default:
        return true;
    }
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#4a148c', fontWeight: 'bold' }}>
        {statusFilter} Referrals ({filteredUsers.length})
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table 
          size="small" 
          sx={{ 
            minWidth: 650, 
            '& .MuiTableCell-root': { padding: '8px 12px' } 
          }} 
          aria-label="referrals table"
        >
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Registration No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>User Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.registration_no}
                  </TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.gender || 'N/A'}</TableCell>
                  <TableCell>{user.age || 'N/A'}</TableCell>
                  <TableCell>{user.city || 'N/A'}</TableCell>
                  <TableCell>{user.email_id}</TableCell>
                  <TableCell>{user.mobile_no}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.type_of_user} 
                      size="small" 
                      color={user.type_of_user === 'PremiumUser' ? 'success' : user.type_of_user === 'SilverUser' ? 'info' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status || 'N/A'} 
                      size="small" 
                      color={user.status === 'active' || user.status === 'Active' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{user.registration_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No {statusFilter.toLowerCase()} referrals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReferralsTable;
