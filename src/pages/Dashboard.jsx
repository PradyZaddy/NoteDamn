import Header2 from '../components/Header2';
import SideBar from '../components/sidebar';

const DashBoard = () => {
  const data = [
    { name: 'Summary Title 1', summary: 'summary1' },
    { name: 'Summary Title 2', summary: 'summary1' },
    { name: 'Summary Title 3', summary: 'summary1' },
  ];

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
                      {val.name}
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
