import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import homeIcon from '../assets/home.png';
import addIcon from '../assets/add.png';
import summaryIcon from '../assets/contract.png';

const SideBar = () => {
  return (
    <Sidebar
      rootStyles={{
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '4px solid',
        borderColor: '#F2F0F5',
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: 'white',
              color: '#fff',
            },
            '&:hover': {
              backgroundColor: '#E0D9F4',
              borderRadius: '10px',
            },
          },
        }}
      >
        <p className="text-[20px] text-black font-bold mb-3 mt-4 px-4">
          Note-Damn
        </p>

        <MenuItem
          style={{ backgroundColor: '#F2F0F5', marginBottom: '5px' }}
          icon={<img src={summaryIcon} style={{ width: 20, height: 20 }} />}
        >
          Summaries
        </MenuItem>

        <MenuItem
          icon={<img src={addIcon} style={{ width: 20, height: 20 }} />}
          component={<Link to="/sesh" />}
        >
          Create Session
        </MenuItem>

        <MenuItem
          icon={<img src={homeIcon} style={{ width: 20, height: 20 }} />}
          component={<Link to="/" />}
        >
          Home
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
