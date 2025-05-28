import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useGetMemberDetails,
  useUpdateProfile
} from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";
import toast from "react-hot-toast";
import rawJsonData from "../eduction/jsondata/data.json";
import { LoadingComponent } from "../../../../App";

// Merge array of JSON objects into one object
const jsonData = rawJsonData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

const Education = () => {
  const registerNo = TokenService.getRegistrationNo();

  const [formData, setFormData] = useState({
    educational_qualification: "",
    occupation: "",
    income_per_month: "",
    occupation_country: ""
  });

  const [showCustomDegree, setShowCustomDegree] = useState(false);
  const [showCustomOccupation, setShowCustomOccupation] = useState(false);
  const [showCustomIncome, setShowCustomIncome] = useState(false);
  const [showCustomCountry, setShowCustomCountry] = useState(false);

  const {
    data: userProfile,
    isLoading,
    isError,
    error
  } = useGetMemberDetails(registerNo);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (userProfile) {
      setFormData({ ...userProfile });
    }
  }, [userProfile]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field, value) => {
    if (value === "Other") {
      switch (field) {
        case "educational_qualification":
          setShowCustomDegree(true);
          handleChange(field, "");
          break;
        case "occupation":
          setShowCustomOccupation(true);
          handleChange(field, "");
          break;
        case "income_per_month":
          setShowCustomIncome(true);
          handleChange(field, "");
          break;
        case "occupation_country":
          setShowCustomCountry(true);
          handleChange(field, "");
          break;
        default:
          break;
      }
    } else {
      handleChange(field, value);
    }
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => toast.success("Profile updated successfully!"),
      onError: () => toast.error("Failed to update profile.")
    });
  };

  const handleClear = () => {
    setFormData({
      educational_qualification: "",
      occupation: "",
      income_per_month: "",
      occupation_country: ""
    });
    setShowCustomDegree(false);
    setShowCustomOccupation(false);
    setShowCustomIncome(false);
    setShowCustomCountry(false);
  };

  const textFieldStyle = {
    width: {
      xs: "310px",
      sm: "500px",
      md: "350px",
      lg: "400px"
    }
  };

  const renderCustomField = (label, field, value, setShowCustom) => (
    <TextField
      label={label}
      value={value}
      onChange={(e) => handleChange(field, e.target.value)}
      sx={{ ...textFieldStyle, mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowCustom(false);
                handleChange(field, "");
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        width: { xs: "100%", sm: "90%", md: "85%", lg: "73%" },
        p: { xs: 1, sm: 4 }
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom sx={{ color: "#34495e",fontWeight:'bold' }}>
          Education & Occupation
        </Typography>
        <form>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: "column", md: "column" }}
              spacing={4}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {/* Column 1 */}
              <Box>
                {showCustomDegree
                  ? renderCustomField(
                      "Qualification",
                      "educational_qualification",
                      formData.educational_qualification,
                      setShowCustomDegree
                    )
                  : (
                    <TextField
                      label="Qualification"
                      value={formData.educational_qualification}
                      onChange={(e) =>
                        handleSelectChange("educational_qualification", e.target.value)
                      }
                      select
                      sx={{ ...textFieldStyle, mb: 2 }}
                    >
                      {(jsonData.qualificationValues || []).map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  )}

                {showCustomOccupation
                  ? renderCustomField(
                      "Occupation",
                      "occupation",
                      formData.occupation,
                      setShowCustomOccupation
                    )
                  : (
                    <TextField
                      label="Occupation"
                      value={formData.occupation}
                      onChange={(e) =>
                        handleSelectChange("occupation", e.target.value)
                      }
                      select
                      sx={textFieldStyle}
                    >
                      {(jsonData.occupationValues || []).map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  )}
              </Box>

              {/* Column 2 */}
              <Box>
                {showCustomIncome
                  ? renderCustomField(
                      "Income Per Month",
                      "income_per_month",
                      formData.income_per_month,
                      setShowCustomIncome
                    )
                  : (
                    <TextField
                      label="Income Per Month"
                      value={formData.income_per_month}
                      onChange={(e) =>
                        handleSelectChange("income_per_month", e.target.value)
                      }
                      select
                      sx={{ ...textFieldStyle, mb: 2 }}
                    >
                      {(jsonData.incomeValues || []).map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  )}

                {showCustomCountry
                  ? renderCustomField(
                      "Occupation Country",
                      "occupation_country",
                      formData.occupation_country,
                      setShowCustomCountry
                    )
                  : (
                    <TextField
                      label="Occupation Country"
                      value={formData.occupation_country}
                      onChange={(e) =>
                        handleSelectChange("occupation_country", e.target.value)
                      }
                      select
                      sx={textFieldStyle}
                    >
                      {(jsonData.countries || []).map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  )}
              </Box>
            </Stack>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: { xs: "row", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" }
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
                  width: { xs: "100%", sm: "auto" }
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
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                {isUpdating ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
      {isLoading && <LoadingComponent />}
    </Box>
  );
};

export default Education;
