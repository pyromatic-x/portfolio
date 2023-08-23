import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleGreetingState } from "../../redux/reducers/greetingPlayed";

import "./greeting.css";

function Greeting() {
  const dispath = useDispatch();

  const delay = 1600;

  const strings = [
    "welcome person",
    "to this place",
    "you're now",
    "to in to the",
    "pyromatic's homeland",
  ];

  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [hideContainer, setHideContainer] = useState(false);

  useEffect(() => {
    let timeouts = [];

    strings.forEach((string, index) => {
      timeouts.push(
        setTimeout(() => {
          setCurrent(index);
          setPrevious(index - 1);

          if (index === strings.length - 1) {
            setTimeout(() => {
              setHideContainer(true);
              setTimeout(() => {
                dispath(toggleGreetingState());
              }, delay / 10);
            }, delay);
          }
        }, delay * index)
      );
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      className={`greeting-container ${hideContainer ? "hide-greeting" : ""}`}
    >
      {strings.map((string, index) => (
        <h1
          className={`greeting-text ${
            current === index ? "animate-show" : ""
          } ${previous === index ? "animate-hide" : ""}`}
          key={string}
        >
          {string}
        </h1>
      ))}
    </div>
  );
}

export default Greeting;
