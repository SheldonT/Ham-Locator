import React, { useEffect, useState} from 'react';

function PopUp({value, set, count}) {

    const [attrib, setAttrib] = useState(true);    

    useEffect(() => {
        if (count === 0) {
            setAttrib(true);
        } else {
            setAttrib(false);
        }
    });


    const popUp = () => {
        return(
        <div className="popUp">
            <span>Are you sure you want to clear the table?</span>
            <div className="popUpButtons">
                <button className="options" onClick={ () => {
                    localStorage.removeItem("list");
                    set();}
                }>Yes</button>
                <button className="options" onClick={() => set()} >Cancel</button>
            </div>
        </div>);
    }
    
    return(
        <div className="clearTable">

            <button onClick={() => set(popUp)} disabled={attrib} >Clear Table</button>
            {value}
            
        </div>
    );
}

export default PopUp;