import { useEffect, useState } from "react";
import Greeting from "./components/greeting/Greeting";
import Home from "./components/home/Home";
import { useSelector } from "react-redux";

function App() {
  const greetingPlayed = useSelector((state) => state.greetingPlayed.value);
  const [hideGreeting, setHideGreeting] = useState(greetingPlayed);

  useEffect(() => {
    if (greetingPlayed) {
      setTimeout(() => {
        setHideGreeting(true);
      }, 1600 / 8);
    }
  });

  return (
    <div>
      {!hideGreeting && <Greeting />}
      <Home />
    </div>
  );
}

export default App;
