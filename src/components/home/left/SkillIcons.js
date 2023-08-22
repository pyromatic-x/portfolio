import Mongo from "../../../icons/mongodb.svg";
import Git from "../../../icons/git.svg";
import AWS from "../../../icons/aws.svg";
import JS from "../../../icons/js-square.svg";
import NodeJS from "../../../icons/node-js.svg";
import Python from "../../../icons/python.svg";
import ReactIcon from "../../../icons/react.svg";
import VueJS from "../../../icons/vuejs.svg";

function SkillIcons() {
  const icons = [
    { icon: JS, alt: "JS Logo", link: "JavaScript" },
    { icon: NodeJS, alt: "NodeJS Logo", title: "NodeJS" },
    { icon: Mongo, alt: "MongoDB Logo", title: "MongoDB" },
    { icon: VueJS, alt: "VueJS Logo", title: "VueJs" },
    { icon: ReactIcon, alt: "React Logo", title: "React" },
    { icon: Git, alt: "Git Logo", title: "Git" },
    { icon: AWS, alt: "AWS Logo", title: "AWS" },
    { icon: Python, alt: "Python Logo", title: "Python" },
  ];

  return (
    <div className="flex flex-row flex-wrap items-end gap-2">
      {icons.map((o) => (
        <img
          src={o.icon}
          alt={o.alt}
          width="32"
          height="32"
          key={o.alt}
          className=""
        />
      ))}
      ...
    </div>
  );
}

export default SkillIcons;
