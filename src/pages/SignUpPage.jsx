import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/auth');
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col justify-center items-center px-4 min-h-screen">
        <div className="w-full max-w-md text-center">
          <p className="text-5xl font-semibold mb-6">Create an Account</p>

          <div className="mt-8">
            <input
              placeholder="Name"
              className="p-3 w-full rounded-2xl mb-4"
              style={{ backgroundColor: '#DEDBE5' }}
            />
            <input
              placeholder="Email"
              className="p-3 w-full rounded-2xl mb-4"
              style={{ backgroundColor: '#DEDBE5' }}
            />
            <input
              placeholder="Password"
              className="p-3 w-full rounded-2xl mb-4"
              style={{ backgroundColor: '#DEDBE5' }}
            />
            <input
              placeholder="Confirm Password"
              className="p-3 w-full rounded-2xl mb-4"
              style={{ backgroundColor: '#DEDBE5' }}
            />
          </div>
        </div>

        <button
          className="p-3 w-full max-w-md rounded-2xl mb-4 text-white font-semibold hover:cursor-pointer"
          style={{ backgroundColor: '#7847EB' }}
        >
          Sign Up
        </button>

        <button
          className="text-[12px] hover: cursor-pointer font-light"
          onClick={() => handleNavigation()}
        >
          Already have an account? Log In here
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
