import { useCallback, useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Pagination,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import TokenService from "../../../token/tokenService";
import { useCancelSentInterest, useGetSentInterests } from "../../../api/User/useGetProfileDetails";

import PreferencePop from "../../viewAll/popupContent/preferencePop/PreferencePop";
import LifeStylePop from "../../viewAll/popupContent/lifeStylePop/LifeStylePop";
import EducationPop from "../../viewAll/popupContent/educationPop/EducationPop";
import FamilyPop from "../../viewAll/popupContent/familyPop/FamilyPop";
import AboutPop from "../../viewAll/popupContent/abouPop/AboutPop";
import ProfileDialog from "../../ProfileDialog/ProfileDialog";
import { isSilverOrPremiumUser, LoadingTextSpinner } from "../../../../utils/common";
import OthersPop from "../../viewAll/popupContent/others/OthersPop";

const Sent = ({refetchCounts}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCancelId, setSelectedCancelId] = useState(null);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const itemsPerPage = 4;
  const currentUserRegistrationNo = TokenService.getRegistrationNo();

  const { mutate: cancelInterest, isFetching: isCancelling } = useCancelSentInterest();
  const {
    data: sentInterests,
    isPending: isLoading,
    mutate: fetchSentInterests,
  } = useGetSentInterests(currentUserRegistrationNo);

  // Fetch page-wise data whenever currentPage changes
  useEffect(() => {
    fetchSentInterests({ page: currentPage - 1, pageSize: itemsPerPage });
  }, [currentPage]);

  const totalPages = useMemo(() => {
    return sentInterests ? Math.ceil(sentInterests.totalRecords / itemsPerPage) : 1;
  }, [sentInterests]);

  const handleOpenDialog = useCallback((user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  }, []);

  const handleRequestCancelClick = useCallback((interestId) => {
    setSelectedCancelId(interestId);
    setCancelConfirmOpen(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    const interestToCancel = sentInterests?.content?.find((item) => item._id === selectedCancelId);
    if (!interestToCancel) return;

    cancelInterest(
      {
        sender: currentUserRegistrationNo,
        recipient: interestToCancel.recipientdata.registration_no,
      },
      {
        onSuccess: () => {
          setSelectedCancelId(null);
          setCancelConfirmOpen(false);
          fetchSentInterests({ page: currentPage - 1, pageSize: itemsPerPage }); // refresh after cancel
          refetchCounts()
        },
        onError: () => {
          toast.error("Failed to cancel request.");
          setCancelConfirmOpen(false);
        },
      }
    );
  }, [selectedCancelId, sentInterests, cancelInterest, currentUserRegistrationNo, fetchSentInterests, currentPage]);

  const handleCancelDialogClose = useCallback(() => {
    setSelectedCancelId(null);
    setCancelConfirmOpen(false);
  }, []);

  const renderDialogContent = () => {
    if (!selectedUser) return null;
    const contentMap = {
      0: <AboutPop userDetails={selectedUser} />,
      1: <FamilyPop userDetails={selectedUser} />,
      2: <EducationPop userDetails={selectedUser} />,
      3: <LifeStylePop userDetails={selectedUser} />,
      4: <PreferencePop userDetails={selectedUser} />,
      5: <OthersPop userDetails={selectedUser} />,
    };
    return contentMap[currentTab] || null;
  };

  return (
    <Box sx={{ p: 3 }}>
      {!isLoading && sentInterests?.content?.length === 0 ? (
        <Typography>You haven't sent any interest requests.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 3,
            }}
          >
            {sentInterests?.content?.map((interest) => (
              <InterestCard
                key={interest._id}
                interestId={interest._id}
                profile={interest.recipientdata}
                handleOpenDialog={handleOpenDialog}
                handleRequestCancelClick={handleRequestCancelClick}
              />
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}

      {selectedUser && (
        <ProfileDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedUser={selectedUser}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          loggedInUserId={currentUserRegistrationNo}
          isLoading={false}
          renderDialogContent={renderDialogContent}
        />
      )}

      <Dialog open={cancelConfirmOpen} onClose={handleCancelDialogClose}>
        <DialogTitle>Cancel Request</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this interest request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose}>No</Button>
          <Button
            onClick={handleConfirmCancel}
            color="error"
            variant="contained"
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && (
        <LoadingTextSpinner />
      )}
    </Box>
  );
};

const InterestCard = ({ interestId, profile, handleOpenDialog, handleRequestCancelClick }) => (
  <Card
    sx={{
      width: { xs: 300, sm: 280, md: 260, lg: 280 },
      borderRadius: 4,
      boxShadow: 3,
      overflow: "hidden",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pt: 1,
      position: "relative",
    }}
  >
    {isSilverOrPremiumUser(profile.type_of_use) && (
      <Chip
        label="PREMIUM"
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          fontWeight: "bold",
          fontSize: { xs: "0.6rem", sm: "0.7rem" },
          backgroundColor: "#FFD700",
        }}
      />
    )}

    <Box
      sx={{
        width: { xs: 100, sm: 120 },
        height: { xs: 100, sm: 120 },
        borderRadius: "50%",
        border: "3px solid #87CEEB",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        mb: 1,
        padding: "2px",
        background: "linear-gradient(45deg, #87CEEB, #E0F7FA)",
      }}
    >
      <Avatar src={profile?.image} sx={{ width: "100%", height: "100%" }} />
    </Box>

    <CardContent
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: 0,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Typography fontWeight="bold" sx={{ mb: 0.5, color: "#000" }}>
        {profile.first_name} {profile.last_name}
      </Typography>
      <Typography component="span" color="text.secondary">
        {profile.age || "N/A"} yrs
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <FaBriefcase size={14} color="#000" style={{ marginRight: 6 }} />
        <Typography variant="body2" color="#000">
          {profile.occupation || "Not specified"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <FaMapMarkerAlt size={14} color="#000" style={{ marginRight: 6 }} />
        <Typography variant="body2" color="#000">
          {[profile.city, profile.state, profile.country].filter(Boolean).join(", ") ||
            "Location not specified"}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", my: 1, height: "1px" }} />

      <Box display="flex" justifyContent="space-around" width="100%" my={2}>
        <ProfileInfo label="Height" value={profile.height || "N/A"} />
        <ProfileInfo label="Religion" value={profile.religion || "N/A"} />
        <ProfileInfo label="Caste" value={profile.caste || "N/A"} />
      </Box>

      <Box display="flex" flexDirection="row" gap={1} width="100%">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(profile)}
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          View More
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => handleRequestCancelClick(interestId)}
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", sm: "0.7rem" },
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Cancel Request
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const ProfileInfo = ({ label, value }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Box>
);

export default Sent;
