import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const handleNavigation = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      This is the Authorisation page
      <div>
        <button
          className="bg-blue-500 p-4 m-2"
          onClick={() => handleNavigation}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
