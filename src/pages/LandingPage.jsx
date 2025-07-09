import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import backgroundImage from '../assets/unnamed.png';
import feature1Photo from '../assets/summarisation.png';
import feature2Photo from '../assets/noteMaker.png';
import feature3Photo from '../assets/organisaedKnowledgeBase.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/auth');
  };
  return (
    <div>
      <Header />

      <div className="w-[60%] mx-auto mt-25 mb-8">
        {/* Photo section */}
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

        {/* Key features section */}
        <section className="mt-10">
          <p className="text-4xl text-black font-bold mb-3">Key Features</p>
          <p style={{ color: 'gray' }}>
            Note-Damn offers a suite of tools designed to enhance your
            note-taking and learning experience
          </p>

          <div className="flex mt-10 space-x-4">
            <div
              className="border-1 p-4 rounded-2xl"
              style={{ borderColor: '#DEDBE5' }}
            >
              <img src={feature1Photo} className=" mb-4"></img>
              <p className="text-xl mb-1 font-semibold">Smart Summarisation</p>
              <p>
                Automatically condense your notes into key takeaways, saving
                your time and improving comprehension
              </p>
            </div>

            <div
              className="border-1 p-4 rounded-2xl"
              style={{ borderColor: '#DEDBE5' }}
            >
              <img src={feature2Photo} className=" mb-4"></img>
              <p className="text-xl mb-1 font-semibold">
                Intelligent Note Maker
              </p>
              <p>
                Create structured and insightful notes with our intuitive note
                maker, designed for clarity and efficiency.
              </p>
            </div>

            <div
              className="border-1 p-4 rounded-2xl"
              style={{ borderColor: '#DEDBE5' }}
            >
              <img src={feature3Photo} className=" mb-4"></img>
              <p className="text-xl mb-1 font-semibold">
                Organised Knowledge Base
              </p>
              <p>
                Keep all your summarized notes and insights in one place, easily
                accessible and searchable.
              </p>
            </div>
          </div>
        </section>

        {/* ending section */}
        <section>
          <div className="flex justify-center items-center mt-18">
            <p className="text-4xl text-black font-bold mb-3">
              Ready to Transform your Learning?
            </p>
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              className="bg-[#7847EB] border border-[#7847EB] text-white font-semibold py-2 px-4 rounded-2xl hover:bg-white hover:text-[#7847EB] hover:border-[#7847EB] transition-colors duration-300 ease-in-out"
              onClick={() => handleNavigation()}
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
