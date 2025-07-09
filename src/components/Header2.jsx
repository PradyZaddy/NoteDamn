import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePicture from '../assets/profile.png';

const Header2 = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/auth');
  };

  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <div
      className="flex items-center justify-between ml-2  border-y-black border-b-1 fixed top-0 left-0 w-full z-50 bg-white"
      style={{ borderBottomColor: '#F2F0F5' }}
    >
      <p
        className="text-[20px] text-black font-bold hover:cursor-pointer"
        onClick={() => navigateToHome()}
      >
        Note-Damn
      </p>

      <div className=" flex space-x-4 mr-4 pb-2 mt-2 mr-8 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:shadow-lg hover: border-black transition-shadow duration-300 ease-in-out">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header2;
