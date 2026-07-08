import { Navigate, Outlet } from "react-router-dom";
import TokenService from "../token/tokenService";




  const ProtectedRoute = ( {allowedRoles} ) => {
    const userRole = TokenService.getRole();
  
  
    if (!userRole) return <Navigate to="/" replace />;

    const isAllowed = allowedRoles?.some(
      (role) => role?.toString().trim().toLowerCase() === userRole?.toString().trim().toLowerCase()
    );

    if (!isAllowed) {
        return <Navigate to="/" replace />;
      }
  
    return <Outlet />;
  };
   export default ProtectedRoute