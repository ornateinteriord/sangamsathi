import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import HomeUserTable from "../../userupgrade/HomeUserTable";
import { useGetConnections, useGetMemberDetails } from "../../api/User";
import { LoadingComponent, } from "../../../App";
import { isSilverOrPremiumUser, LoadingTextSpinner } from "../../../utils/common";
import ProfileDialog from "../ProfileDialog/ProfileDialog";
import UserCard from "../../common/UserCard";

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const itemsPerPage = 8;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const registerNo = TokenService.getRegistrationNo();

  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error: profileError,
  } = useGetMemberDetails(registerNo);

  const {
    mutate: fetchConnections,
    data: connectionsData = {},
    isPending: isLoadingConnections,
    isError: isConnectionsError,
    error: connectionsError,
  } = useGetConnections();

  useEffect(() => {
    fetchConnections({
      page: currentPage,
      pageSize: itemsPerPage,
      userId: registerNo
    });
  }, [currentPage, registerNo, fetchConnections]);


  useEffect(() => {
    if (isProfileError) toast.error(profileError.message);
    if (isConnectionsError) toast.error(connectionsError.message);
  }, [isProfileError, profileError, isConnectionsError, connectionsError]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  if (isLoadingProfile) return <LoadingComponent />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: {
          xs: "10px 9px",
          sm: "10px 16px",
          md: "10px ",
        },
        mt: "0",
      }}
    >
      <Box sx={{
        width: "100%",
        mb: 4,
        mt: 1,
        background: "linear-gradient(135deg, #5e0476 0%, #7a0c99 100%)",
        borderRadius: "24px",
        padding: { xs: "24px 20px", sm: "32px 40px" },
        boxShadow: "0 10px 30px rgba(94, 4, 118, 0.25)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle decorative glass circle */}
        <Box sx={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          zIndex: 0
        }} />

        <Box sx={{ position: "relative", zIndex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            fontWeight="700"
            color="#ffffff"
            textTransform="capitalize"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              mb: 0.5
            }}
          >
            Welcome, {userProfile?.first_name || "User"} {userProfile?.last_name || ""}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", sm: "flex-start" }} gap={1}>
            <Typography sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1rem",
              fontWeight: 500,
              background: "rgba(0,0,0,0.15)",
              padding: "4px 12px",
              borderRadius: "20px",
              letterSpacing: "1px"
            }}>
              ID: {userProfile?.registration_no}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack spacing={3}>
        {!isSilverOrPremiumUser(userProfile?.type_of_user) && (
          <Box sx={{
            width: "100%",
            overflowX: isSmallScreen ? "auto" : "visible",
          }}>
            <HomeUserTable />
          </Box>
        )}

        <Box>
          <Box
            gap={isSmallScreen ? 1 : 0}
            mb={2}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "22px" }, color: '#000', textAlign: { xs: 'left', md: 'left' } }}
            >
              Interested Profiles
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              justifySelf: "center",
              alignSelf: "center",
              mr: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: { xs: 2, sm: 3 },
              minHeight: 300,
            }}
          >
            {isLoadingConnections ? (
              <Box sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <LoadingTextSpinner />
              </Box>
            ) : connectionsData?.connections?.length > 0 ? (
              connectionsData.connections.map((connection) => (
                <UserCard
                  key={connection._id}
                  profile={connection.profile}
                  connection={connection}
                  onViewMore={handleOpenDialog}
                />
              ))
            ) : (
              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography
                  sx={{
                    color: "#212121",
                    fontSize: "17px",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  No connections yet. Send or accept interest requests to see connections here.
                </Typography>
              </Box>
            )}
          </Box>

          <Box display="flex" justifyContent="end" mt={3}>
            <Pagination
              count={Math.ceil((connectionsData?.totalRecords || 0) / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                visibility: connectionsData?.totalRecords > 0 ? 'visible' : 'hidden'
              }}
            />
          </Box>
        </Box>
      </Stack>

      {selectedUser && (
        <ProfileDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedUser={selectedUser}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isLoading={false}
        />
      )}
    </Box>
  );
};




export default UserDashboard;