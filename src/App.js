import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import NavigationSetter from "./services/navigation";
function App() {
  return (
    <BrowserRouter>
      <NavigationSetter />
      <Router />
    </BrowserRouter>
  );
}

export default App;
