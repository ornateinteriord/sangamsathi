import profileimg from "../../assets/profile.jpg";

export const useVerifiedImage = () => {
  const getVerifiedImage = (profile, viewerRole = 'FreeUser', connectionStatus) => {
    if (profile?.image_verification !== 'active') {
      return profileimg;
    }
    
    switch (profile?.secure_image) {
      case 'enable':
        return profile.image || profileimg;
      case 'Premiumuser': 
        return ['PremiumUser', 'SilverUser', 'Admin'].includes(viewerRole) 
          ? (profile.image || profileimg) 
          : profileimg;
      
      case 'requestuser': 
        return connectionStatus === 'accepted' || viewerRole === 'Admin'
          ? (profile.image || profileimg)
          : profileimg;
      
      default: 
        return profileimg;
    }
  };

  return { getVerifiedImage };
};