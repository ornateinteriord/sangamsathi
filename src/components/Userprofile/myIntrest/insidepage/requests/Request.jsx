import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  useGetReceivedInterests,
  useUpdateInterestStatus,
} from "../../../../api/User";
import TokenService from "../../../../token/tokenService";
import toast from "react-hot-toast";
import { LoadingTextSpinner } from "../../../../../utils/common";
import UserCard from "../../../../common/UserCard";
import ProfileDialog from "../../../ProfileDialog/ProfileDialog";

const Requests = ({refetchCounts}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const recipient = TokenService.getRegistrationNo();

  const {
    data: receivedInterests,
    isPending: isFetching,
    mutate: fetchReceivedInterests,
    isError,
    error,
  } = useGetReceivedInterests(recipient);

  const { mutate: updateInterest, } = useUpdateInterestStatus();

  useEffect(() => {
    fetchReceivedInterests({ page: currentPage - 1, pageSize: itemsPerPage });
  }, [currentPage]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong while fetching requests");
    }
  }, [isError, error]);

  const totalPages = useMemo(() => {
    return receivedInterests ? Math.ceil(receivedInterests.totalRecords / itemsPerPage) : 1;
  }, [receivedInterests]);

  const handleInterestResponse = (senderRefNo, isAccepted) => {
    updateInterest(
      {
        sender: senderRefNo,
        recipient,
        status: isAccepted ? "accepted" : "rejected",
      },
      {
        onSuccess: () => {
          toast.success(`Request ${isAccepted ? "accepted" : "rejected"} successfully`);
           fetchReceivedInterests({ page: currentPage - 1, pageSize: itemsPerPage });
           refetchCounts()
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to update request");
        },
      }
    );
  };

  const interests = receivedInterests?.content || [];

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: {xs: "center", sm: "flex-start"},
          mr:2,
          marginTop: 1,
        }}
      >
        {isFetching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "200px", // optional: ensures it takes space to center vertically
            }}
          >
            <LoadingTextSpinner />
          </Box>
        ) : interests.length === 0 ? (
          <Typography variant="h6">No pending requests found</Typography>
        ) : (
          interests.map((interest) => (
            <UserCard
              key={interest._id}
              profile={interest.sender}
              onResponse={handleInterestResponse}
              showResponseButtons={true}
            />
          ))
        )}
      </Box>

      {totalPages > 1 && interests.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            shape="rounded"
            color="primary"
            size={window.innerWidth < 600 ? "small" : "medium"}
          />
        </Box>
      )}
       <Dialog open={rejectDialogOpen} onClose={handleRejectDialogClose}>
        <DialogTitle sx={{ fontWeight: 600, color: "black" }}>
          Reject Profile
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "black" }}>
            Are you sure you want to reject this interest request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRejectDialogClose}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              color: "black",
              borderColor: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "black",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmReject}
            color="error"
            variant="contained"
            disabled={isRejecting}
            sx={{
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Requests;
