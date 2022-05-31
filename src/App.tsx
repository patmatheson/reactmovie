import './App.css';
import ThreePaneLayout from './ThreePaneLayout';
import { app } from './firebase';
import GoogleLogin from './login';
import React from 'react';


function App() {

  const [userId, setUserID] = React.useState(() => {
    const cookieSplit = document.cookie.split('; ');
    const cookieFind = cookieSplit.find(row => row.startsWith('googleUID='));
    if (cookieFind){
      return cookieFind.split('=')[1];
    }
    else {
      return null;
    }
  });

  
  if (!userId){
    return (
      <div className="App">
        <GoogleLogin setUserId={setUserID} />
      </div>
    );
  }
   
  
  return (
    <div className="App">
        <ThreePaneLayout googleUserID={userId} />
    </div>
    
  );
}
//trigger re-render  - change a prop or stat in App(), done by sending function to ThreePanel or Login;
export default App;
