import logo from './logo.svg';
import './Components/Css/App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <Link to={"/login"}>Click To Login!</Link>
      </header>
    </div>
  );
}

export default App;
