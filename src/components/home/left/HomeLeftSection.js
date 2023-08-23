import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SkillIcons from "./SkillIcons";

function HomeLeftSection() {
  const avatarAppeared = useSelector((state) => state.avatarAppeared.value);
  const [className, setClassName] = useState(
    "opacity-0 scale-110 translate-x-[-10rem]"
  );

  useEffect(() => {
    if (avatarAppeared) {
      setClassName("opacity-1 scale-100 translate-x-[0rem]");
    }
  });

  return (
    <div
      className={
        `flex flex-col items-center transition duration-500 ` + className
      }
    >
      <h3 className="text-2xl text-center">Full Stack Web Developer</h3>
      <h4 className="text-lg font-bold text-center">Andrey Teplyakov</h4>
      <h3 className="mb-6 text-center">Startuper, Mentor, Team Lead</h3>
      <SkillIcons />
    </div>
  );
}

export default HomeLeftSection;
