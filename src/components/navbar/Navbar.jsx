import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Box,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, FavoriteRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation, useResetpassword } from "../api/Auth";
import useAuth from "../hook/UseAuth";
import TokenService from "../token/tokenService";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  }, [openDialog]);

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

  const handleSendOtp = () => {
    if (!email) {
      setForgotPasswordError("Email is required");
      return;
    }
    setForgotPasswordError("");

    resetPassword({ email }, {
      onSuccess: (response) => {
        if (response.success) {
          setOtpSent(true);
          toast.success("OTP sent successfully");
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to send OTP");
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
      password: newPassword,
    }, {
      onSuccess: () => {
        toast.success("Password reset successfully");
        handleCloseForgotPassword();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
      }
    });
  };

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="navbar">
          {/* Mobile Menu Button */}
          <IconButton
            className="menu-button"
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#fff",
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          {/* Logo/Brand Name */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" },
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: "#fff",
              textAlign: 'center',
              [theme.breakpoints.up('md')]: {
                margin: "0",
                marginRight: "auto"
              }
            }}
          >
            Sangam ❤️ Sathi
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              marginLeft: "20px"
            }}
          >
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "capitalize",
                    margin: "0 8px",
                    position: "relative",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "transparent",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "4px",
                        left: "8px",
                        right: "8px",
                        height: "2px",
                        backgroundColor: "#fff",
                        transform: "scaleX(1)",
                        transition: "transform 0.3s ease"
                      }
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "4px",
                      left: "8px",
                      right: "8px",
                      height: "2px",
                      backgroundColor: "#fff",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s ease"
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            })}

          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={handleLogout}
                sx={{
                  backgroundColor: "black",
                  minWidth: "120px",
                  color: "#fff",
                  fontWeight: 700,
                  height: { xs: "36px", md: "42px" },
                  textTransform: "capitalize",
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  onClick={handleOpen}
                  sx={{
                    backgroundColor: "#FFFF",
                    minWidth: "120px",
                    color: "#000",
                    fontWeight: 700,
                    height: { xs: "36px", md: "42px" },
                    textTransform: "capitalize",
                    display: { xs: "none", sm: "inline-flex" },
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "280px",
            background: '#0B192C',
            color: "#fff",
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              Sangam ❤️ Sathi
            </Typography>
            <IconButton onClick={toggleMobileMenu} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ padding: 0 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={toggleMobileMenu}
                sx={{
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Link
                  className="link mobile-link"
                  to={item.path}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>

          <Box sx={{ padding: "16px", marginTop: "auto" }}>
            {isLoggedIn ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: 700,
                  height: "42px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#eee",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleOpen();
                    toggleMobileMenu();
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: 700,
                    height: "42px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Login Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(94,4,118,0.25)",
            padding: "0px",
          }
        }}
      >
        {/* Gradient Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
            pt: 4,
            pb: 3,
            px: 3,
            textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "rgba(255,255,255,0.7)",
              "&:hover": { color: "#fff", background: "rgba(255,255,255,0.15)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1,
              border: "2px solid rgba(255,255,255,0.25)",
            }}
          >
            <FavoriteRounded sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          {/* <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.3px" }}>
            Welcome Back
          </Typography> */}
          <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "1.2rem", }}>
            Login to your Sangam Sathi account
          </Typography>
        </Box>

        {/* Form Body */}
        <DialogContent sx={{ px: 3, pt: 3, pb: 1 }}>
          <Box
            component="form"
            onSubmit={handleLogin}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin(e);
              }
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="username"
              value={loginData.username}
              onChange={handleChangeLogin}
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: "#0B192C", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": { borderColor: "#0B192C" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0B192C",
                    boxShadow: "0 0 0 3px rgba(94,4,118,0.1)",
                  },
                },
                "& label.Mui-focused": { color: "#0B192C" },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleChangeLogin}
              type={showLoginPassword ? "text" : "password"}
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#0B192C", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      edge="end"
                      size="small"
                    >
                      {showLoginPassword
                        ? <VisibilityOff sx={{ fontSize: 20, color: "#999" }} />
                        : <Visibility sx={{ fontSize: 20, color: "#999" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "&:hover fieldset": { borderColor: "#0B192C" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0B192C",
                    boxShadow: "0 0 0 3px rgba(94,4,118,0.1)",
                  },
                },
                "& label.Mui-focused": { color: "#0B192C" },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#0B192C",
                cursor: "pointer",
                textAlign: "right",
                fontWeight: 500,
                fontSize: "0.82rem",
                mt: -1,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleOpenForgotPassword}
            >
              Forgot Password?
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1, flexDirection: "column", gap: "14px" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={isLoginPending}
            sx={{
              height: "48px",
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              letterSpacing: "0.3px",
              background: "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
              boxShadow: "0 4px 14px rgba(94,4,118,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #1A365D 0%, #0B192C 100%)",
                boxShadow: "0 6px 20px rgba(94,4,118,0.45)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            {isLoginPending ? <CircularProgress size={22} color="inherit" /> : "Login"}
          </Button>

          <Typography variant="body2" sx={{ color: "#666", fontSize: "0.875rem", pb: 1 }}>
            Don't have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "#0B192C",
                cursor: "pointer",
                fontWeight: 700,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => { handleClose(); navigate("/register"); }}
            >
              Register now
            </Box>
          </Typography>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog
        open={openForgotPassword}
        onClose={handleCloseForgotPassword}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: { xs: "0px", sm: "10px" },
          }
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: "1.5rem",
            paddingBottom: "8px",
          }}
        >
          {otpSent ? "Reset Password" : "Forgot Password"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingTop: "16px",
            }}
          >
            {!otpSent ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  Enter your registered email to receive a password reset OTP.
                </Typography>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  Enter the OTP sent to your email and your new password.
                </Typography>
                <TextField
                  fullWidth
                  label="OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </>
            )}
            {forgotPasswordError && (
              <Typography color="error" variant="body2" textAlign="center">
                {forgotPasswordError}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "6px 24px",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={otpSent ? handleResetPassword : handleSendOtp}
            disabled={isResettingPassword}
            sx={{
              height: "44px",
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "capitalize",
              fontSize: "1rem",
              backgroundColor: "#0B192C",
              "&:hover": {
                backgroundColor: "#6c1b83",
              },
            }}
          >
            {isResettingPassword ? (
              <CircularProgress size={24} color="inherit" />
            ) : otpSent ? (
              "Reset Password"
            ) : (
              "Send OTP"
            )}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleCloseForgotPassword}
            sx={{
              height: "44px",
              mb: 2.4,
              mr: 1,
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "capitalize",
              fontSize: "1rem",
              color: "#0B192C",
              borderColor: "#0B192C",
              "&:hover": {
                borderColor: "#6c1b83",
                backgroundColor: "#e3d2e7ff",
                color: "#6c1b83",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default Navbar;