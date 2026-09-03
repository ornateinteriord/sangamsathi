import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ScannerImg from "../../assets/Scanner.jpeg";
import { toast } from "react-toastify";
import { post } from "../api/authHooks";
import TokenService from "../token/tokenService";

const PaymentSuccessScanner = ({ open, onClose, userType, buttonText }) => {
  const handleSubmit = async () => {
    const planName = userType || "Premium Plan";
    try {
      const regNo = TokenService?.getRegistrationNo?.();
      const userId = TokenService?.getUserId?.();
      if (regNo || userId) {
        await post("/api/user/submit-qr-payment", {
          registration_no: regNo,
          user_id: userId,
          planName: planName
        });
      }
    } catch (err) {
      console.log("Error submitting QR payment:", err);
    }
    toast.success(`🎉 Payment request submitted for ${planName}! Admin will verify your transaction and activate your account shortly.`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden"
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: "center", 
        fontWeight: "bold", 
        bgcolor: '#0B192C', 
        color: 'white',
        py: { xs: 1, md: 1.5 },
        fontSize: { xs: '1rem', md: '1.2rem' }
      }}>
        Complete Your {userType || "Premium"} Payment
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: { xs: 4, md: 12 },
            top: { xs: 4, md: 12 },
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, bgcolor: '#f8f9fa', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: '#fef2f2', borderBottom: '1px solid #fee2e2', py: 1.5, px: 3, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: '#0B192C', fontWeight: 700, fontSize: { xs: '0.95rem', md: '1.1rem' }, display: 'flex', alignItems: 'center', justify: 'center', flexWrap: 'wrap', gap: 1 }}>
            Selected Membership Plan: 
            <Box 
              component="span" 
              sx={{ 
                bgcolor: '#0B192C', 
                color: '#ffea00', 
                border: '1px solid #facc15',
                padding: '4px 16px', 
                borderRadius: '20px', 
                fontWeight: 800,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 6px rgba(153, 27, 27, 0.25)'
              }}
            >
              {userType || "Premium Plan"}
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
            p: { xs: 1.5, md: 3 },
            gap: { xs: 1.5, md: 4 }
          }}
        >
          {/* Left Side: QR Code */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            flex: 1.2,
            bgcolor: 'white',
            p: { xs: 1.5, md: 3 },
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", color: '#1f2937', fontWeight: 700, fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
              Scan to Pay
            </Typography>
            <Box
              component="img"
              src={ScannerImg}
              alt="Payment Scanner - Sangamsathi"
              sx={{
                width: "100%",
                maxWidth: "300px",
                maxHeight: { xs: "200px", md: "300px" },
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: 'block',
                margin: '0 auto'
              }}
            />
            <Box sx={{ mt: 1.5, px: 2, py: 0.8, bgcolor: '#f3f4f6', borderRadius: '6px', border: '1px solid #e5e7eb', width: '100%', maxWidth: '280px', textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#374151', fontWeight: 700, fontSize: '0.85rem' }}>
                UPI Name: <span style={{ color: '#0B192C' }}>Sangamsathi</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center", color: '#6b7280', fontSize: '0.85rem', display: { xs: 'none', md: 'block' } }}>
              Use any UPI app (GPay, PhonePe, Paytm) to complete the transaction.
            </Typography>
          </Box>

          {/* Right Side: Email Info */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            flex: 1,
          }}>
            <Box sx={{ 
              width: '100%', 
              bgcolor: 'white', 
              p: { xs: 1.5, md: 3 }, 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" sx={{ mb: 1, textAlign: "center", color: '#1f2937', fontWeight: 700, fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
                Verify Payment
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#4b5563",
                  mb: 1.5,
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                After a successful payment, please share a screenshot of the transaction to the email address below to activate your premium membership.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#4b5563",
                  mb: 1,
                  fontSize: "0.8rem",
                  display: { xs: 'block', md: 'none' }
                }}
              >
                Share payment screenshot to:
              </Typography>
              
              <Box sx={{ 
                bgcolor: '#fff7ed', 
                border: '1px dashed #fdba74', 
                borderRadius: '8px', 
                p: { xs: 1, md: 1.5 }, 
                width: '100%',
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#ffedd5',
                  borderColor: '#f97316'
                }
              }}>
                <a 
                  href="mailto:ornateinteriod@gmail.com" 
                  style={{ 
                    color: "#9a3412", 
                    textDecoration: "none", 
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    wordBreak: "break-all"
                  }}
                >
                  ornateinteriod@gmail.com
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", p: { xs: 1.5, md: 2 }, gap: 2, bgcolor: '#f8f9fa', borderTop: '1px solid #e5e7eb' }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          size="large"
          sx={{
            borderColor: '#6b7280',
            color: '#374151',
            px: { xs: 4, md: 5 },
            py: { xs: 1, md: 1.2 },
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textTransform: 'none',
            '&:hover': {
              borderColor: '#374151',
              bgcolor: '#f3f4f6',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          size="large"
          sx={{
            bgcolor: '#0B192C',
            color: 'white',
            px: { xs: 5, md: 6 },
            py: { xs: 1, md: 1.2 },
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textTransform: 'none',
            boxShadow: '0 8px 20px rgba(153, 27, 27, 0.3)',
            '&:hover': {
              bgcolor: '#1A365D',
              boxShadow: '0 10px 25px rgba(153, 27, 27, 0.4)',
            }
          }}
        >
          {buttonText || "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessScanner;
