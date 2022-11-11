import { Outlet, Link } from "react-router-dom";
import logo from "../assets/hl-logo.svg";


function Layout({infoList}){

  //const [info, setInfo] = useState([]); //moved from Location to make info available to Stats

  console.log(infoList);

  return(
    <>

    <div className="title" id="title" >

      <Link to="/Ham-Locator/" > <img className="logo" src={logo} alt="" /> </Link>
      <div className="menuBar" >
        <div className="menuEl"> <Link to="stats" target="_blank" state={infoList}>Log Stats</Link></div>
        <div className="menuEl"> <Link to="instructions">Instructions</Link> </div>
        <div className="menuEl"> <Link to="about">About</Link> </div>
      </div>
      
    </div>

    <div className="main" id="main">

    <Outlet />

    </div>
    <div className="footer">
        Version 1.1 made by <a href="https://twitter.com/Steegan" target="_blank">SheldonT</a> (on <a href="https://github.com/SheldonT/Ham-Locator" target="_blank">GitHub</a>). <br/>
        DXCC search powered by <a href="https://www.hamqth.com/" target="_blank">HamQTH.com</a>. <br />
    </div>
    </>
  );
}

export default Layout;

//<div className="menuEl"> <Link to="stats" target="_blank" state={infoList}>Log Stats</Link></div>
//<div className="menuEl" onClick={window.open("stats", "mozillaWindow", "popup")}> Log Stats </div>