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
  const [userId, setUserID] = React.useState("");
 
  if (!auth.currentUser){
    return (
      <div className="App">
        <GoogleLogin setUserId={setUserID} />
      </div>
    );
  }
   
  if (userId == "" && auth.currentUser){
    setUserID(auth.currentUser.uid)
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
export default App;
