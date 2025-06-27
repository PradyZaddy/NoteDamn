import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link to="/sesh" />}> Create Session</MenuItem>
        <MenuItem component={<Link to="/" />}> Home - test</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default DashBoard;
