import { BrowserRouter, } from "react-router-dom";
import './App.scss';
import { Router } from './components/Router';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
