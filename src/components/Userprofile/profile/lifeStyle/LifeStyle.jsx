import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";
import { LoadingComponent } from "../../../../App";
import { toast } from "react-toastify";

const LifeStyle = () => {
  const registerNo = TokenService.getRegistrationNo();
  const [formData, setFormData] = useState({
    drink: "",
    smoke: "",
    diet: "",
    sunsign: "",
    bloodgroup: "",
    body_type: "", 
    skin_type: ""  
  });

  const { 
    data: userProfile, 
    isLoading, 
    isError,
    error 
  } = useGetMemberDetails(registerNo);

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
      if (userProfile) {
        setFormData({
          ...userProfile,
        });
      }
    }, [userProfile]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData, {
    });
  };

  const handleClear = () => {
    setFormData({
      drink: "",
      smoke: "",
      diet: "",
      sunsign: "",
      bloodgroup: "",
      body_type: "",
      skin_type: ""
    });
  };

  useEffect(() => {
     if (isError) {
       toast.error(error.message);
     }
   }, [isError, error]);

   const textFieldStyle = {
    width: {
      xs: "310px",
      sm: "100%",
      md: "350px",
      lg: "400px"
    }
  };

  return (
    <Box sx={{ fontFamily: "Outfit, sans-serif", padding: 1, width: "92%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{fontSize:{ xs:'23px',}}} color="#34495e" fontWeight={700}>
          Life Style & Appearance
        </Typography>
      </Box>

      <Box  sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)'
          },
          gap: 2
        }}>
        {/* Drink */}
        <TextField
          select
          name="drink"
          label="Drink"
          fullWidth
          value={formData.drink}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Occasionally">Occasionally</MenuItem>
        </TextField>

        {/* Smoke */}
        <TextField
          select
          name="smoke"
          label="Smoke"
          fullWidth
          value={formData.smoke}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Occasionally">Occasionally</MenuItem>
        </TextField>

        {/* Diet */}
        <TextField
          select
          name="diet"
          label="Diet"
          fullWidth
          value={formData.diet}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Veg">Veg</MenuItem>
          <MenuItem value="Non-Veg">Non-Veg</MenuItem>
          <MenuItem value="Eggetarian">Eggetarian</MenuItem>
        </TextField>

        {/* Sunsign */}
        <TextField
          select
          name="sunsign"
          label="Sunsign"
          fullWidth
          value={formData.sunsign}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Aries">Aries</MenuItem>
          <MenuItem value="Taurus">Taurus</MenuItem>
          <MenuItem value="Gemini">Gemini</MenuItem>
          <MenuItem value="Cancer">Cancer</MenuItem>
        </TextField>

        {/* Blood Group */}
        <TextField
          select
          name="bloodgroup"
          label="Blood Group"
          fullWidth
          value={formData.bloodgroup}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
        </TextField>

        {/* Body Type */}
        <TextField
          select
          name="body_type"
          label="Body Type"
          fullWidth
          value={formData.body_type}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Slim">Slim</MenuItem>
          <MenuItem value="Athletic">Athletic</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
        </TextField>

        {/* Skin Type */}
        <TextField
          select
          name="skin_type"
          label="Skin Type"
          fullWidth
          value={formData.skin_type}
          onChange={handleChange}
          sx={{...textFieldStyle}}
        >
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Wheatish">Wheatish</MenuItem>
          <MenuItem value="Dark">Dark</MenuItem>
        </TextField>
      </Box>
     
      <Box
      mt={1}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      flexDirection: { xs: "row", sm: "row" },
                      alignItems: { xs: "center", sm: "center" },
                      justifySelf: {sm:'end',md:'end'}
                    }}
                  >
                    <Button
                      onClick={handleClear}
                      variant="outlined"
                      sx={{
                        color: "black",
                        backgroundColor: "#fff",
                        textTransform: "capitalize",
                        "&:hover": { backgroundColor: "#fff" },
                        width: { xs: "100%", sm: "130px" }
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      disabled={isUpdating}
                      sx={{
                        backgroundColor: "#34495e",
                        textTransform: "capitalize",
                        "&:hover": { backgroundColor: "#2c3e50" },
                        width: { xs: "100%", sm: "130px" }
                      }}
                    >
                      {isUpdating ? <CircularProgress size={24} /> : "Save"}
                    </Button>
                  </Box>
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default LifeStyle;