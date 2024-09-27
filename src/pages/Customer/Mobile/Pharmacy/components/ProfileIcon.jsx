import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ccc;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function ProfileIcon() {
  const profileImageUrl = 'Mobile images/Images/user.png';

  return (
    <ProfileWrapper>
      <ProfileImage src={profileImageUrl} alt="Profile" />
    </ProfileWrapper>
  );
}