import './App.css';
import ThreePaneLayout from './ThreePaneLayout';
import { app } from './firebase';
import { getAuth } from "firebase/auth";
import GoogleLogin from './login';
import React from 'react';
import Stack from '@mui/material/Stack';
import MainHeader from './MainHeader';


function App() {

  const auth = getAuth();
  const [userId, setUserID] = React.useState(() => {
    const cookieSplit = document.cookie.split('; ');
    const cookieFind = cookieSplit.find(row => row.startsWith('googleUID='));
    if (cookieFind){
      return cookieFind.split('=')[1];
    }
    else {
      return "";
    }
  });


  
  if (userId== "" || !auth.currentUser){
    return (
      <div className="App">
        <GoogleLogin setUserId={setUserID} />
      </div>
    );
  }
   
  
  return (
    <Stack spacing={0}>
    <div className="Header">
      <MainHeader setUserId={setUserID}/>
    </div>
    <div className="App">
        <ThreePaneLayout googleUserID={userId} />
    </div>
    </Stack>
  );
}
//trigger re-render  - change a prop or stat in App(), done by sending function to ThreePanel or Login;
export default App;
