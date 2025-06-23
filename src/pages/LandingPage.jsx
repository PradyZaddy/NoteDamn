import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import backgroundImage from '../assets/unnamed.png';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <div className="w-[60%] mx-auto mt-25 mb-8">
        <section
          className="h-[400px] bg-cover bg-center flex items-center justify-center px-6 rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent), url(${backgroundImage})`,
          }}
        >
          <div className="text-center mt-40">
            <p className="text-5xl font-bold mb-4 drop-shadow-lg text-white">
              Unlock the Power of Concise Knowledge
            </p>
            <p className="text-lg mb-6 drop-shadow-sm font-thin text-white">
              Note-Damn transforms lengthy notes into clear, actionable summary,
              helping you learn faster and retain better
            </p>
          </div>
        </section>

        <section className="mt-10">
          <p className="text-4xl text-black font-bold mb-3">Key Features</p>
          <p style={{ color: 'gray' }}>
            Note-Damn offers a suite of tools designed to enhance your
            note-taking and learning experience
          </p>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
