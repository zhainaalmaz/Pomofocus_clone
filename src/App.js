import './App.css';
import Header from './Components/Headers/Header';
import Timer from './Components/Timer/Timer';
import Card from './Components/UI/Card/Card';
// import { useSelector } from 'react-redux';
// import { COLORS } from './Components/utils/constants';

function App() {
  // const bggg = useSelector((state) => state.timer.currentMode);

  return (
    <Card>
      <div className="App">
        <Header />
        <div>
          <Timer />
        </div>
      </div>
    </Card>
  );
}

export default App;
