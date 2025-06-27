import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AuthPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/signUp');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthorisation = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dash');
    } catch (er) {
      alert('log in failed: ' + er);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col justify-center items-center px-4 min-h-screen">
        <div className="w-full max-w-md text-center">
          <p className="text-5xl font-semibold mb-6">Welcome Back</p>

          <div className="mt-8">
            <input
              placeholder="Email"
              className="p-3 w-full rounded-2xl mb-4"
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#DEDBE5' }}
            />
            <input
              placeholder="Password"
              type="password"
              className="p-3 w-full rounded-2xl mb-4"
              onChange={(p) => setPassword(p.target.value)}
              style={{ backgroundColor: '#DEDBE5' }}
            />
          </div>
        </div>

        <button className="text-[12px] hover: cursor-pointer font-light mb-4">
          Forgot Password?
        </button>

        <button
          className="p-3 w-full max-w-md rounded-2xl mb-4 text-white font-semibold hover:cursor-pointer"
          onClick={() => handleAuthorisation()}
          style={{ backgroundColor: '#7847EB' }}
        >
          Log In
        </button>

        <button
          className="text-[12px] hover: cursor-pointer font-light"
          onClick={() => handleNavigation()}
        >
          Don't have an account? Sign up here
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
