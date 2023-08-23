import Avatar from "../avatar/Avatar";
import "./home.css";
import HomeLeftSection from "./left/HomeLeftSection";
import HomeRightSection from "./right/HomeRightSection";

function Home() {
  return (
    <div className="grid justify-center items-center gap-12 min-h-screen home-container py-5 px-8">
      <HomeLeftSection />
      <Avatar />
      <HomeRightSection />
    </div>
  );
}

export default Home;
