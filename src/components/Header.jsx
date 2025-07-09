import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/auth');
  };

  const navigateToLogInPage = () => {
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

      <div className="space-x-4 mr-4 pb-2 mt-2">
        <button
          className="bg-[#7847EB] border border-[#7847EB] text-white font-semibold py-2 px-4 rounded-2xl hover:bg-white hover:text-[#7847EB] hover:border-[#7847EB] transition-colors duration-300 ease-in-out"
          onClick={() => handleNavigation()}
        >
          Get Started
        </button>

        <button
          className="bg-[#F2F0F5] text-black font-semibold py-2 px-4 rounded-2xl border border-[#F2F0F5] hover:bg-white hover:text-black hover:border-[#7847EB] transition-colors duration-300 ease-in-out"
          onClick={() => handleNavigation()}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Header;
