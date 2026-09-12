import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Paper,
  MenuItem,
} from "@mui/material";
import rawJsonData from "../profile/eduction/jsondata/data.json";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TokenService from "../../token/tokenService";
import { useGetMemberDetails, useUpdateProfile } from "../../api/User";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { calculateAge } from "../../../utils/common";
import { LoadingComponent } from "../../../App";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const getOptions = (key) => rawJsonData.find(item => item[key])?.[key] || [];

const casteOptions = getOptions("casteValues");
const qualificationOptions = getOptions("qualificationValues");
const heightOptions = getOptions("heightValues");
const maritalOptions = getOptions("marritalStatus");
const sunsignOptions = getOptions("sunsignStatus");
const bloodgroupOptions = getOptions("bloodGroupStatus");
const countryOptions = getOptions("countries");
const ageOptions = getOptions("minAge");

// Fields we consider crucial for a "complete" profile (omitting registration/system fields)
const REQUIRED_FIELDS = [
  { name: 'height', label: 'Height', type: 'select', options: heightOptions },
  { name: 'pincode', label: 'Pincode', type: 'text' },
  { name: 'gotra', label: 'Gotra', type: 'text' },
  { name: 'rashi', label: 'Rashi', type: 'text' },
  { name: 'nakshatra', label: 'Nakshatra', type: 'text' },
  { name: 'subcaste', label: 'Subcaste', type: 'text' },
  { name: 'bloodgroup', label: 'Blood Group', type: 'select', options: bloodgroupOptions },
  { name: 'skin_type', label: 'Skin Type', type: 'select', options: ["Fair", "Very Fair", "Wheatish", "Dark"] },
  { name: 'body_type', label: 'Body Type', type: 'select', options: ["Slim", "Average", "Athletic", "Heavy"] },
  { name: 'diet', label: 'Diet', type: 'select', options: ["Veg", "Non-Veg", "Occasionally Non-Veg", "Eggetarian", "Jain"] },
  { name: 'drink', label: 'Drink', type: 'select', options: ["No", "Yes", "Occasionally"] },
  { name: 'smoke', label: 'Smoke', type: 'select', options: ["No", "Yes", "Occasionally"] },
  { name: 'sunsign', label: 'Sun Sign', type: 'select', options: sunsignOptions },
  { name: 'brother_younger_unmarried', label: 'Younger Brother (Unmarried)', type: 'number' },
  { name: 'brother_younger_married', label: 'Younger Brother (Married)', type: 'number' },
  { name: 'brother_elder_unmarried', label: 'Elder Brother (Unmarried)', type: 'number' },
  { name: 'brother_elder_married', label: 'Elder Brother (Married)', type: 'number' },
  { name: 'sister_younger_unmarried', label: 'Younger Sister (Unmarried)', type: 'number' },
  { name: 'sister_younger_married', label: 'Younger Sister (Married)', type: 'number' },
  { name: 'sister_elder_unmarried', label: 'Elder Sister (Unmarried)', type: 'number' },
  { name: 'sister_elder_married', label: 'Elder Sister (Married)', type: 'number' },
  { name: 'from_age_preference', label: 'From Age Preference', type: 'select', options: ageOptions },
  { name: 'to_age_preference', label: 'To Age Preference', type: 'select', options: ageOptions },
  { name: 'from_height_preference', label: 'From Height Preference', type: 'select', options: heightOptions },
  { name: 'to_height_preference', label: 'To Height Preference', type: 'select', options: heightOptions },
  { name: 'education_preference', label: 'Education Preference', type: 'select', options: qualificationOptions },
  { name: 'caste_preference', label: 'Caste Preference', type: 'select', options: casteOptions },
  { name: 'maritalstatus_preference', label: 'Marital Status Preference', type: 'select', options: maritalOptions },
  { name: 'occupation_country_preference', label: 'Occupation Country Preference', type: 'select', options: countryOptions },
  { name: 'contactinfo', label: 'Alternative Contact Info', type: 'text', multiline: true, rows: 2 },
  { name: 'any_other_info', label: 'Any Other Info', type: 'text', multiline: true, rows: 3 },
];

const CompleteProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const registerNo = TokenService.getRegistrationNo();
  const role = TokenService.getRole()?.toString().toLowerCase();

  const { data: userProfile, isLoading, isError, error } = useGetMemberDetails(registerNo);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorFields, setErrorFields] = useState([]);
  const FIELDS_PER_STEP = 5;

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  const autoUpdateTriggered = useRef(false);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.otherInfo === 'Complete' || userProfile.otherInfo === 'Completed') {
        navigateToDashboard();
      } else {
        const missing = REQUIRED_FIELDS.filter(
          field => userProfile[field.name] === undefined || userProfile[field.name] === null || String(userProfile[field.name]).trim() === ""
        );
        setMissingFields(missing);
        setFormData({
          ...userProfile,
          date_of_birth: userProfile.date_of_birth?.split('T')[0] || "",
        });
      }
    }
  }, [userProfile]);

  const navigateToDashboard = () => {
    if (role === "promoter") {
      navigate("/PromotAdmin");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/userDashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalSteps = Math.ceil(missingFields.length / FIELDS_PER_STEP);
  const currentFields = missingFields.slice(currentStep * FIELDS_PER_STEP, (currentStep + 1) * FIELDS_PER_STEP);

  const validateCurrentFields = () => {
    const stillMissing = currentFields.filter(f => formData[f.name] === undefined || formData[f.name] === null || String(formData[f.name]).trim() === "");
    if (stillMissing.length > 0) {
      setErrorFields(stillMissing.map(f => f.name));
      toast.error(`Please fill out: ${stillMissing.map(f => f.label).join(", ")}`);
      return false;
    }
    setErrorFields([]);
    return true;
  };

  const handleNext = () => {
    if (validateCurrentFields()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSave = () => {
    if (!validateCurrentFields()) return;

    const submissionData = {
      ...formData,
      otherInfo: "Complete"
    };

    updateProfile(submissionData, {
      onSuccess: () => {
        toast.success("Profile Completed Successfully!");
        navigateToDashboard();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to update profile");
      }
    });
  };

  if (isLoading) return <LoadingComponent />;

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(-45deg, #0B192C, #1A365D, #2C3E50, #0B192C)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
      },
      padding: { xs: 2, md: 4 }
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: '700px' }}
      >
        <Paper elevation={24} sx={{
          p: { xs: 2, sm: 3, md: 5 },
          borderRadius: { xs: '40px 0 40px 0', md: '60px 0 60px 0' },
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05)',
        }}>
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h3" 
                fontWeight={900} 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  background: "linear-gradient(to right, #D4AF37, #FFF5D1, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: '200% auto',
                  animation: "shine 3s linear infinite",
                  '@keyframes shine': {
                    'to': { backgroundPosition: '200% center' }
                  }
                }}
              >
                Complete Your Profile
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                You're almost there! Please provide a few more details to help us find the perfect match for you.
              </Typography>
              {missingFields.length > 0 && (
                <Typography variant="subtitle1" sx={{ color: '#D4AF37', mt: 1, fontWeight: 'bold' }}>
                  Step {currentStep + 1} of {totalSteps}
                </Typography>
              )}
            </Box>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 2, sm: 3 }, mb: 4, maxHeight: { xs: '55vh', md: '60vh' }, overflowY: 'auto', p: 1 }}>
            {currentFields.map((field) => (
              <motion.div key={field.name} variants={itemVariants} style={{ gridColumn: field.multiline ? 'span 2' : 'auto' }}>
                  <TextField
                    select={field.type === 'select'}
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type !== 'select' ? field.type : undefined}
                    multiline={field.multiline}
                    rows={field.rows}
                    value={formData[field.name] || ''}
                    onChange={(e) => {
                      handleChange(e);
                      if (errorFields.includes(field.name)) {
                        setErrorFields(prev => prev.filter(f => f !== field.name));
                      }
                    }}
                    required
                    error={errorFields.includes(field.name)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px 0 20px 0",
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#fff",
                        transition: "all 0.3s ease",
                        "& .MuiOutlinedInput-input": {
                          padding: "16px 20px",
                        },
                        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                        "&:hover fieldset": { 
                          borderColor: "#D4AF37", 
                          boxShadow: "0 0 10px rgba(212, 175, 55, 0.2)" 
                        },
                        "&.Mui-focused fieldset": { 
                          borderColor: "#D4AF37", 
                          borderWidth: "2px", 
                          boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" 
                        },
                        "&.Mui-error fieldset": {
                          borderColor: "#f44336 !important",
                        },
                        "&.Mui-error:hover fieldset": {
                          boxShadow: "0 0 10px rgba(244, 67, 54, 0.2) !important",
                        },
                        "&.Mui-error.Mui-focused fieldset": {
                          boxShadow: "0 0 20px rgba(244, 67, 54, 0.5) !important",
                        }
                      },
                      "& .MuiSelect-icon": { color: "rgba(255,255,255,0.7)" },
                      "& label": { color: "rgba(255, 255, 255, 0.6)" },
                      "& label.Mui-focused": { color: "#D4AF37", fontWeight: 'bold' },
                      "& label.Mui-error": { color: "#f44336 !important" },
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #0B192C inset !important",
                        WebkitTextFillColor: "#fff",
                      }
                    }}
                  >
                    {field.type === 'select' && field.options?.map((opt, i) => (
                      <MenuItem key={i} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
              </motion.div>
            ))}
          </Box>

          <motion.div variants={itemVariants}>
            <Stack direction="row" spacing={2} justifyContent="space-between" mt={3}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === 0 || isUpdating}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: "20px 0 20px 0",
                  color: "#D4AF37",
                  borderColor: "#D4AF37",
                  "&:hover": {
                    borderColor: "#FFDF73",
                    color: "#FFDF73",
                    background: "rgba(212, 175, 55, 0.1)",
                  },
                  display: currentStep === 0 ? 'none' : 'block'
                }}
              >
                Back
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  fullWidth={currentStep === 0}
                  sx={{
                    py: 1.5,
                    px: { xs: 4, sm: 8 },
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: "20px 0 20px 0",
                    background: "linear-gradient(45deg, #D4AF37 30%, #FFDF73 90%)",
                    color: "#0B192C",
                    boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #FFDF73 30%, #D4AF37 90%)",
                      transform: "translateY(-2px)",
                    },
                    ml: currentStep === 0 ? '0 !important' : undefined
                  }}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={isUpdating}
                  fullWidth={currentStep === 0}
                  sx={{
                    py: 1.5,
                    px: { xs: 2, sm: 4 },
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    borderRadius: "20px 0 20px 0",
                    background: "linear-gradient(45deg, #D4AF37 30%, #FFDF73 90%)",
                    color: "#0B192C",
                    boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #FFDF73 30%, #D4AF37 90%)",
                      transform: "translateY(-2px)",
                    },
                    ml: currentStep === 0 ? '0 !important' : undefined
                  }}
                >
                  {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Complete Profile & Continue'}
                </Button>
              )}
            </Stack>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default CompleteProfile;
