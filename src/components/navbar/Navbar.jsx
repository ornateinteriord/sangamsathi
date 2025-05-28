import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation, useResetpassword, useSignupMutation } from "../api/Auth";
import useAuth from "../hook/UseAuth";
import TokenService from "../token/tokenService";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({});
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { openDialog } = location.state || {};

  const { mutate: login, isPending: isLoginPending } = useLoginMutation();
  const { mutate: resetPassword, isPending: isResettingPassword } = useResetpassword();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error("Both username and password are required");
      return;
    }
    login(loginData);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (openDialog) {
      setOpen(true);
    }
  }, []);

  const handleToggleForm = () => setIsRegister((prev) => !prev);

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
    setOtpSent(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotPasswordError("");
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
    setOtpSent(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotPasswordError("");
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Service", path: "/service" },
    { text: "About Us", path: "/about" },
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Contact Us", path: "/contact" },
  ];

  const handleLogout = () => {
    navigate("/");
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
  };

  const SignupMutation = useSignupMutation();
  const { mutate, isPending } = SignupMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      mutate(registerData, {
        onSuccess: () => {
          setOpen(false);
          navigate('/');
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleSendOtp = () => {
    if (!email) {
      setForgotPasswordError("Email is required");
      return;
    }
    setForgotPasswordError("");
    
    // Using the resetPassword mutation to send OTP
    resetPassword({ email }, {
      onSuccess: (response) => {
        if (response.success) {
          setOtpSent(true);
          // toast.success("OTP sent successfully");
        }
      }
    });
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setForgotPasswordError("Passwords do not match");
      return;
    }
    if (!otp || !newPassword || !confirmPassword) {
      setForgotPasswordError("All fields are required");
      return;
    }
    
    resetPassword({ 
      email, 
      otp, 
      password : newPassword, 
    }, {
    
    });
     handleCloseForgotPassword()
  };

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="navbar">
          <IconButton
            className="menu-button"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <h3>Girija❤️Kalyana</h3>
          <div className="menu desktop-menu">
            <ul>
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link className="link" to={item.path}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {isLoggedIn ? (
            <Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "black",
                  width: "150px",
                  color: "#fff",
                  fontWeight: 700,
                  height: "42px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                Logout
              </Button>
            </Typography>
          ) : (
            <Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpen}
                sx={{
                  backgroundColor: "black",
                  width: "150px",
                  color: "#fff",
                  fontWeight: 700,
                  height: "42px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                Login
              </Button>
            </Typography>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            background: "#182848",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ padding: "15px" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>Girija❤️Kalyana</h4>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={toggleMobileMenu}
                sx={{ padding: "10px 0" }}
              >
                <Link className="link mobile-link" to={item.path}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Login/Register Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: "20px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            color="#34495e"
            mt={1}
            mb={1}
          >
            {isRegister ? "Create Your Account" : "Login"}
          </Typography>
          {isRegister ? (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Box display="flex" gap={2} flexWrap="wrap" marginBottom={1.5}>
                <TextField
                  style={{ flex: 1 }}
                  label="First Name"
                  name="first_name"
                  value={registerData.first_name}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  required
                />
                <TextField
                  style={{ flex: 1 }}
                  label="Last Name"
                  name="last_name"
                  value={registerData.last_name}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  required
                />
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap" marginBottom={0}>
                <FormControl style={{ flex: 1 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleChangeRegister}
                    required
                  >
                    <MenuItem value="BrideGroom">BrideGroom</MenuItem>
                    <MenuItem value="Bride">Bride</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ flex: 1 }}
                  label="Date of Birth"
                  name="date_of_birth"
                  value={registerData.date_of_birth}
                  onChange={handleChangeRegister}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile_no"
                  value={registerData.mobile_no}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="Email Address"
                name="username"
                value={registerData.username}
                onChange={handleChangeRegister}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={registerData.password}
                onChange={handleChangeRegister}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChangeRegister}
                error={!!errorMessage} 
                helperText={errorMessage} 
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: "#34495e",
                  width: "50%",
                  display: "flex",
                  justifySelf: "center",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                Create Account
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleLogin}
              style={{
                width: "100%",
                height: "90%",
                padding: "40px 20px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                sx={{ width: { xs: "100%", sm: "400px" } }}
                label="Enter Username"
                name="username"
                value={loginData.username}
                onChange={handleChangeLogin}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                sx={{
                  width: { xs: "100%", sm: "400px" },
                  marginBottom: "20px",
                }}
                label="Enter Password"
                name="password"
                value={loginData.password}
                onChange={handleChangeLogin}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <Typography
                sx={{ color: "#1976d2", cursor: "pointer" }}
                mb={1.5}
                onClick={handleOpenForgotPassword}
              >
                Forgot Password?
              </Typography>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoginPending}
                sx={{
                  width: "250px",
                  background: "#34495e",
                }}
              >
                {isLoginPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          )}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ cursor: "pointer", color: "#1976d2", marginBottom: "10px" }}
            onClick={handleToggleForm}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Typography>
        </Box>
      </Dialog>

      {/* Forgot Password Dialog */}
     <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword} maxWidth="xs" fullWidth>
  <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 0 }}>
    {otpSent ? "Reset Your Password" : "Forgot Password"}
  </DialogTitle>

  <DialogContent>
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        px: 1,
      }}
    >
      {!otpSent ? (
        <>
          <Typography variant="subtitle2" color="textSecondary">
            Enter your registered email to receive an OTP.
          </Typography>
          <TextField
            label="Email Address"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </>
      ) : (
        <>
          <Typography variant="subtitle2" color="textSecondary">
            Enter the OTP sent to your email and set a new password.
          </Typography>

          <TextField
            label="OTP"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <TextField
            label="New Password"
            fullWidth
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            fullWidth
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}

      {forgotPasswordError && (
        <Typography color="error" variant="body2">
          {forgotPasswordError}
        </Typography>
      )}
    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button onClick={handleCloseForgotPassword}  sx={{textTransform:'capitalize'}}>Cancel</Button>
    <Button
      onClick={otpSent ? handleResetPassword : handleSendOtp}
      disabled={isResettingPassword}
      variant="contained"
      color="primary"
      sx={{textTransform:'capitalize'}}
    >
      {isResettingPassword ? (
        <CircularProgress size={24} color="inherit" />
      ) : otpSent ? (
        "Reset Password"
      ) : (
        "Send OTP"
      )}
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default Navbar;