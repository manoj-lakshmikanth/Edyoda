import './App.css';
import Navbar from './Components/Navbar';
import LeftPanel from './Components/LeftPanel';
import RightPanel from './Components/RightPanel';

function App() {
  return (
    <div className="containers">
      <Navbar />
      <div classname="panels">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
