export const menuItems = [
    { 
        text: 'Dashboard', 
        path: '/' 
    },
    { 
        text: 'Utilities', 
        path: '/utilities' 
    },
    { 
        text: 'Archive & Retrieve', 
        path: '/results' 
    },
    { 
        text: 'Messages', 
        path: '/courier' 
    },
    { 
        text: 'Logs', 
        path: '/form' 
    },
  ];

  export const navigatorFunction = (route, navigate, toggleDrawer) => {
    console.log(toggleDrawer);
    navigate(route);
    toggleDrawer(false);
  }