import { useDispatch, useSelector } from "react-redux";
import avatar_video from "../../images/avatar_video.mov";
import { useEffect, useRef, useState } from "react";
import { toggleAvatarAppearedState } from "../../redux/reducers/avatarAppeared";

function Avatar() {
  const dispath = useDispatch();

  const [className, setClassName] = useState("opacity-0 scale-125");
  const greetingPlayed = useSelector((state) => state.greetingPlayed.value);

  const videoRef = useRef(null);
  const handlePlayVideo = () => {
    videoRef.current.play();
  };

  useEffect(() => {
    let timeout = null;

    if (greetingPlayed) {
      handlePlayVideo();
      setClassName("opacity-1 scale-100");

      timeout = setTimeout(() => {
        dispath(toggleAvatarAppearedState());
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
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
