import {useState} from 'react';


function PopUp({reset, count}) {

    const[isPopUpOpen, setIsPopUpOpen] = useState(false);


    const PopUpMenu = () => {

        return(
        <div className="popUp">
            <span>Are you sure you want to clear the table?</span>
            <div className="popUpButtons">
                <button className="options" onClick={ () => {
                    localStorage.removeItem("list");
                    setIsPopUpOpen(false);
                    reset();}
                }>Yes</button>
                <button className="options" onClick={() => setIsPopUpOpen(false)} >Cancel</button>
            </div>
        </div>);
    }

    
    return(
        <div className="clearTable">

            <button onClick={() => setIsPopUpOpen(!isPopUpOpen)} disabled={ count === 0 } >Clear Table</button>
            {isPopUpOpen ? <PopUpMenu /> : null}
            
        </div>
    );
}

export default PopUp;