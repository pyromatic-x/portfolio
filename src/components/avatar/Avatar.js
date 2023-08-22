import { useSelector } from "react-redux";
import avatar_video from "../../images/avatar_video.mov";
import { useEffect, useRef, useState } from "react";

function Avatar() {
  const [className, setClassName] = useState("opacity-0 scale-125");
  const greetingPlayed = useSelector((state) => state.greetingPlayed.value);

  const videoRef = useRef(null);
  const handlePlayVideo = () => {
    videoRef.current.play();
  };

  useEffect(() => {
    if (greetingPlayed) {
      handlePlayVideo();
      setClassName("opacity-1 scale-100");
    }
  });

  return (
    <video
      ref={videoRef}
      src={avatar_video}
      className={
        `object-cover rounded-lg justify-self-center transition duration-500 ` +
        className
      }
      width="500"
      muted={true}
      autoPlay={false}
      loop={true}
      controls={false}
    />
  );
}

export default Avatar;
