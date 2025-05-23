import Header from "./header/Header";

import videoBg from "../assets/3338747-uhd_4096_2160_25fps.mp4";
import "./Home.css";

import MembriTeam from "./body/teamMembers/Team";
import SezioneStatistiche from "./body/statistiche&Video/Statistiche";
import UltimeNovità from "./body/Novità/Novità";
import Recensioni from "./body/Recensioni/Recensioni";
import SezioneStoria from "./body/LaStoria/LaStoria";
import LeNostreDelizie from "./body/CaroselloFoto/CaroselloFoto";
import Seguici from "./body/Social/SezioneSocial";
import Contatti from "./body/Contatti/Contatti";

const Home = () => {
  return (
    <>
      <div className="video-bg-wrapper ">
        <video className="video-bg" src={videoBg} autoPlay loop muted playsInline />
      </div>

      <Header />
      <div className="after-video-content">
        <MembriTeam />
        <SezioneStatistiche />
        <UltimeNovità />
        <Recensioni />
        <SezioneStoria />
        <LeNostreDelizie />
        <Seguici />
        <Contatti />
      </div>
    </>
  );
};

export default Home;
