import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopBar from "./Components/TopBar/TopBar";
import SortDataPage from "./Components/SortData/SortDataPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/sort" component={SortDataPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
