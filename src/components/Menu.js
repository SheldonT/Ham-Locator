import {useState} from 'react';
import { Link } from "react-router-dom";
import menuImg from "../assets/hamburgerMenu.svg";
import "./menu.css";
import "./popUp.css";


function Menu () {
    const [openMenu, setOpenMenu] = useState(false);

    const MenuContent = () => {
        return(
            <div className="popUpMenu">
                <div className="hMenuEl"> <Link to="/Ham-Locator/" >Home</Link> </div>
                <div className="hMenuEl"> <Link to="log">Full Log</Link ></div>
                <div className="hMenuEl"> <Link to="stats">Log Stats</Link ></div> {/* target="_blank" causes a 404 issue */}
                <div className="hMenuEl"> <Link to="instructions">Instructions</Link> </div>
                <div className="hMenuEl"> <Link to="about">About</Link> </div>
            </div>
        );
    }

    return (
    <div className="menuBar" >
        <div className="menuEl"> <Link to="/Ham-Locator/" >Home</Link> </div>
        <div className="menuEl"> <Link to="log">Full Log</Link> </div>
        <div className="menuEl"> <Link to="stats">Log Stats</Link> </div>
        <div className="menuEl"> <Link to="instructions">Instructions</Link> </div>
        <div className="menuEl"> <Link to="about">About</Link> </div>
        <div className="hamburger" onClick={() => {setOpenMenu(!openMenu)}}>
            <img className="menuImg" src={menuImg} />
            {openMenu ? <MenuContent /> : null}
        </div>

    </div>);
}

export default Menu;