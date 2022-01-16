import './App.css';
import Header from './Components/Headers/Header';
import Timer from './Components/Timer/Timer';
import Card from './Components/UI/Card/Card';

function App() {
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
