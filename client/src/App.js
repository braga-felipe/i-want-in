import './App.css';
import { BrowserRoter as Router, Route } from 'react-router-dom';
import Welcome from './Welcome';
import ResponsiveAppBar from './NavBar';

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar />
      <h1>Welcome!</h1>
      <Welcome />
    </div>
  );
}

export default App;
