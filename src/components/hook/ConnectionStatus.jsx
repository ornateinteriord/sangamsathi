// hooks/useConnectionStatus.js
import { useMemo } from 'react';

export const useConnectionStatus = (responseData) => {
  const acceptedConnectionsMap = useMemo(() => {
    const connections = {};
    if (Array.isArray(responseData)) {
      responseData.forEach(item => {
        if (item?.status === "accepted" && item?.sender) {
          connections[item?.sender] = true;
        }
      });
    }
    return connections;
  }, [responseData]);

  const getConnectionStatus = (registrationNo) => {
    return acceptedConnectionsMap[registrationNo] ? 'accepted' : null;
  };

  return { getConnectionStatus };
};