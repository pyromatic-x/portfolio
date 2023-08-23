import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Instagram from "../../icons/instagram.svg";
import Telegram from "../../icons/telegram.svg";
import Envelop from "../../icons/envelope.svg";

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
      }, 100);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  const socials = [
    {
      icon: Telegram,
      alt: "Telegram link icon",
      link: "https://t.me/pyromaticx",
      popup: "@pyromaticx",
    },
    {
      icon: Envelop,
      alt: "Mail link icon",
      link: "mailto:pyromaticx@proton.me",
      popup: "pyromaticx@proton.me",
    },
    {
      icon: Instagram,
      alt: "Instagram link icon",
      link: "https://www.instagram.com/pyromaticz/",
      popup: "@pyromaticz",
    },
  ];

  return (
    <div className={`flex gap-2 transition duration-500 ` + className}>
      {socials.map((social) => (
        <a href={social.link} target="_blank" key={social.alt}>
          <img
            src={social.icon}
            alt={social.alt}
            width="32"
            height="32"
            className="cursor-pointer"
          />
        </a>
      ))}
    </div>
  );
}

export default Socials;
