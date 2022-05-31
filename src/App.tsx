import './App.css';
import ThreePaneLayout from './ThreePaneLayout';
import { app } from './firebase';
import GoogleLogin from './login';
import React from 'react';

interface LoginRerenderer
{
  
}

function App() {

  const [rerender, setRerender] = React.useState('0');

  const loginRerender = () => {
    setRerender(rerender + 1);
  }
  
  if (!document.cookie){
    return (
      <div className="App">
        <GoogleLogin />
      </div>
    );
  }
  const cookieSplit = document.cookie.split('; ');
  const cookieFind = cookieSplit.find(row => row.startsWith('googleUID='));
  if (!cookieFind) return (
    <div className="App">
      <GoogleLogin />
    </div>
  );
  const userId = cookieFind.split('=')[1];
  
  return (
    <div className="App">
        <ThreePaneLayout />
    </div>
    
  );
}
//trigger re-render  - change a prop or stat in App(), done by sending function to ThreePanel or Login;
export default App;
