import { useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import SideBar from '../components/sidebar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const DashBoard = () => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch data when only userId is available
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `http://localhost:3030/api/summaries/${userId}`,
        );
        const retrievedData = await res.json();
        setData(retrievedData);
      } catch (err) {
        console.log('Didn’t work!', err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="h-screen flex flex-col">
      <Header2 />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[250px] shrink-0">
          <SideBar />
        </div>

        <div className="flex-1 mt-25 ml-15">
          <p className="bg-white text-[25px] text-black font-bold mb-8">
            All Notes
          </p>

          <div className="border border-gray-300 rounded-2xl w-[95%]">
            <table className="w-[100%] table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left border-b border-gray-300 font-normal">
                    Title
                  </th>
                  <th className="px-4 py-4 text-left border-b border-gray-300 font-normal">
                    Summary
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((val, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td
                      className="px-4 border-b border-gray-200 py-[15px]"
                      style={{ color: 'grey' }}
                    >
                      {val.title}
                    </td>
                    <td
                      className="px-4 border-b border-gray-200 py-[15px]"
                      style={{ color: 'grey' }}
                    >
                      {val.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
