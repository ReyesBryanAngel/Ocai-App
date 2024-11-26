import React, { useState } from 'react';
import { 
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { menuItems, navigatorFunction } from '../static/SidebarLinks';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUtilitiesVisible, setIsUtilitiesVisible] = useState(false);

  const handleClick = (item) => {
      if (item.path === "/utilities") {
          setIsUtilitiesVisible((prevState) => !prevState);
      } else {
        setIsUtilitiesVisible(false);
      }

    //   navigatorFunction(item.path, navigate);
  };

  return (
    <div className='hidden lg:block whitespace-nowrap'>
        <Drawer
        variant="permanent"
        sx={{
            '& .MuiDrawer-paper': {
            width: 200,
            marginTop: 8,
            bgcolor: "rgb(219 234 254)"
            },
        }}
        >
          <List 
            sx={{ 
              margin:"15px", 
              gap:"20px", 
              display:"flex", 
              flexDirection:"column"
            }}
          >
            {menuItems.map((item, index) => {
                const userText = item.text === "Utilities" && isUtilitiesVisible ? "Users" : "";

                return (
                    <ListItem button key={index} onClick={() => handleClick(item)}>
                    <div className='flex flex-col hover:cursor-pointer'>
                        <ListItemText primary={item.text} />
                        <div onClick={() => navigate('/admin/users')} className={`ml-5 mt-2 ${userText ? "" : "hidden"} hover:cursor-pointer`}>{userText}</div>
                    </div>
                  </ListItem>
                )
             
            })}
          </List>
        </Drawer>
    </div>
  );
};

export default Sidebar;