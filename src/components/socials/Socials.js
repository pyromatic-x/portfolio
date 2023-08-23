import { useEffect, useState } from "react";
import Instagram from "../../icons/instagram.svg";
import Telegram from "../../icons/telegram.svg";
import { useSelector } from "react-redux";

function Socials() {
  const avatarAppeared = useSelector((state) => state.avatarAppeared.value);
  const [className, setClassName] = useState(
    "opacity-0 scale-125 translate-y-10"
  );

  useEffect(() => {
    let timeout = null;

    if (avatarAppeared) {
      timeout = setTimeout(() => {
        setClassName("opacity-1 scale-100 translate-y-0");
      }, 250);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className={`flex gap-2 transition duration-500 ` + className}>
      <img
        src={Telegram}
        alt="Telegram link"
        width="32"
        height="32"
        className="cursor-pointer"
      />
      <img
        src={Instagram}
        alt="Instagram link"
        width="32"
        height="32"
        className="cursor-pointer"
      />
    </div>
  );
}

export default Socials;
