import { Box, CircularProgress, Typography } from "@mui/material";

export const isSilverOrPremiumUser = (role = " ") => {
  const normalizedRole = role.toLowerCase();
  return normalizedRole === "silveruser" || normalizedRole === "premiumuser";
};

export const LoadingTextSpinner = () => {
  return (
    <div className="loading-text-spinner-container">
      <div className="inline-premium-spinner"></div>
      <div className="loading-text" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>Loading...</div>
    </div>
  );
};

export const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};
