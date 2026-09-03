import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import {
  FaSearch,
  FaUserPlus,
  FaUser,
  FaIdBadge,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaInfoCircle,
  FaGlobe,
  FaBuilding,
  FaUniversity,
  FaMoneyCheckAlt,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { customStyles, getPromotersDataColumns } from "../../../utils/DataTableColumnsProvider";

import { usePromoters, useUpdatePromoterStatus, useAddPromoter } from "../../api/Admin";
import { LoadingTextSpinner } from "../../../utils/common";


const PromotersData = () => {
  const { data = [], isLoading, isError, error } = usePromoters();
  const updateStatusMutation = useUpdatePromoterStatus(); 
  const addPromoterMutation = useAddPromoter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    promoter_name: "",
    promoter_id: "",
    mobile: "",
    email: "",
    country: "India",
    company_name: "",
    account_number: "",
    bank_ifsc: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError, error]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Updated to call the mutation:
  const handleStatusToggle = (row) => {
    const newStatus = row.status === "active" ? "inactive" : "active";

    updateStatusMutation.mutate({ id: row._id, status: newStatus });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setFormData({
      promoter_name: "",
      promoter_id: "",
      mobile: "",
      email: "",
      country: "India",
      company_name: "",
      account_number: "",
      bank_ifsc: "",
      username: "",
      password: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!/^[A-Za-z]{4}\d{4}$/.test(formData.promoter_id.trim())) {
      toast.error("Promoter ID must start with 4 alphabets followed by 4 numbers (e.g., ABCD1234)");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const duplicateId = data.some(
      (item) => item.promoter_id?.toString().toUpperCase().trim() === formData.promoter_id.toUpperCase().trim()
    );
    if (duplicateId) {
      toast.error("This Promoter ID already exists!");
      return;
    }

    const duplicateMobile = data.some(
      (item) => item.mobile?.toString().trim() === formData.mobile.trim()
    );
    if (duplicateMobile) {
      toast.error("This Mobile Number already exists!");
      return;
    }

    const duplicateEmail = data.some(
      (item) => item.email?.toString().toLowerCase().trim() === formData.email.toLowerCase().trim()
    );
    if (duplicateEmail) {
      toast.error("This Email ID already exists!");
      return;
    }

    addPromoterMutation.mutate(formData, {
      onSuccess: () => {
        handleModalClose();
      },
    });
  };

  const filteredData = data
    .filter((item) => {
      if (statusFilter === "all") return true;
      return item.status?.toLowerCase() === statusFilter.toLowerCase();
    })
    .filter((item) =>
      [item.promoter_name, item.mobile, item.email]
        .map((field) => field?.toString().toLowerCase())
        .some((val) => val?.includes(search.toLowerCase()))
    );

  return (
    <Box sx={{ padding: 4, paddingTop: "85px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px" flexWrap="wrap" gap={2}>
        <Typography
          variant="h4"
          color="#34495e"
          fontWeight={600}
          fontFamily={"Outfit, sans-serif"}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Promoters
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaUserPlus style={{ fontSize: "1.05rem" }} />}
          sx={{
            background: "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            fontFamily: "Outfit, sans-serif",
            px: 3.5,
            py: 1.2,
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(225, 29, 72, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #1A365D 0%, #1A365D 100%)",
              boxShadow: "0 8px 25px rgba(225, 29, 72, 0.45)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => setOpenModal(true)}
        >
          Add New
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems="center"
        mb={2}
      >
        <TextField
          placeholder="Search"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ width: { xs: "100%", sm: "auto" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />

        <RadioGroup row value={statusFilter} onChange={handleStatusChange}>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="active" control={<Radio />} label="Active" />
          <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
          <FormControlLabel value="pending" control={<Radio />} label="Pending" />
        </RadioGroup>
      </Box>

      <DataTable
        columns={getPromotersDataColumns(handleStatusToggle)}
        data={filteredData}
        pagination
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 10, 15, 20]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
        }}
        customStyles={customStyles}
        progressPending={isLoading || updateStatusMutation.isLoading}
        progressComponent={<LoadingTextSpinner />}
        noDataComponent={
          <Typography padding={3} textAlign="center">
            No records found
          </Typography>
          
        }
        persistTableHead
          highlightOnHover
      />

      <Dialog
        open={openModal}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
        TransitionProps={{ timeout: 350 }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            maxHeight: "90vh",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
            color: "#ffffff",
            px: 4,
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #0B192C 0%, #0B192C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(244, 63, 94, 0.4)",
              }}
            >
              <FaUserShield size={24} color="#ffffff" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "Outfit, sans-serif", letterSpacing: "0.5px",fontSize:{xs:12,sm:14,md:16,lg:18,xl:20} }}>
                Create Promoter Profile
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: {xs:10,sm:12,md:14,lg:16,xl:18}, mt: 0.2 }}>
                Enter promoter details and assign secure login credentials
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleModalClose}
            sx={{
              color: "#94a3b8",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              "&:hover": {
                color: "#ffffff",
                bgcolor: "rgba(244, 63, 94, 0.2)",
              },
              borderRadius: "10px",
              p: 1.2,
            }}
          >
            <FaTimes size={18} />
          </IconButton>
        </Box>

        <form onSubmit={handleAddSubmit}>
          <DialogContent sx={{ p: 4, bgcolor: "#fafafa" }}>
            {/* Section 1: Personal & Contact */}
            <Typography
              variant="subtitle2"
              sx={{
                color: "#64748b",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.75rem",
                mb: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#3b82f6" }} />
              Personal Information
            </Typography>

            <Grid container spacing={3} mb={3.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Promoter Name"
                  name="promoter_name"
                  value={formData.promoter_name}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Full Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Promoter ID"
                  name="promoter_id"
                  value={formData.promoter_id}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., ABCD1234"
                  error={Boolean(formData.promoter_id && !/^[A-Za-z]{4}\d{4}$/.test(formData.promoter_id.trim()))}
                  helperText={
                    <span style={{ color: "#2563eb", fontWeight: 600 }}>
                      Note: 4 alphabets + 4 numbers (e.g., ABCD1234)
                    </span>
                  }
                  FormHelperTextProps={{ sx: { color: "#2563eb !important" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaIdBadge color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="10-digit mobile number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPhoneAlt color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="example@gmail.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaEnvelope color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., India"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaGlobe color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleFormChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Optional / Not Updated"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaBuilding color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1, borderColor: "#e2e8f0" }} />

            {/* Section 2: Bank Details */}
            <Typography
              variant="subtitle2"
              sx={{
                color: "#64748b",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.75rem",
                mb: 2.5,
                mt: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#8b5cf6" }} />
              Bank Information (Optional)
            </Typography>

            <Grid container spacing={3} mb={3.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Number"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleFormChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Bank Account Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUniversity color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bank IFSC Code"
                  name="bank_ifsc"
                  value={formData.bank_ifsc}
                  onChange={handleFormChange}
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., SBIN0001234"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMoneyCheckAlt color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1, borderColor: "#e2e8f0" }} />

            {/* Section 2: Account Credentials */}
            <Typography
              variant="subtitle2"
              sx={{
                color: "#64748b",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.75rem",
                mb: 2.5,
                mt: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#10b981" }} />
              Login Credentials
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Assign Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUserShield color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Assign Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaLock color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#ffffff" } }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 4, py: 2.5, bgcolor: "#ffffff", borderTop: "1px solid #f1f5f9", gap: 1.5 }}>
            <Button
              onClick={handleModalClose}
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 3.5,
                py: 1,
                borderRadius: "10px",
                color: "#64748b",
                "&:hover": { bgcolor: "#f1f5f9", color: "#334155" },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={addPromoterMutation.isLoading || addPromoterMutation.isPending}
              sx={{
                background: "linear-gradient(135deg, #0B192C 0%, #1A365D 100%)",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1,
                fontSize: {xs:12,sm:14,md:16,lg:18,xl:20},
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #1A365D 0%, #1A365D 100%)",
                  boxShadow: "0 6px 16px rgba(225, 29, 72, 0.45)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {addPromoterMutation.isLoading || addPromoterMutation.isPending ? "Creating Profile..." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default PromotersData;

