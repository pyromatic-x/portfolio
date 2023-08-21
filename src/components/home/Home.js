import avatar_video from "../../images/avatar_video.mov";

function Home() {
  return (
    <div className="flex justify-center items-center gap-12 h-screen">
      <div className="w-full">text</div>
      <div className="w-full">
        <video
          src={avatar_video}
          className="object-cover rounded-lg"
          width="400"
          muted={true}
          autoPlay={true}
          loop={true}
          controls={false}
        />
      </div>
    </div>
  );
}

export default Home;
