import React from 'react';
import ProfileForm from '../components/ProfileForm';

type OrganizationProfileProps = {
  profileData: {
    name: string;
    address: string;
    contactEmail: string;
  }
};

const OrganizationProfile: React.FC<OrganizationProfileProps> = ({ profileData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Organization Profile</h1>
      <ProfileForm initialData={profileData} />
    </div>
  );
};

export default OrganizationProfile;

