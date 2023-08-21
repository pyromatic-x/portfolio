import { useSelector } from "react-redux";
import Greeting from "./components/greeting/Greeting";
import Header from "./components/header/Header";
import Home from "./components/home/Home";

function App() {
  return (
    <div>
      <Greeting />
      <Header />
      <Home />
    </div>
  );

  const greetingPlayed = useSelector((state) => state.greetingPlayed.value);

  return greetingPlayed ? (
    <div>
      <Header />
      <Home />
    </div>
  ) : (
    <Greeting />
  );
}

export default App;
