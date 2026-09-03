import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
} from "@mui/material";
import { useUpgradeUserType } from "../../api/Admin";

const userTypes = ["FreeUser", "PremiumUser", "SilverUser", "Assistance", "Promoter", "BasicUser"];

const UserUpgradeDialog = ({ open, handleClose, defaultUserType, userId }) => {
    const [formData, setFormData] = useState({
        userType: "",
        amountPaid: "",
        paidType: "",
        referenceNumber: "",
    });

    useEffect(() => {
        if (open) {
            const initialType = defaultUserType || "FreeUser";
            let initialAmount = "0";
            if (initialType === "SilverUser") initialAmount = "799";
            else if (initialType === "PremiumUser") initialAmount = "999";
            setFormData({
                userType: initialType,
                amountPaid: initialAmount,
                paidType: "Admin",
                referenceNumber: "ADMIN_UPGRADE",
            });
        }
    }, [open, defaultUserType]);

    const {
        mutate: upgradeUser,
        isPending: isUpgrading,
    } = useUpgradeUserType()

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "userType") {
            let defaultAmount = formData.amountPaid;
            if (value === "SilverUser") defaultAmount = "799";
            else if (value === "PremiumUser") defaultAmount = "999";
            else if (value === "FreeUser" || value === "Assistance" || value === "Promoter" || value === "BasicUser") defaultAmount = "0";

            setFormData({ ...formData, userType: value, amountPaid: defaultAmount });
            return;
        }

        // For amountPaid, allow only digits
        if (name === "amountPaid") {
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        upgradeUser({
            userType: formData.userType,
            amountPaid: Number(formData.amountPaid),
            paidType: formData.paidType || "Admin",
            referenceNumber: formData.referenceNumber || "ADMIN_UPGRADE",
            registration_no: userId
        }, {
            onSuccess: () => {
                handleClose();
                setFormData({
                    userType: "",
                    amountPaid: "",
                    paidType: "",
                    referenceNumber: "",
                });
            },
            onError: (error) => {
                console.error("Upgrade error:", error);
            }
        });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "10px",
                        padding: { xs: "0px", sm: "10px" },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: "1.5rem",
                    }}
                >
                    Upgrade User
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        {/* User Type */}
                        <TextField
                            select
                            label="User Type"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "5px" },
                            }}
                        >
                            {userTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Amount Paid */}
                        <TextField
                            label="Amount Paid"
                            name="amountPaid"
                            value={formData.amountPaid}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                style: { MozAppearance: "textfield" }, // remove firefox arrows
                            }}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                },
                                "& .MuiOutlinedInput-root": { borderRadius: "5px" },
                            }}
                        />

                        {/* Paid Type */}
                        <TextField
                            label="Paid Type"
                            name="paidType"
                            value={formData.paidType}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "5px" },
                            }}
                        />

                        {/* Reference Number */}
                        <TextField
                            label="Reference Number"
                            name="referenceNumber"
                            value={formData.referenceNumber}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "5px" },
                            }}
                        />
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
                        fullWidth
                        variant="outlined"
                        onClick={handleClose}
                        sx={{
                            height: "44px",
                            borderRadius: "8px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            fontSize: "1rem",
                            color: "#333",
                            borderColor: "#ccc",
                            "&:hover": {
                                borderColor: "#999",
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isUpgrading}
                        sx={{
                            height: "44px",
                            borderRadius: "8px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            fontSize: "1rem",
                            backgroundColor: "#1a4f72",
                            "&:hover": {
                                backgroundColor: "#285228",
                            },
                        }}
                    >
                        {isUpgrading ? "Upgrading..." : "Upgrade"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserUpgradeDialog;
